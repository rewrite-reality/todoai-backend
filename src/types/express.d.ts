import 'express-serve-static-core';
import type { JwtPayload } from '../modules/auth/interfaces/jwt-payload.interface';

declare module 'express-serve-static-core' {
  interface Request {
    correlationId?: string;
    user?: JwtPayload;
  }
}
