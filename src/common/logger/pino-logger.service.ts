import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';
import { RequestContextService } from '../context/request-context.service';

type PinoInstance = {
  child: (bindings?: Record<string, unknown>) => PinoInstance;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
};

@Injectable()
export class PinoLoggerService implements LoggerService {
  private readonly logger: PinoInstance;

  constructor(private readonly context: RequestContextService) {
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
      base: undefined,
    });
  }

  private withContext() {
    const correlationId = this.context.getCorrelationId();
    return correlationId ? this.logger.child({ correlationId }) : this.logger;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    this.withContext().info(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    const payload =
      message instanceof Error
        ? { err: message, msg: message.message }
        : message;
    this.withContext().error(payload, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.withContext().warn(message, ...optionalParams);
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    this.withContext().debug(message, ...optionalParams);
  }
}
