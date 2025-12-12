"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { createSatellite } from '@/app/actions/satellites';
import { SatelliteCategory, SatelliteStatus } from '@prisma/client';

interface SatelliteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SatelliteFormDialog({
  open,
  onOpenChange,
}: SatelliteFormDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'SAAS' as SatelliteCategory,
    status: 'ACTIVE' as SatelliteStatus,
    inboxNumber: 3,
    email: '',
    phone: '',
    website: '',
    description: '',
    primaryColor: '#FFD700',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createSatellite(formData);

    if (result.success) {
      alert('Satélite creado exitosamente');
      onOpenChange(false);
      router.refresh();
    } else {
      alert(`Error: ${result.error}`);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] cyber-card">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-gold-500">Nuevo Satélite</DialogTitle>
            <DialogDescription>
              Crea un nuevo satélite en el holding Aurum Capital
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                  className="cyber-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="cyber-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as SatelliteCategory })
                  }
                >
                  <SelectTrigger className="cyber-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INFRASTRUCTURE">Infraestructura</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="BEAUTY">Belleza</SelectItem>
                    <SelectItem value="MANUFACTURING">Manufactura</SelectItem>
                    <SelectItem value="FINTECH">Fintech</SelectItem>
                    <SelectItem value="SAAS">SaaS</SelectItem>
                    <SelectItem value="HARDWARE">Hardware</SelectItem>
                    <SelectItem value="TRADING">Trading</SelectItem>
                    <SelectItem value="CONSULTING">Consultoría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inboxNumber">Número de Inbox *</Label>
                <Input
                  id="inboxNumber"
                  type="number"
                  value={formData.inboxNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, inboxNumber: parseInt(e.target.value) })
                  }
                  required
                  className="cyber-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="cyber-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="cyber-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="cyber-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="cyber-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Color Primario</Label>
              <Input
                id="primaryColor"
                type="color"
                value={formData.primaryColor}
                onChange={(e) =>
                  setFormData({ ...formData, primaryColor: e.target.value })
                }
                className="h-10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="cyber-button" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Satélite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
