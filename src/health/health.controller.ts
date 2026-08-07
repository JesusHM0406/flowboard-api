import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../shared/infrastructure/database/prisma.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      await this.prisma.client.$queryRaw`SELECT 1`;
      return {
        status: 'up',
        timestamp: new Date().toISOString(),
        database: 'up',
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'down',
        timestamp: new Date().toISOString(),
        database: 'down',
      });
    }
  }
}
