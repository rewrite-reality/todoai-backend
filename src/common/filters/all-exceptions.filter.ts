import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Prisma } from '@prisma/client';
import { PinoLoggerService } from '../logger/pino-logger.service';

type ErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, body } = this.mapException(exception);
    const correlationId = this.getCorrelationId(request);

    if (this.isAuthFailure(body.error.code)) {
      this.logger.warn({
        msg: 'Authentication request failed',
        correlationId,
        code: body.error.code,
        reason: body.error.message,
        status,
        path: request.url,
      });
    } else {
      this.logger.error({
        msg: 'HTTP request failed',
        correlationId,
        code: body.error.code,
        reason: body.error.message,
        status,
        path: request.url,
      });
    }

    response.status(status).json(body);
  }

  private mapException(exception: unknown): {
    status: number;
    body: ErrorBody;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus() as HttpStatus;
      const res = exception.getResponse();
      const responsePayload =
        typeof res === 'string'
          ? { message: res }
          : (res as Record<string, unknown>);

      const code =
        (responsePayload.code as string) ?? this.mapHttpStatusToCode(status);
      const message =
        (responsePayload.message as string) ?? exception.message ?? 'Error';
      const details = responsePayload.details ?? undefined;

      return {
        status,
        body: this.formatError(code, message, details),
      };
    }

    if (this.isPrismaKnownError(exception)) {
      const mapped = this.mapPrismaError(exception);
      return {
        status: mapped.status,
        body: this.formatError(mapped.code, mapped.message, mapped.details),
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: this.formatError(
        'INTERNAL_ERROR',
        'Unexpected error occurred',
        exception instanceof Error ? exception.message : undefined,
      ),
    };
  }

  private mapHttpStatusToCode(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'UNPROCESSABLE_ENTITY';
      default:
        return 'HTTP_ERROR';
    }
  }

  private isPrismaKnownError(
    exception: unknown,
  ): exception is Prisma.PrismaClientKnownRequestError {
    return exception instanceof Prisma.PrismaClientKnownRequestError;
  }

  private mapPrismaError(error: Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          code: 'UNIQUE_VIOLATION',
          message: 'Unique constraint violation',
          details: error.meta,
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          code: 'NOT_FOUND',
          message: 'Entity not found',
          details: error.meta,
        };
      default:
        return {
          status: HttpStatus.BAD_REQUEST,
          code: 'PRISMA_ERROR',
          message: error.message,
          details: error.meta,
        };
    }
  }

  private formatError(
    code: string,
    message: string,
    details?: unknown,
  ): ErrorBody {
    const payload: ErrorBody['error'] = {
      code,
      message,
    };

    if (details !== undefined) {
      payload.details = details;
    }

    return { error: payload };
  }

  private isAuthFailure(code: string): boolean {
    return code.startsWith('AUTH_');
  }

  private getCorrelationId(request: Request): string {
    const req = request as Request & { correlationId?: string };
    return req.correlationId ?? 'unknown-correlation-id';
  }
}
