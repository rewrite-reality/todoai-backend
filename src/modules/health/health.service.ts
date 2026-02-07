import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PinoLoggerService } from '../../common/logger/pino-logger.service';
import { MetricsService } from '../../common/metrics/metrics.service';
import { RedisService } from '../../common/redis/redis.service';

type ServiceState = 'up' | 'down';

export interface HealthReport {
  status: 'ok' | 'degraded';
  version: string;
  timestamp: string;
  services: {
    database: ServiceState;
    redis: ServiceState;
  };
}

const HEALTH_VERSION = '0.1.0';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly metrics: MetricsService,
    private readonly logger: PinoLoggerService,
  ) {}

  async getHealth(): Promise<HealthReport> {
    const [dbHealthy, redisHealthy] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
    ]);

    const services = {
      database: dbHealthy ? 'up' : 'down',
      redis: redisHealthy ? 'up' : 'down',
    } as const;

    const status: HealthReport['status'] =
      services.database === 'up' && services.redis === 'up' ? 'ok' : 'degraded';

    const report: HealthReport = {
      status,
      version: HEALTH_VERSION,
      timestamp: new Date().toISOString(),
      services,
    };

    this.metrics.incrementHealth(status === 'ok' ? 'ok' : 'degraded');

    if (status === 'ok') {
      this.logger.log({ msg: 'Health check succeeded', report });
      return report;
    }

    this.logger.warn({ msg: 'Health check degraded', report });
    throw new HttpException(
      {
        code: 'HEALTH_DEGRADED',
        message: 'One or more services unavailable',
        details: report.services,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error: unknown) {
      this.logger.warn({ msg: 'Database health failed', error });
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      const pong = await this.redis.ping();
      return pong.toLowerCase() === 'pong';
    } catch (error: unknown) {
      this.logger.warn({ msg: 'Redis health failed', error });
      return false;
    }
  }
}
