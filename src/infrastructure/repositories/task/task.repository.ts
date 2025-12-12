// ================================
// TASK REPOSITORY
// ================================

import { Task, TaskStatus, TaskPriority } from '@prisma/client';
import { IPaginatedRepository } from '@/core/interfaces/IRepository';
import { prisma } from '@/infrastructure/database/prisma.service';
import redisService from '@/infrastructure/cache/redis.service';
import { CACHE_KEYS, CACHE_TTL } from '@/core/interfaces/ICacheService';

export class TaskRepository implements IPaginatedRepository<Task> {
  async findAll(filters?: Record<string, any>): Promise<Task[]> {
    return prisma.task.findMany({
      where: filters,
      include: {
        satellite: true,
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
      ],
    });
  }

  async findById(id: string): Promise<Task | null> {
    return redisService.getOrSet(
      CACHE_KEYS.TASK.BY_ID(id),
      async () => {
        return prisma.task.findUnique({
          where: { id },
          include: {
            satellite: true,
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                position: true,
              },
            },
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
      },
      CACHE_TTL.SHORT
    );
  }

  async findBySatellite(satelliteId: string): Promise<Task[]> {
    return redisService.getOrSet(
      CACHE_KEYS.TASK.BY_SATELLITE(satelliteId),
      async () => {
        return prisma.task.findMany({
          where: { satelliteId },
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
          orderBy: [
            { priority: 'desc' },
            { dueDate: 'asc' },
          ],
        });
      },
      CACHE_TTL.SHORT
    );
  }

  async findByUser(userId: string): Promise<Task[]> {
    return redisService.getOrSet(
      CACHE_KEYS.TASK.BY_USER(userId),
      async () => {
        return prisma.task.findMany({
          where: { assigneeId: userId },
          include: {
            satellite: true,
          },
          orderBy: [
            { priority: 'desc' },
            { dueDate: 'asc' },
          ],
        });
      },
      CACHE_TTL.SHORT
    );
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = await prisma.task.create({
      data: data as any,
      include: {
        satellite: true,
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Invalidate cache
    await this.invalidateCache();

    return task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const task = await prisma.task.update({
      where: { id },
      data,
      include: {
        satellite: true,
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Invalidate cache
    await this.invalidateCache(id);

    return task;
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });

    // Invalidate cache
    await this.invalidateCache(id);
  }

  async count(filters?: Record<string, any>): Promise<number> {
    return prisma.task.count({
      where: filters,
    });
  }

  async findPaginated(
    page: number,
    pageSize: number,
    filters?: Record<string, any>,
    orderBy?: Record<string, 'asc' | 'desc'>
  ): Promise<{
    data: Task[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        where: filters,
        skip,
        take: pageSize,
        include: {
          satellite: true,
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: orderBy || [
          { priority: 'desc' },
          { dueDate: 'asc' },
        ],
      }),
      prisma.task.count({ where: filters }),
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
   * Update task status
   */
  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const updates: any = { status };

    // If marking as done, set completedAt
    if (status === 'DONE') {
      updates.completedAt = new Date();
    }

    return this.update(id, updates);
  }

  /**
   * Assign task to user
   */
  async assignTo(id: string, userId: string): Promise<Task> {
    return this.update(id, { assigneeId: userId });
  }

  /**
   * Get tasks by status for a satellite
   */
  async findBySatelliteAndStatus(
    satelliteId: string,
    status: TaskStatus
  ): Promise<Task[]> {
    return this.findAll({
      satelliteId,
      status,
    });
  }

  /**
   * Get overdue tasks
   */
  async findOverdue(): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        status: {
          notIn: ['DONE', 'CANCELLED'],
        },
        dueDate: {
          lt: new Date(),
        },
      },
      include: {
        satellite: true,
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
      ],
    });
  }

  /**
   * Invalidate task cache
   */
  private async invalidateCache(id?: string): Promise<void> {
    await redisService.deletePattern('task*');
    
    if (id) {
      await redisService.delete(CACHE_KEYS.TASK.BY_ID(id));
    }
  }
}

export default new TaskRepository();
