// ================================
// PRISMA SERVICE - DATABASE CONNECTION
// ================================

import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * PrismaService wrapper class
 */
export class PrismaService {
  private client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  get db() {
    return this.client;
  }

  /**
   * Connect to database
   */
  async connect(): Promise<void> {
    await this.client.$connect();
  }

  /**
   * Disconnect from database
   */
  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }

  /**
   * Execute raw SQL query
   */
  async raw<T = any>(query: string, ...params: any[]): Promise<T> {
    return this.client.$queryRawUnsafe<T>(query, ...params);
  }

  /**
   * Start a transaction
   */
  async transaction<T>(
    fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => Promise<T>
  ): Promise<T> {
    return this.client.$transaction(fn);
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

export default new PrismaService();
