import { Inject, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MetricsService } from '../../../../common/metrics/metrics.service';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { AI_TEXT_PARSER } from '../../../ai/constants/ai.tokens';
import type { IAiParser } from '../../../ai/contracts/ai-parser.interface';
import {
  AiParserError,
  isAiParserError,
} from '../../../ai/errors/ai-parser.error';
import { CORRECTIVE_TASK_PARSER_PROMPT } from '../../../ai/prompts/deepseek-task-parser.prompt';
import type { ParsedTaskDto } from '../../../ai/dto/parsed-task.dto';
import { TaskParsingJobData } from '../../contracts/task-parsing.job';
import { QUEUES } from '../../queues.config';
import { TaskParsingNotificationService } from './task-parsing.notification.service';
import { TaskParsingPersistenceService } from './task-parsing.persistence.service';

const INVALID_OUTPUT_CODES = new Set([
  'AI_PARSE_INVALID_JSON',
  'AI_PARSE_ZOD_VALIDATION',
]);

@Injectable()
export class TaskParsingOrchestrator {
  constructor(
    @Inject(AI_TEXT_PARSER) private readonly aiParser: IAiParser,
    private readonly persistence: TaskParsingPersistenceService,
    private readonly notifications: TaskParsingNotificationService,
    private readonly logger: PinoLoggerService,
    private readonly metrics: MetricsService,
  ) {}

  async handleJob(
    job: Job<Record<string, unknown>>,
    payload: TaskParsingJobData,
  ): Promise<void> {
    const existingTasks =
      await this.persistence.loadExistingTasksByIdempotencyKey(
        payload.idempotencyKey,
      );

    if (existingTasks.length > 0) {
      this.metrics.incrementQueueIdempotencyHit(QUEUES.TASK_PARSING);
      await this.notifications.enqueueExistingResultNotification(
        payload,
        existingTasks,
      );
      this.logger.log({
        msg: 'Task parsing skipped due to idempotency hit',
        queue: QUEUES.TASK_PARSING,
        jobId: job.id,
        idempotencyKey: payload.idempotencyKey,
      });
      return;
    }

    const parseStartedAt = Date.now();
    let parsedTask: ParsedTaskDto | null = null;
    let fallbackReasonCode = 'AI_PARSE_PROVIDER_ERROR';

    try {
      parsedTask = await this.parseWithCorrectiveRetry(payload);
    } catch (error: unknown) {
      const mappedError = this.mapUnknownAiError(error);
      fallbackReasonCode = mappedError.code;

      this.logger.warn({
        msg: 'Task parsing switched to fallback',
        queue: QUEUES.TASK_PARSING,
        jobId: job.id,
        idempotencyKey: payload.idempotencyKey,
        code: mappedError.code,
      });
    } finally {
      this.metrics.observeAiParseDuration(
        this.aiParser.provider,
        Date.now() - parseStartedAt,
      );
    }

    if (parsedTask) {
      const createdTasks = await this.persistence.createParsedTasks(
        payload,
        parsedTask,
      );
      if (createdTasks === null) {
        this.metrics.incrementQueueIdempotencyHit(QUEUES.TASK_PARSING);
        const existingResult =
          await this.persistence.loadExistingTasksByIdempotencyKey(
            payload.idempotencyKey,
          );
        await this.notifications.enqueueExistingResultNotification(
          payload,
          existingResult,
        );
        return;
      }

      await this.notifications.enqueueSuccessNotification(
        payload,
        createdTasks.map((task) => task.title),
      );

      this.metrics.incrementAiParse('success', this.aiParser.provider);
      this.metrics.incrementTasksCreated('ai', createdTasks.length);

      this.logger.log({
        msg: 'Task parsing completed successfully',
        queue: QUEUES.TASK_PARSING,
        jobId: job.id,
        idempotencyKey: payload.idempotencyKey,
        provider: this.aiParser.provider,
        taskCount: createdTasks.length,
      });
      return;
    }

    const fallbackTask = await this.persistence.createFallbackTask(payload);
    if (fallbackTask === null) {
      this.metrics.incrementQueueIdempotencyHit(QUEUES.TASK_PARSING);
      const existingResult =
        await this.persistence.loadExistingTasksByIdempotencyKey(
          payload.idempotencyKey,
        );
      await this.notifications.enqueueExistingResultNotification(
        payload,
        existingResult,
      );
      return;
    }

    await this.notifications.enqueueFallbackNotification(
      payload,
      fallbackReasonCode,
    );

    this.metrics.incrementAiParse('fallback', this.aiParser.provider);
    this.metrics.incrementTasksCreated('fallback', 1);

    this.logger.warn({
      msg: 'Task parsing fallback task persisted',
      queue: QUEUES.TASK_PARSING,
      jobId: job.id,
      idempotencyKey: payload.idempotencyKey,
      fallbackReasonCode,
      taskId: fallbackTask.id,
    });
  }

  private async parseWithCorrectiveRetry(
    payload: TaskParsingJobData,
  ): Promise<ParsedTaskDto> {
    try {
      return await this.aiParser.parseText(payload.text, {
        correlationId: payload.correlationId,
        attempt: 1,
      });
    } catch (error: unknown) {
      const aiError = this.mapUnknownAiError(error);
      if (!INVALID_OUTPUT_CODES.has(aiError.code)) {
        throw aiError;
      }

      this.logger.warn({
        msg: 'AI output invalid, executing corrective retry',
        queue: QUEUES.TASK_PARSING,
        idempotencyKey: payload.idempotencyKey,
        code: aiError.code,
      });

      return this.aiParser.parseText(payload.text, {
        correlationId: payload.correlationId,
        attempt: 2,
        correctivePrompt: CORRECTIVE_TASK_PARSER_PROMPT,
      });
    }
  }

  private mapUnknownAiError(error: unknown): AiParserError {
    if (isAiParserError(error)) {
      return error;
    }

    return new AiParserError(
      'AI_PARSE_PROVIDER_ERROR',
      'AI parser failed with unknown error',
      {
        retriable: true,
        cause: error,
      },
    );
  }
}
