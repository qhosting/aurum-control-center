"use client";

import { useState } from 'react';
import { Button } from '@/presentation/components/ui/button';
import { Plus } from 'lucide-react';
import { SatelliteFormDialog } from './satellite-form-dialog';

export function CreateSatelliteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="cyber-button">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Satélite
      </Button>
      <SatelliteFormDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
