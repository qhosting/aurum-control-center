import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Badge } from '@/presentation/components/ui/badge';
import { getCurrentUser } from '@/lib/session';
import satelliteRepository from '@/infrastructure/repositories/satellite/satellite.repository';
import taskRepository from '@/infrastructure/repositories/task/task.repository';
import { Satellite, Activity, CheckSquare, AlertCircle } from 'lucide-react';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // Obtener estadísticas
  const [satellites, allTasks, overdueTasks] = await Promise.all([
    satelliteRepository.findAll(),
    taskRepository.findAll(),
    taskRepository.findOverdue(),
  ]);

  const activeSatellites = satellites.filter((s) => s.status === 'ACTIVE').length;
  const pendingTasks = allTasks.filter((t) => ['TODO', 'IN_PROGRESS'].includes(t.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gold-500">Dashboard</h1>
        <p className="text-gray-400 mt-1">Vista general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cyber-card border-gold-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Satélites Activos
            </CardTitle>
            <Satellite className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gold-500">{activeSatellites}</div>
            <p className="text-xs text-gray-500 mt-1">
              de {satellites.length} totales
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Tareas Pendientes
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{pendingTasks}</div>
            <p className="text-xs text-gray-500 mt-1">
              de {allTasks.length} totales
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Tareas Vencidas
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {overdueTasks.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Requieren atención</p>
          </CardContent>
        </Card>

        <Card className="cyber-card border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Tu Rol
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{user.role}</div>
            <p className="text-xs text-gray-500 mt-1">
              {user.role === 'CEO' ? 'Acceso total' : `${user.allowedSatellites.length} satélites`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Satellites Overview */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-gold-500">Satélites del Holding</CardTitle>
          <CardDescription>Vista rápida de todos los satélites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {satellites.map((satellite) => (
              <div
                key={satellite.id}
                className="flex items-center space-x-4 rounded-lg border border-cyber-border bg-cyber-card p-4 hover:border-gold-500/50 transition-colors"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: satellite.primaryColor || '#FFD700' }}
                >
                  <span className="text-xl font-bold text-cyber-dark">
                    {satellite.code.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {satellite.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {satellite.category}
                  </p>
                </div>
                <Badge
                  variant={satellite.status === 'ACTIVE' ? 'default' : 'secondary'}
                >
                  {satellite.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      {overdueTasks.length > 0 && (
        <Card className="cyber-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-500">Tareas Vencidas</CardTitle>
            <CardDescription>Requieren atención inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {task.satellite.name} • Vence: {new Date(task.dueDate!).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
