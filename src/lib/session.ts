// ================================
// SESSION UTILITIES
// ================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

/**
 * Get current session (server-side)
 */
export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

/**
 * Get current user or redirect to login
 */
export async function getCurrentUser() {
  const session = await getCurrentSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  return session.user;
}

/**
 * Check if user has required role
 */
export async function requireRole(role: UserRole | UserRole[]) {
  const user = await getCurrentUser();
  const roles = Array.isArray(role) ? role : [role];

  if (!roles.includes(user.role)) {
    redirect('/unauthorized');
  }

  return user;
}

/**
 * Check if user has access to satellite
 */
export async function hasAccessToSatellite(satelliteCode: string): Promise<boolean> {
  const user = await getCurrentUser();

  // CEO has access to all satellites
  if (user.role === 'CEO') {
    return true;
  }

  // Manager has access to allowed satellites
  if (user.role === 'MANAGER') {
    return user.allowedSatellites.includes(satelliteCode);
  }

  // Employee has limited access
  return false;
}

/**
 * Get user's accessible satellites
 */
export async function getAccessibleSatellites(): Promise<string[]> {
  const user = await getCurrentUser();

  // CEO has access to all
  if (user.role === 'CEO') {
    return [];
  }

  // Manager has specific satellites
  if (user.role === 'MANAGER') {
    return user.allowedSatellites;
  }

  // Employee has no direct satellite access
  return [];
}
