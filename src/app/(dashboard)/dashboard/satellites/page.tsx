import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Badge } from '@/presentation/components/ui/badge';
import { Plus } from 'lucide-react';
import satelliteRepository from '@/infrastructure/repositories/satellite/satellite.repository';
import { SatelliteTable } from '@/presentation/components/satellites/satellite-table';
import { CreateSatelliteButton } from '@/presentation/components/satellites/create-satellite-button';

export default async function SatellitesPage() {
  const satellites = await satelliteRepository.findAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-500">Satélites</h1>
          <p className="text-gray-400 mt-1">
            Gestión de los {satellites.length} satélites del holding
          </p>
        </div>
        <CreateSatelliteButton />
      </div>

      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-gold-500">Lista de Satélites</CardTitle>
          <CardDescription>
            Administra todos los satélites del holding Aurum Capital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SatelliteTable satellites={satellites} />
        </CardContent>
      </Card>
    </div>
  );
}
