export type AiParserErrorCode =
  | 'AI_PARSE_INVALID_JSON'
  | 'AI_PARSE_ZOD_VALIDATION'
  | 'AI_PARSE_TIMEOUT'
  | 'AI_PARSE_RATE_LIMIT'
  | 'AI_PARSE_PROVIDER_ERROR'
  | 'AI_AUDIO_PROVIDER_NOT_ENABLED';

export class AiParserError extends Error {
  readonly code: AiParserErrorCode;
  readonly retriable: boolean;
  readonly details?: unknown;

  constructor(
    code: AiParserErrorCode,
    message: string,
    options?: {
      retriable?: boolean;
      details?: unknown;
      cause?: unknown;
    },
  ) {
    super(message);
    this.name = 'AiParserError';
    this.code = code;
    this.retriable = options?.retriable ?? false;
    this.details = options?.details;
    if (options?.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = options.cause;
    }
  }
}

export function isAiParserError(error: unknown): error is AiParserError {
  return error instanceof AiParserError;
}
