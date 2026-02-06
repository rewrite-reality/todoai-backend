import { Injectable, LoggerService } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';

type PinoInstance = {
  child: (bindings?: Record<string, unknown>) => PinoInstance;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

function getPino(): (options?: Record<string, unknown>) => PinoInstance {
  try {
    const loaded = require('pino') as (
      options?: Record<string, unknown>,
    ) => PinoInstance;
    return loaded;
  } catch {
    const fallbackFactory = () => {
      const fallback: PinoInstance = {
        child: () => fallback,
        info: console.log,
        warn: console.warn,
        error: console.error,
        debug: console.debug,
      };
      return fallback;
    };
    return fallbackFactory;
  }
}

@Injectable()
export class PinoLoggerService implements LoggerService {
  private readonly logger: PinoInstance;

  constructor(private readonly context: RequestContextService) {
    const pino = getPino();
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
      base: undefined,
    });
  }

  private withContext() {
    const correlationId = this.context.getCorrelationId();
    return correlationId ? this.logger.child({ correlationId }) : this.logger;
  }

  log(message: any, ...optionalParams: any[]) {
    this.withContext().info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    const payload =
      message instanceof Error
        ? { err: message, msg: message.message }
        : message;
    this.withContext().error(payload, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.withContext().warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.withContext().debug(message, ...optionalParams);
  }
}
