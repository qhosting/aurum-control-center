"use client";

import { useState } from 'react';
import { Satellite } from '@prisma/client';
import { Badge } from '@/presentation/components/ui/badge';
import { Button } from '@/presentation/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { EditSatelliteDialog } from './edit-satellite-dialog';
import { deleteSatellite } from '@/app/actions/satellites';

interface SatelliteTableProps {
  satellites: Satellite[];
}

export function SatelliteTable({ satellites }: SatelliteTableProps) {
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (satellite: Satellite) => {
    setSelectedSatellite(satellite);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este satélite?')) return;

    const result = await deleteSatellite(id);
    if (result.success) {
      alert('Satélite eliminado exitosamente');
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-cyber-border">
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-3 pl-4">Código</th>
              <th className="pb-3">Nombre</th>
              <th className="pb-3">Categoría</th>
              <th className="pb-3">Inbox</th>
              <th className="pb-3">Estado</th>
              <th className="pb-3 pr-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((satellite) => (
              <tr
                key={satellite.id}
                className="border-b border-cyber-border hover:bg-cyber-border/20 transition-colors"
              >
                <td className="py-4 pl-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: satellite.primaryColor || '#FFD700' }}
                    >
                      <span className="text-sm font-bold text-cyber-dark">
                        {satellite.code.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      {satellite.code}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <p className="font-medium text-foreground">{satellite.name}</p>
                    {satellite.website && (
                      <a
                        href={satellite.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gold-500 hover:underline"
                      >
                        {satellite.website}
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-400">
                    {satellite.category}
                  </span>
                </td>
                <td className="py-4">
                  <Badge variant="outline" className="text-xs">
                    Inbox {satellite.inboxNumber}
                  </Badge>
                </td>
                <td className="py-4">
                  <Badge
                    variant={satellite.status === 'ACTIVE' ? 'default' : 'secondary'}
                  >
                    {satellite.status}
                  </Badge>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(satellite)}
                      className="text-gold-500 hover:text-gold-400"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(satellite.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSatellite && (
        <EditSatelliteDialog
          satellite={selectedSatellite}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}
    </>
  );
}
