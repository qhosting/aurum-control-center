'use client'

import { useState, useEffect } from 'react'
import { 
  Monitor, 
  Server, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Network,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { config } from '@/config/config'

interface ServerMetrics {
  id: string
  name: string
  ip: string
  status: 'online' | 'offline' | 'warning'
  cpu: number
  ram: number
  disk: number
  networkIn: number
  networkOut: number
  uptime: string
  lastUpdate: string
  processes: number
  loadAverage: number[]
}

// Componente para gráfico de uso
function UsageChart({ 
  value, 
  color, 
  label 
}: { 
  value: number
  color: string
  label: string 
}) {
  const percentage = Math.min(100, Math.max(0, value))
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-mono text-white">{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-cyber-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Componente para tarjeta de métricas del servidor
function ServerMetricsCard({ server }: { server: ServerMetrics }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'offline':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'offline':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Monitor className="w-5 h-5" />
    }
  }

  const getCpuColor = (cpu: number) => {
    if (cpu > 80) return 'bg-red-500'
    if (cpu > 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getRamColor = (ram: number) => {
    if (ram > 85) return 'bg-red-500'
    if (ram > 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getDiskColor = (disk: number) => {
    if (disk > 90) return 'bg-red-500'
    if (disk > 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`
            w-3 h-3 rounded-full animate-pulse
            ${server.status === 'online' ? 'bg-green-500' : 
              server.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}
          `} />
          <h3 className="text-lg font-semibold text-white">{server.name}</h3>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor(server.status)}`}>
          {getStatusIcon(server.status)}
          <span className="text-sm font-medium capitalize">{server.status}</span>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">IP:</span>
          <span className="ml-2 font-mono text-white">{server.ip}</span>
        </div>
        <div>
          <span className="text-gray-400">Procesos:</span>
          <span className="ml-2 font-mono text-white">{server.processes}</span>
        </div>
        <div>
          <span className="text-gray-400">Uptime:</span>
          <span className="ml-2 font-mono text-white">{server.uptime}</span>
        </div>
        <div>
          <span className="text-gray-400">Load Avg:</span>
          <span className="ml-2 font-mono text-white">
            {server.loadAverage.map(load => load.toFixed(2)).join(', ')}
          </span>
        </div>
      </div>

      {/* Usage Charts */}
      <div className="space-y-4">
        <UsageChart 
          value={server.cpu} 
          color={getCpuColor(server.cpu)} 
          label="CPU" 
        />
        <UsageChart 
          value={server.ram} 
          color={getRamColor(server.ram)} 
          label="RAM" 
        />
        <UsageChart 
          value={server.disk} 
          color={getDiskColor(server.disk)} 
          label="Disk" 
        />
      </div>

      {/* Network Stats */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
          <Network className="w-4 h-4" />
          <span>Tráfico de Red</span>
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Entrada:</span>
            <span className="ml-2 font-mono text-green-400">
              {server.networkIn} MB/s
            </span>
          </div>
          <div>
            <span className="text-gray-400">Salida:</span>
            <span className="ml-2 font-mono text-blue-400">
              {server.networkOut} MB/s
            </span>
          </div>
        </div>
      </div>

      {/* Last Update */}
      <div className="pt-3 border-t border-gray-700">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Última actualización:</span>
          <span>{server.lastUpdate}</span>
        </div>
      </div>
    </div>
  )
}

// Componente para resumen general
function OverallSummary({ servers }: { servers: ServerMetrics[] }) {
  const onlineServers = servers.filter(s => s.status === 'online').length
  const warningServers = servers.filter(s => s.status === 'warning').length
  const offlineServers = servers.filter(s => s.status === 'offline').length
  
  const avgCpu = servers.reduce((acc, s) => acc + s.cpu, 0) / servers.length
  const avgRam = servers.reduce((acc, s) => acc + s.ram, 0) / servers.length
  const avgDisk = servers.reduce((acc, s) => acc + s.disk, 0) / servers.length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-green-400">{onlineServers}</div>
        <div className="text-sm text-gray-400">Servidores Online</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-yellow-400">{warningServers}</div>
        <div className="text-sm text-gray-400">Con Advertencias</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-red-400">{offlineServers}</div>
        <div className="text-sm text-gray-400">Offline</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-cyber-gold">
          {Math.round((onlineServers / servers.length) * 100)}%
        </div>
        <div className="text-sm text-gray-400">Disponibilidad</div>
      </div>

      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-red-400">{avgCpu.toFixed(1)}%</div>
        <div className="text-sm text-gray-400">CPU Promedio</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-blue-400">{avgRam.toFixed(1)}%</div>
        <div className="text-sm text-gray-400">RAM Promedio</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-yellow-400">{avgDisk.toFixed(1)}%</div>
        <div className="text-sm text-gray-400">Disk Promedio</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-cyber-cyan">
          {servers.reduce((acc, s) => acc + s.processes, 0)}
        </div>
        <div className="text-sm text-gray-400">Procesos Totales</div>
      </div>
    </div>
  )
}

export default function ServerHealth() {
  const [servers, setServers] = useState<ServerMetrics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServerMetrics = async () => {
      setLoading(true)
      
      // Simular datos de servidores con métricas más detalladas
      const mockServers: ServerMetrics[] = config.servers.map(server => ({
        id: server.id,
        name: server.name,
        ip: server.ip,
        status: server.status,
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        networkIn: Math.floor(Math.random() * 100) + 10,
        networkOut: Math.floor(Math.random() * 100) + 5,
        uptime: `${Math.floor(Math.random() * 30) + 1}d ${Math.floor(Math.random() * 24)}h`,
        lastUpdate: new Date().toLocaleTimeString('es-ES'),
        processes: Math.floor(Math.random() * 500) + 50,
        loadAverage: [
          Math.random() * 4,
          Math.random() * 4,
          Math.random() * 4
        ]
      }))
      
      setTimeout(() => {
        setServers(mockServers)
        setLoading(false)
      }, 1000)
    }

    loadServerMetrics()
    
    // Actualizar cada 30 segundos
    const interval = setInterval(loadServerMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Activity className="w-12 h-12 text-cyber-gold animate-spin mx-auto mb-4" />
          <p className="text-cyber-gold font-mono">Cargando métricas de servidores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-tech font-bold text-cyber-gold">
            Server Health Monitor
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoreo detallado de métricas de servidores
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right text-sm text-gray-400">
            <div>Última actualización:</div>
            <div className="font-mono">
              {new Date().toLocaleTimeString('es-ES')}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <OverallSummary servers={servers} />

      {/* Servers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servers.map((server) => (
          <ServerMetricsCard key={server.id} server={server} />
        ))}
      </div>

      {/* Instructions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4">Información del Sistema</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Las métricas se actualizan automáticamente cada 30 segundos</p>
          <p>• Los colores indican: Verde (Normal), Amarillo (Precaución), Rojo (Crítico)</p>
          <p>• Load Average muestra la carga del sistema en los últimos 1, 5 y 15 minutos</p>
          <p>• El tráfico de red se mide en megabytes por segundo</p>
        </div>
      </div>
    </div>
  )
}