'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Filter,
  Search,
  X
} from 'lucide-react'

interface N8nLog {
  id: string
  flowId: string
  flowName: string
  error: string
  status: 'error' | 'warning' | 'success'
  timestamp: string
  duration?: number
  executionId?: string
}

interface FilterState {
  status: string
  search: string
  dateRange: string
}

// Componente para mostrar un log individual
function LogEntry({ log }: { log: N8nLog }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'error':
        return 'border-l-red-400 bg-red-500/5'
      case 'warning':
        return 'border-l-yellow-400 bg-yellow-500/5'
      case 'success':
        return 'border-l-green-400 bg-green-500/5'
      default:
        return 'border-l-gray-400 bg-gray-500/5'
    }
  }

  const formatDuration = (ms?: number) => {
    if (!ms) return 'N/A'
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <div className={`glass-card p-4 border-l-4 ${getStatusColor(log.status)} transition-all hover:scale-102`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(log.status)}
          <div>
            <h3 className="font-medium text-white">{log.flowName}</h3>
            <p className="text-sm text-gray-400">ID: {log.flowId}</p>
          </div>
        </div>
        <div className="text-right text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(log.timestamp).toLocaleString('es-ES')}</span>
          </div>
          {log.duration && (
            <div className="text-xs mt-1">
              Duración: {formatDuration(log.duration)}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Error:</span>
          <p className="text-sm text-gray-200 mt-1 font-mono">{log.error}</p>
        </div>
        
        {log.executionId && (
          <div className="text-xs text-gray-500 font-mono">
            Ejecución: {log.executionId}
          </div>
        )}
      </div>
    </div>
  )
}

// Componente de filtros
function LogFilters({ 
  filters, 
  onFiltersChange 
}: { 
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-cyber-gray-700 hover:bg-cyber-gray-600 text-white rounded-lg transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filtros</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 glass-card z-10 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">Filtros</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estado
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded text-white focus:border-cyber-gold focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="error">Errores</option>
              <option value="warning">Advertencias</option>
              <option value="success">Éxitos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                placeholder="Buscar por flujo o error..."
                className="w-full pl-10 pr-3 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded text-white placeholder-gray-400 focus:border-cyber-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rango de tiempo
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
              className="w-full px-3 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded text-white focus:border-cyber-gold focus:outline-none"
            >
              <option value="">Todo el tiempo</option>
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últ</option>
           imos 30 días </select>
          </div>

          <button
            onClick={() => onFiltersChange({ status: '', search: '', dateRange: '' })}
            className="w-full px-4 py-2 bg-cyber-gold hover:bg-cyber-amber text-cyber-dark rounded font-medium transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  )
}

// Componente de estadísticas
function LogStats({ logs }: { logs: N8nLog[] }) {
  const errorCount = logs.filter(log => log.status === 'error').length
  const warningCount = logs.filter(log => log.status === 'warning').length
  const successCount = logs.filter(log => log.status === 'success').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-white">{logs.length}</div>
        <div className="text-sm text-gray-400">Total de Logs</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-red-400">{errorCount}</div>
        <div className="text-sm text-gray-400">Errores</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-yellow-400">{warningCount}</div>
        <div className="text-sm text-gray-400">Advertencias</div>
      </div>
      <div className="glass-card p-6 text-center">
        <div className="text-2xl font-bold text-green-400">{successCount}</div>
        <div className="text-sm text-gray-400">Ejecuciones Exitosas</div>
      </div>
    </div>
  )
}

// Generar logs simulados
const generateMockLogs = (): N8nLog[] => {
  const flows = [
    { id: 'flow-001', name: 'WhatsApp Auto Reply' },
    { id: 'flow-002', name: 'CRM Sync' },
    { id: 'flow-003', name: 'Email Marketing' },
    { id: 'flow-004', name: 'Invoice Generator' },
    { id: 'flow-005', name: 'Support Ticket' }
  ]

  const errors = [
    'Connection timeout to external API',
    'Invalid webhook signature',
    'Database connection failed',
    'Rate limit exceeded',
    'Invalid JSON payload',
    'Missing required parameter',
    'Authentication failed',
    'Service temporarily unavailable'
  ]

  const statuses: ('error' | 'warning' | 'success')[] = ['error', 'warning', 'success']

  return Array.from({ length: 20 }, (_, i) => {
    const flow = flows[Math.floor(Math.random() * flows.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const error = errors[Math.floor(Math.random() * errors.length)]
    
    return {
      id: `log-${i + 1}`,
      flowId: flow.id,
      flowName: flow.name,
      error: status === 'success' ? 'Workflow executed successfully' : error,
      status,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: Math.floor(Math.random() * 5000) + 100,
      executionId: `exec-${Date.now()}-${i}`
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function N8nHealthMonitor() {
  const [logs, setLogs] = useState<N8nLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<N8nLog[]>([])
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    search: '',
    dateRange: ''
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simular carga de datos
  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true)
      
      // Simular llamada a webhook
      try {
        const response = await fetch('/api/n8n-health', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'get_logs',
            timestamp: new Date().toISOString()
          })
        })

        // Simular logs
        const mockLogs = generateMockLogs()
        setLogs(mockLogs)
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Error loading n8n logs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLogs()
    
    // Actualizar cada 60 segundos
    const interval = setInterval(loadLogs, 60000)
    return () => clearInterval(interval)
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...logs]

    if (filters.status) {
      filtered = filtered.filter(log => log.status === filters.status)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(log => 
        log.flowName.toLowerCase().includes(searchLower) ||
        log.error.toLowerCase().includes(searchLower) ||
        log.flowId.toLowerCase().includes(searchLower)
      )
    }

    if (filters.dateRange) {
      const now = new Date()
      const cutoff = new Date()
      
      switch (filters.dateRange) {
        case '1h':
          cutoff.setHours(now.getHours() - 1)
          break
        case '24h':
          cutoff.setDate(now.getDate() - 1)
          break
        case '7d':
          cutoff.setDate(now.getDate() - 7)
          break
        case '30d':
          cutoff.setDate(now.getDate() - 30)
          break
      }
      
      filtered = filtered.filter(log => new Date(log.timestamp) >= cutoff)
    }

    setFilteredLogs(filtered)
  }, [logs, filters])

  const handleRefresh = async () => {
    setLoading(true)
    // Simular refresh
    setTimeout(() => {
      setLogs(generateMockLogs())
      setLastUpdate(new Date())
      setLoading(false)
    }, 1000)
  }

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyber-gold animate-spin mx-auto mb-4" />
          <p className="text-cyber-gold font-mono">Cargando logs de n8n...</p>
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
            n8n Health Monitor
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoreo de logs y errores de flujos n8n
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right text-sm text-gray-400">
            <div>Última actualización:</div>
            <div className="font-mono">{lastUpdate.toLocaleTimeString('es-ES')}</div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 cyber-button px-4 py-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <LogStats logs={logs} />

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-cyber-cyan">Logs de Errores</h2>
          <span className="text-sm text-gray-400">
            Mostrando {filteredLogs.length} de {logs.length} registros
          </span>
        </div>
        <LogFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No hay logs disponibles</h3>
            <p className="text-gray-400">
              {logs.length === 0 
                ? 'No se han encontrado logs de n8n'
                : 'No hay logs que coincidan con los filtros aplicados'
              }
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <LogEntry key={log.id} log={log} />
          ))
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4">Información</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Los logs se actualizan automáticamente cada 60 segundos</p>
          <p>• Los errores críticos aparecen en rojo, las advertencias en amarillo</p>
          <p>• Utiliza los filtros para buscar logs específicos por estado, fecha o contenido</p>
          <p>• Los flujos con múltiples errores pueden indicar problemas de configuración</p>
        </div>
      </div>
    </div>
  )
}