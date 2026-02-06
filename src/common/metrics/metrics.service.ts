import { Injectable } from '@nestjs/common';

type HealthStatusLabel = 'ok' | 'degraded';

@Injectable()
export class MetricsService {
  private readonly healthCounter: Record<HealthStatusLabel, number> = {
    ok: 0,
    degraded: 0,
  };

  incrementHealth(status: HealthStatusLabel) {
    this.healthCounter[status] += 1;
  }

  getHealthCounts() {
    return { ...this.healthCounter };
  }
}
