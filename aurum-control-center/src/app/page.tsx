'use client'

import { useEffect, useState } from 'react'
import { Server, Cpu, HardDrive, MemoryStick, Activity } from 'lucide-react'
import { config } from '@/config/config'

interface ServerStatus {
  id: string
  name: string
  ip: string
  status: 'online' | 'offline'
  cpu: number
  ram: number
  disk: number
  lastUpdate: string
}

// Componente Sparkline para gráficas pequeñas
function Sparkline({ data, color }: { data: number[], color: string }) {
  const width = 60
  const height = 20
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - (value / 100) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        className="drop-shadow-sm"
      />
    </svg>
  )
}

// Componente para tarjeta de servidor
function ServerCard({ server }: { server: ServerStatus }) {
  const [sparkData, setSparkData] = useState<number[]>([])
  
  useEffect(() => {
    // Simular datos históricos
    const newData = Array.from({ length: 20 }, () => 
      Math.max(0, Math.min(100, server.cpu + (Math.random() - 0.5) * 20))
    )
    setSparkData(newData)
  }, [server.cpu])

  return (
    <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            w-3 h-3 rounded-full animate-pulse
            ${server.status === 'online' ? 'bg-green-500' : 'bg-red-500'}
          `} />
          <h3 className="text-lg font-semibold text-white">{server.name}</h3>
        </div>
        <Server className="w-5 h-5 text-cyber-gold" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">IP Address</span>
          <span className="text-sm font-mono text-white">{server.ip}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">CPU</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-white">{server.cpu}%</span>
            <Sparkline data={sparkData} color="#f87171" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MemoryStick className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">RAM</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-white">{server.ram}%</span>
            <Sparkline data={sparkData} color="#60a5fa" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Disk</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-white">{server.disk}%</span>
            <Sparkline data={sparkData} color="#fbbf24" />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Última actualización</span>
            <span className="text-xs text-gray-400">{server.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de botón de acción rápida
function ActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'primary' 
}: { 
  icon: any, 
  label: string, 
  onClick: () => void,
  variant?: 'primary' | 'secondary' | 'danger'
}) {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
  
  const variantClasses = {
    primary: "cyber-button",
    secondary: "bg-cyber-gray-700 hover:bg-cyber-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )
}

export default function Dashboard() {
  const [servers, setServers] = useState<ServerStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    const loadServers = async () => {
      setLoading(true)
      
      // Simular datos con timestamps
      const serverData = config.servers.map(server => ({
        ...server,
        lastUpdate: new Date().toLocaleTimeString('es-ES')
      }))
      
      setTimeout(() => {
        setServers(serverData)
        setLoading(false)
      }, 1000)
    }

    loadServers()
    
    // Actualizar cada 30 segundos
    const interval = setInterval(loadServers, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRestartDocker = async () => {
    // Simular llamada a webhook
    console.log('Reiniciando Docker...')
  }

  const handleViewLogs = async () => {
    // Simular vista de logs
    console.log('Viendo logs...')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-gold mx-auto"></div>
          <p className="text-cyber-gold mt-4 font-mono">Cargando Dashboard...</p>
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
            Dashboard & Server Health
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoreo en tiempo real de la infraestructura
          </p>
        </div>
        <div className="flex space-x-3">
          <ActionButton
            icon={Server}
            label="Reiniciar Docker"
            onClick={handleRestartDocker}
            variant="secondary"
          />
          <ActionButton
            icon={Activity}
            label="Ver Logs"
            onClick={handleViewLogs}
            variant="danger"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-green-400">
            {servers.filter(s => s.status === 'online').length}
          </div>
          <div className="text-sm text-gray-400">Servidores Online</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-red-400">
            {servers.filter(s => s.status === 'offline').length}
          </div>
          <div className="text-sm text-gray-400">Servidores Offline</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-cyber-gold">
            {Math.round(servers.reduce((acc, s) => acc + s.cpu, 0) / servers.length)}%
          </div>
          <div className="text-sm text-gray-400">CPU Promedio</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-cyber-cyan">
            {Math.round(servers.reduce((acc, s) => acc + s.ram, 0) / servers.length)}%
          </div>
          <div className="text-sm text-gray-400">RAM Promedio</div>
        </div>
      </div>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}