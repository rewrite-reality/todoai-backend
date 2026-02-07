import { ConfigService } from '@nestjs/config';
import { DeepSeekTextParser } from '../../src/modules/ai/providers/deepseek-text.parser';
import { PinoLoggerService } from '../../src/common/logger/pino-logger.service';
import { AiParserError } from '../../src/modules/ai/errors/ai-parser.error';

// BLOCKER: nock/msw are not installed in the current repo test harness, so fetch is mocked directly.
type ConfigMap = Record<string, unknown>;

function buildConfigService(values: ConfigMap): ConfigService {
  return {
    get: jest.fn((key: string) => values[key]),
  } as unknown as ConfigService;
}

function buildLogger(): PinoLoggerService {
  return {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  } as unknown as PinoLoggerService;
}

function okResponse(content: string): Response {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content } }],
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
}

describe('DeepSeekTextParser (integration)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = originalEnv;
  });

  it('sends DeepSeek request with expected endpoint, headers and body', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        okResponse('{"tasks":[{"title":"Task A","subtasks":[]}]}'),
      );
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'deepseek-key',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
        'ai.deepseekModel': 'deepseek-chat',
        'ai.timeoutMs': 30000,
      }),
      buildLogger(),
    );

    const result = await parser.parseText('Разбей задачу на шаги', {
      correlationId: 'corr-1',
      attempt: 1,
    });

    expect(result.tasks).toHaveLength(1);
    expect(result.tasks[0].title).toBe('Task A');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, requestInit] = fetchMock.mock.calls[0];
    const typedRequestInit = requestInit as RequestInit;
    const serializedBody = typedRequestInit.body;
    if (typeof serializedBody !== 'string') {
      throw new Error('Expected request body to be serialized JSON string');
    }
    const body = JSON.parse(serializedBody) as {
      model: string;
      max_tokens: number;
      temperature: number;
      messages: Array<{ role: string; content: string }>;
    };

    expect(url).toBe('https://api.deepseek.com/v1/chat/completions');
    expect(typedRequestInit.method).toBe('POST');
    expect(typedRequestInit.headers).toMatchObject({
      Authorization: 'Bearer deepseek-key',
      'Content-Type': 'application/json',
    });
    expect(body.model).toBe('deepseek-chat');
    expect(body.max_tokens).toBe(2000);
    expect(body.temperature).toBe(0.1);
    expect(body.messages[0].role).toBe('system');
    expect(body.messages[1]).toEqual({
      role: 'user',
      content: 'Разбей задачу на шаги',
    });
  });

  it('uses DEEPSEEK_API_KEY from env when config value is missing', async () => {
    process.env.DEEPSEEK_API_KEY = 'env-deepseek-key';
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        okResponse('{"tasks":[{"title":"Task A","subtasks":[]}]}'),
      );
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await parser.parseText('Test', {
      correlationId: 'corr-2',
      attempt: 1,
    });

    const requestInit = fetchMock.mock.calls[0][1] as RequestInit;
    expect(requestInit.headers).toMatchObject({
      Authorization: 'Bearer env-deepseek-key',
    });
  });

  it('parses markdown wrapped JSON response', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        okResponse(
          '```json\n{"tasks":[{"title":"Markdown task","subtasks":[]}]}\n```',
        ),
      );
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    const result = await parser.parseText('Input', {
      correlationId: 'corr-3',
      attempt: 1,
    });

    expect(result.tasks[0].title).toBe('Markdown task');
  });

  it('maps 429 response to AI_PARSE_RATE_LIMIT', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('', { status: 429 }));
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-4',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_RATE_LIMIT',
      retriable: true,
    });
  });

  it('maps 5xx response to AI_PARSE_PROVIDER_ERROR', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('', { status: 500 }));
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-5',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_PROVIDER_ERROR',
      retriable: true,
    });
  });

  it('maps timeout (AbortError) to AI_PARSE_TIMEOUT', async () => {
    const abortError = new Error('aborted');
    (abortError as Error & { name: string }).name = 'AbortError';
    jest.spyOn(global, 'fetch').mockRejectedValue(abortError);

    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-6',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_TIMEOUT',
      retriable: true,
    });
  });

  it('maps network error to AI_PARSE_PROVIDER_ERROR', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('socket hang up'));

    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-7',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_PROVIDER_ERROR',
      retriable: true,
    });
  });

  it('maps invalid completion JSON to AI_PARSE_INVALID_JSON', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(okResponse('not json'));
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-8',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_INVALID_JSON',
    });
  });

  it('maps schema-invalid completion to AI_PARSE_ZOD_VALIDATION', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(okResponse('{"tasks":[{"summary":"missing title"}]}'));
    const parser = new DeepSeekTextParser(
      buildConfigService({
        'ai.deepseekApiKey': 'k',
        'ai.deepseekBaseUrl': 'https://api.deepseek.com/v1',
      }),
      buildLogger(),
    );

    await expect(
      parser.parseText('Input', {
        correlationId: 'corr-9',
        attempt: 1,
      }),
    ).rejects.toMatchObject<Partial<AiParserError>>({
      code: 'AI_PARSE_ZOD_VALIDATION',
      retriable: false,
    });
  });
});
