export type ParseContext = {
  correlationId: string;
  attempt: 1 | 2;
  correctivePrompt?: string;
};
