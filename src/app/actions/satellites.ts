"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import satelliteRepository from '@/infrastructure/repositories/satellite/satellite.repository';
import { SatelliteCategory, SatelliteStatus } from '@prisma/client';
import { getCurrentUser, requireRole } from '@/lib/session';

// Validation schema
const satelliteSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(100),
  category: z.nativeEnum(SatelliteCategory),
  status: z.nativeEnum(SatelliteStatus),
  inboxNumber: z.number().int().positive(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  primaryColor: z.string().optional().nullable(),
});

export async function getSatellites() {
  try {
    await getCurrentUser();
    const satellites = await satelliteRepository.findAll();
    return { success: true, data: satellites };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSatelliteById(id: string) {
  try {
    await getCurrentUser();
    const satellite = await satelliteRepository.findById(id);
    
    if (!satellite) {
      return { success: false, error: 'Satélite no encontrado' };
    }

    return { success: true, data: satellite };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSatellite(data: z.infer<typeof satelliteSchema>) {
  try {
    // Solo CEO y MANAGER pueden crear satélites
    await requireRole(['CEO', 'MANAGER']);

    // Validate input
    const validated = satelliteSchema.parse(data);

    // Check if code already exists
    const existing = await satelliteRepository.findByCode(validated.code);
    if (existing) {
      return { success: false, error: 'El código del satélite ya existe' };
    }

    const satellite = await satelliteRepository.create(validated);

    revalidatePath('/dashboard/satellites');
    revalidatePath('/dashboard');

    return { success: true, data: satellite };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Datos inválidos', details: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function updateSatellite(
  id: string,
  data: Partial<z.infer<typeof satelliteSchema>>
) {
  try {
    // Solo CEO y MANAGER pueden actualizar satélites
    await requireRole(['CEO', 'MANAGER']);

    const satellite = await satelliteRepository.update(id, data);

    revalidatePath('/dashboard/satellites');
    revalidatePath('/dashboard');

    return { success: true, data: satellite };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSatellite(id: string) {
  try {
    // Solo CEO puede eliminar satélites
    await requireRole('CEO');

    await satelliteRepository.delete(id);

    revalidatePath('/dashboard/satellites');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
