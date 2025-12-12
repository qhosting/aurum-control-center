// ================================
// CACHE SERVICE INTERFACE
// ================================

export interface ICacheService {
  /**
   * Get value from cache
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set value in cache with optional TTL (in seconds)
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Delete key from cache
   */
  delete(key: string): Promise<void>;

  /**
   * Delete multiple keys matching pattern
   */
  deletePattern(pattern: string): Promise<void>;

  /**
   * Check if key exists
   */
  exists(key: string): Promise<boolean>;

  /**
   * Get or set pattern (cache-aside)
   * If key exists, return cached value
   * Otherwise, execute fn, cache result, and return
   */
  getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number
  ): Promise<T>;

  /**
   * Clear all cache
   */
  clear(): Promise<void>;

  /**
   * Get cache statistics
   */
  stats(): Promise<{
    hits: number;
    misses: number;
    keys: number;
  }>;
}

export const CACHE_KEYS = {
  SATELLITE: {
    ALL: 'satellites:all',
    BY_ID: (id: string) => `satellite:${id}`,
    BY_CODE: (code: string) => `satellite:code:${code}`,
    BY_CATEGORY: (category: string) => `satellites:category:${category}`,
  },
  TASK: {
    ALL: 'tasks:all',
    BY_ID: (id: string) => `task:${id}`,
    BY_SATELLITE: (satelliteId: string) => `tasks:satellite:${satelliteId}`,
    BY_USER: (userId: string) => `tasks:user:${userId}`,
  },
  USER: {
    BY_ID: (id: string) => `user:${id}`,
    BY_EMAIL: (email: string) => `user:email:${email}`,
  },
} as const;

export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  EXTENDED: 86400, // 24 hours
} as const;
