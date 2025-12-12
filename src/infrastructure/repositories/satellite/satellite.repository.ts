// ================================
// SATELLITE REPOSITORY
// ================================

import { Satellite, SatelliteStatus, SatelliteCategory } from '@prisma/client';
import { IPaginatedRepository } from '@/core/interfaces/IRepository';
import { prisma } from '@/infrastructure/database/prisma.service';
import redisService from '@/infrastructure/cache/redis.service';
import { CACHE_KEYS, CACHE_TTL } from '@/core/interfaces/ICacheService';

export class SatelliteRepository implements IPaginatedRepository<Satellite> {
  async findAll(filters?: Record<string, any>): Promise<Satellite[]> {
    const cacheKey = filters
      ? `${CACHE_KEYS.SATELLITE.ALL}:${JSON.stringify(filters)}`
      : CACHE_KEYS.SATELLITE.ALL;

    return redisService.getOrSet(
      cacheKey,
      async () => {
        return prisma.satellite.findMany({
          where: filters,
          orderBy: { name: 'asc' },
        });
      },
      CACHE_TTL.MEDIUM
    );
  }

  async findById(id: string): Promise<Satellite | null> {
    return redisService.getOrSet(
      CACHE_KEYS.SATELLITE.BY_ID(id),
      async () => {
        return prisma.satellite.findUnique({
          where: { id },
          include: {
            config: true,
          },
        });
      },
      CACHE_TTL.MEDIUM
    );
  }

  async findByCode(code: string): Promise<Satellite | null> {
    return redisService.getOrSet(
      CACHE_KEYS.SATELLITE.BY_CODE(code),
      async () => {
        return prisma.satellite.findUnique({
          where: { code },
          include: {
            config: true,
          },
        });
      },
      CACHE_TTL.MEDIUM
    );
  }

  async findByCategory(category: SatelliteCategory): Promise<Satellite[]> {
    return redisService.getOrSet(
      CACHE_KEYS.SATELLITE.BY_CATEGORY(category),
      async () => {
        return prisma.satellite.findMany({
          where: { category },
          orderBy: { name: 'asc' },
        });
      },
      CACHE_TTL.LONG
    );
  }

  async create(data: Partial<Satellite>): Promise<Satellite> {
    const satellite = await prisma.satellite.create({
      data: data as any,
    });

    // Invalidate cache
    await this.invalidateCache();

    return satellite;
  }

  async update(id: string, data: Partial<Satellite>): Promise<Satellite> {
    const satellite = await prisma.satellite.update({
      where: { id },
      data,
    });

    // Invalidate cache
    await this.invalidateCache(id);

    return satellite;
  }

  async delete(id: string): Promise<void> {
    await prisma.satellite.delete({
      where: { id },
    });

    // Invalidate cache
    await this.invalidateCache(id);
  }

  async count(filters?: Record<string, any>): Promise<number> {
    return prisma.satellite.count({
      where: filters,
    });
  }

  async findPaginated(
    page: number,
    pageSize: number,
    filters?: Record<string, any>,
    orderBy?: Record<string, 'asc' | 'desc'>
  ): Promise<{
    data: Satellite[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.satellite.findMany({
        where: filters,
        skip,
        take: pageSize,
        orderBy: orderBy || { name: 'asc' },
      }),
      prisma.satellite.count({ where: filters }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Get satellites with task counts
   */
  async findWithTaskCounts(): Promise<
    Array<Satellite & { _count: { tasks: number } }>
  > {
    return prisma.satellite.findMany({
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Invalidate satellite cache
   */
  private async invalidateCache(id?: string): Promise<void> {
    await redisService.deletePattern('satellite*');
    
    if (id) {
      await redisService.delete(CACHE_KEYS.SATELLITE.BY_ID(id));
    }
  }
}

export default new SatelliteRepository();
