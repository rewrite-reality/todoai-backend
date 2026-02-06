import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from '../context/request-context.service';

const CORRELATION_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const incomingId = req.header(CORRELATION_HEADER);
    const correlationId =
      incomingId && incomingId.trim().length > 0 ? incomingId : randomUUID();

    // expose for downstream middleware/handlers
    req.correlationId = correlationId;
    res.setHeader(CORRELATION_HEADER, correlationId);

    this.context.run({ correlationId }, () => next());
  }
}
