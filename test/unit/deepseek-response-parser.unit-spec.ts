import { AiParserError } from '../../src/modules/ai/errors/ai-parser.error';
import { parseJsonFromContent } from '../../src/modules/ai/parsers/json-content.parser';

describe('parseJsonFromContent', () => {
  it('parses clean JSON content', () => {
    const result = parseJsonFromContent(
      '{"tasks":[{"title":"Write docs","subtasks":[]}]}',
    );

    expect(result).toEqual({
      tasks: [{ title: 'Write docs', subtasks: [] }],
    });
  });

  it('parses JSON wrapped in markdown code block', () => {
    const result = parseJsonFromContent(
      '```json\n{"tasks":[{"title":"Deploy","subtasks":[]}]}\n```',
    );

    expect(result).toEqual({
      tasks: [{ title: 'Deploy', subtasks: [] }],
    });
  });

  it('throws AI_PARSE_INVALID_JSON when content is not JSON', () => {
    let thrown: unknown;
    try {
      parseJsonFromContent('not-a-json');
    } catch (error: unknown) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(AiParserError);
    expect((thrown as AiParserError).code).toBe('AI_PARSE_INVALID_JSON');
  });

  it('throws AI_PARSE_INVALID_JSON when markdown code block has invalid JSON', () => {
    let thrown: unknown;
    try {
      parseJsonFromContent('```json\n{"tasks":[{"title":]}\n```');
    } catch (error: unknown) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(AiParserError);
    expect((thrown as AiParserError).code).toBe('AI_PARSE_INVALID_JSON');
  });
});
