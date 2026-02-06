import { CorrelationIdMiddleware } from '../../src/common/middleware/correlation-id.middleware';
import { RequestContextService } from '../../src/common/context/request-context.service';
import { Request, Response } from 'express';

describe('CorrelationIdMiddleware', () => {
  const context = new RequestContextService();
  const middleware = new CorrelationIdMiddleware(context);

  const createMocks = (headers: Record<string, string> = {}) => {
    const req = {
      headers,
      header: (key: string) => headers[key.toLowerCase()],
    } as unknown as Request;
    const resHeaders: Record<string, string> = {};
    const res = {
      setHeader: (key: string, value: string) => {
        resHeaders[key.toLowerCase()] = value;
      },
    } as unknown as Response;

    return { req, res, resHeaders };
  };

  it('generates UUID when header is absent', () => {
    const { req, res, resHeaders } = createMocks();
    let correlationInContext: string | undefined;

    middleware.use(req, res, () => {
      correlationInContext = context.getCorrelationId();
    });

    expect(req.correlationId).toBeDefined();
    expect(resHeaders['x-correlation-id']).toEqual(req.correlationId);
    expect(correlationInContext).toEqual(req.correlationId);
    expect(req.correlationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('reuses provided correlation id header', () => {
    const providedId = 'test-correlation-id';
    const { req, res, resHeaders } = createMocks({
      'x-correlation-id': providedId,
    });
    let correlationInContext: string | undefined;

    middleware.use(req, res, () => {
      correlationInContext = context.getCorrelationId();
    });

    expect(req.correlationId).toBe(providedId);
    expect(resHeaders['x-correlation-id']).toBe(providedId);
    expect(correlationInContext).toBe(providedId);
  });
});
