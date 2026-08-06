import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  public readonly client: PrismaClient;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    // There is already a validation in the app module,
    // but just to be safe
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }

    const adapter = new PrismaPg({ connectionString });
    this.client = new PrismaClient({ adapter });
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
