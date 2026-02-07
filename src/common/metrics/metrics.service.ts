import { Injectable } from '@nestjs/common';

type HealthStatusLabel = 'ok' | 'degraded';
type ParseResultLabel = 'success' | 'fallback' | 'error';
type ParseProviderLabel = 'mock' | 'deepseek';
type TaskSourceLabel = 'ai' | 'fallback';

@Injectable()
export class MetricsService {
  private readonly healthCounter: Record<HealthStatusLabel, number> = {
    ok: 0,
    degraded: 0,
  };
  private readonly aiParseCounter: Record<string, number> = {};
  private readonly aiParseDurationMs: Record<ParseProviderLabel, number[]> = {
    mock: [],
    deepseek: [],
  };
  private readonly tasksCreatedCounter: Record<TaskSourceLabel, number> = {
    ai: 0,
    fallback: 0,
  };
  private readonly queueIdempotencyHits: Record<string, number> = {};

  incrementHealth(status: HealthStatusLabel) {
    this.healthCounter[status] += 1;
  }

  getHealthCounts() {
    return { ...this.healthCounter };
  }

  incrementAiParse(result: ParseResultLabel, provider: ParseProviderLabel) {
    const key = `${result}:${provider}`;
    this.aiParseCounter[key] = (this.aiParseCounter[key] ?? 0) + 1;
  }

  observeAiParseDuration(provider: ParseProviderLabel, durationMs: number) {
    this.aiParseDurationMs[provider].push(durationMs);
  }

  incrementTasksCreated(source: TaskSourceLabel, count: number) {
    this.tasksCreatedCounter[source] += count;
  }

  incrementQueueIdempotencyHit(queue: string) {
    this.queueIdempotencyHits[queue] =
      (this.queueIdempotencyHits[queue] ?? 0) + 1;
  }
}
