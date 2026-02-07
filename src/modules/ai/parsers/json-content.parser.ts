import { AiParserError } from '../errors/ai-parser.error';

const MARKDOWN_JSON_BLOCK_REGEX = /```(?:json)?\s*([\s\S]*?)\s*```/i;

export function parseJsonFromContent(content: string): unknown {
  const trimmed = content.trim();

  if (trimmed.length === 0) {
    throw new AiParserError(
      'AI_PARSE_INVALID_JSON',
      'AI provider returned empty content',
    );
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const markdownMatch = trimmed.match(MARKDOWN_JSON_BLOCK_REGEX);
    if (!markdownMatch?.[1]) {
      throw new AiParserError(
        'AI_PARSE_INVALID_JSON',
        'AI provider returned invalid JSON',
      );
    }

    try {
      return JSON.parse(markdownMatch[1].trim());
    } catch {
      throw new AiParserError(
        'AI_PARSE_INVALID_JSON',
        'AI provider returned invalid JSON inside markdown code block',
      );
    }
  }
}
