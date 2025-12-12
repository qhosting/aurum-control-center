// ================================
// GENERIC REPOSITORY INTERFACE
// ================================

export interface IRepository<T> {
  findAll(filters?: Record<string, any>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  count(filters?: Record<string, any>): Promise<number>;
}

export interface IPaginatedRepository<T> extends IRepository<T> {
  findPaginated(
    page: number,
    pageSize: number,
    filters?: Record<string, any>,
    orderBy?: Record<string, 'asc' | 'desc'>
  ): Promise<{
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;
}
