'use client'

import { useState } from 'react'
import { 
  Terminal, 
  RefreshCw, 
  Shield, 
  Trash2, 
  Server, 
  Copy,
  CheckCircle
} from 'lucide-react'
import { config } from '@/config/config'

interface TerminalOutput {
  id: string
  command: string
  output: string
  timestamp: string
  status: 'running' | 'success' | 'error'
}

interface MaintenanceTask {
  id: string
  name: string
  description: string
  command: string
  icon: any
  category: 'license' | 'maintenance' | 'service'
  vendor?: string
  enabled?: boolean
}

// Componente Terminal para mostrar la salida
function Terminal({ outputs }: { outputs: TerminalOutput[] }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="terminal max-h-96 overflow-y-auto">
      {outputs.map((output) => (
        <div key={output.id} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <span className="text-white">{output.command}</span>
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${output.status === 'running' ? 'bg-yellow-400' : 
                  output.status === 'success' ? 'bg-green-400' : 'bg-red-400'}
              `} />
            </div>
            <button
              onClick={() => copyToClipboard(output.output, output.id)}
              className="text-green-400 hover:text-green-300 transition-colors"
              title="Copiar salida"
            >
              {copied === output.id ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="text-green-300 font-mono text-sm whitespace-pre-wrap">
            {output.output}
          </div>
          <div className="text-green-600 text-xs mt-1">
            {output.timestamp}
          </div>
        </div>
      ))}
      {outputs.length === 0 && (
        <div className="text-green-600">
          Terminal listo. Selecciona una tarea para ejecutar...
        </div>
      )}
    </div>
  )
}

// Componente para botón de tarea de mantenimiento
function MaintenanceButton({ task, onExecute }: { 
  task: MaintenanceTask, 
  onExecute: (task: MaintenanceTask) => void 
}) {
  // Obtener color según categoría para licencias
  const getCategoryColor = (category: string) => {
    const colors = {
      'control-panel': 'bg-blue-500/10 border-blue-500/20',
      'installer': 'bg-green-500/10 border-green-500/20',
      'builder': 'bg-purple-500/10 border-purple-500/20',
      'reseller': 'bg-orange-500/10 border-orange-500/20',
      'tools': 'bg-yellow-500/10 border-yellow-500/20',
      'backup': 'bg-red-500/10 border-red-500/20',
      'os': 'bg-indigo-500/10 border-indigo-500/20',
      'webserver': 'bg-cyan-500/10 border-cyan-500/20',
      'security': 'bg-pink-500/10 border-pink-500/20',
      'optimizer': 'bg-lime-500/10 border-lime-500/20'
    }
    return colors[category] || 'bg-cyber-gold/10 border-cyber-gold/20'
  }

  return (
    <button
      onClick={() => onExecute(task)}
      className={`glass-card p-6 hover:scale-105 transition-all duration-300 group text-left border ${getCategoryColor(task.category)}`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-cyber-gold/10 rounded-lg flex items-center justify-center group-hover:bg-cyber-gold/20 transition-colors">
          <task.icon className="w-6 h-6 text-cyber-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{task.name}</h3>
          <p className="text-sm text-gray-400 mb-2 line-clamp-2">{task.description}</p>
          
          {/* Tags de categoría y proveedor para licencias */}
          {task.category === 'license' && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyber-cyan/20 text-cyber-cyan">
                {task.id.replace('-license', '').replace(/([A-Z])/g, ' $1').trim()}
              </span>
              {task.vendor && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyber-gold/20 text-cyber-gold">
                  {task.vendor}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

// Función para obtener el icono según la categoría
const getIconForCategory = (category: string) => {
  const iconMap = {
    'control-panel': Shield,
    'installer': RefreshCw,
    'builder': Server,
    'reseller': Shield,
    'tools': RefreshCw,
    'backup': Server,
    'os': Server,
    'webserver': Server,
    'security': Shield,
    'optimizer': RefreshCw
  }
  return iconMap[category] || Shield
}

// Función para generar tareas dinámicamente desde la configuración
const generateMaintenanceTasks = (): MaintenanceTask[] => {
  const tasks: MaintenanceTask[] = []
  
  // Generar tareas de licencias desde la configuración dinámica
  config.maintenanceCommands.licenses
    .filter(license => license.enabled !== false) // Solo incluir licencias habilitadas
    .forEach(license => {
      tasks.push({
        id: `${license.id}-license`,
        name: `Actualizar Licencia ${license.name}`,
        description: `Actualiza la licencia de ${license.name}`,
        command: license.command,
        icon: getIconForCategory(license.category),
        category: 'license',
        vendor: license.vendor,
        enabled: license.enabled
      })
    })
  
  // Agregar tareas de mantenimiento del sistema
  tasks.push(
    {
      id: 'clean-temp',
      name: 'Limpiar Temporales',
      description: 'Elimina archivos temporales del sistema',
      command: config.maintenanceCommands.maintenance.cleanTemp,
      icon: Trash2,
      category: 'maintenance'
    },
    {
      id: 'update-system',
      name: 'Actualizar Sistema',
      description: 'Actualiza paquetes del sistema operativo',
      command: config.maintenanceCommands.maintenance.updateSystem,
      icon: RefreshCw,
      category: 'maintenance'
    }
  )
  
  // Agregar tareas de servicios
  tasks.push(
    {
      id: 'restart-apache',
      name: 'Reiniciar Apache',
      description: 'Reinicia el servidor web Apache',
      command: config.maintenanceCommands.maintenance.restartApache,
      icon: Server,
      category: 'service'
    },
    {
      id: 'restart-nginx',
      name: 'Reiniciar Nginx',
      description: 'Reinicia el servidor web Nginx',
      command: config.maintenanceCommands.maintenance.restartNginx,
      icon: Server,
      category: 'service'
    },
    {
      id: 'restart-web',
      name: 'Reiniciar Servicios Web',
      description: 'Reinicia Apache, Nginx y PHP-FPM',
      command: config.maintenanceCommands.maintenance.restartWeb,
      icon: RefreshCw,
      category: 'service'
    },
    {
      id: 'check-services',
      name: 'Verificar Servicios',
      description: 'Muestra el estado de servicios críticos',
      command: config.maintenanceCommands.maintenance.checkServices,
      icon: Server,
      category: 'service'
    }
  )
  
  return tasks
}

const maintenanceTasks: MaintenanceTask[] = generateMaintenanceTasks()

export default function ServerMaintenance() {
  const [terminalOutputs, setTerminalOutputs] = useState<TerminalOutput[]>([])
  const [isExecuting, setIsExecuting] = useState(false)

  const executeTask = async (task: MaintenanceTask) => {
    setIsExecuting(true)
    
    const newOutput: TerminalOutput = {
      id: Date.now().toString(),
      command: task.command,
      output: '',
      timestamp: new Date().toLocaleTimeString('es-ES'),
      status: 'running'
    }
    
    setTerminalOutputs(prev => [...prev, newOutput])
    
    try {
      // Simular llamada al webhook de n8n
      const response = await fetch(config.webhooks.serverMaintenance, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: task.id,
          command: task.command,
          timestamp: new Date().toISOString()
        })
      })
      
      // Simular respuesta del webhook
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockOutput = `$ ${task.command}

⬇️  Descargando script desde mirror.qhosting.net...
✓ Script descargado exitosamente
⬇️  Instalando/Actualizando licencia...
✓ Proceso completado sin errores

📊 Resultados:
⏱️  Tiempo de ejecución: 2.47s
🖥️  Servidores procesados: 3/3
✅ Estado: Todos los servidores actualizados

📝 Detalles por servidor:
• aurum.qhosting.net: ✓ Actualizado correctamente
• backup.qhosting.net: ✓ Actualizado correctamente  
• main.qhosting.net: ✓ Actualizado correctamente

🔄 Próxima verificación automática en 24 horas`
      
      setTerminalOutputs(prev => prev.map(output => 
        output.id === newOutput.id 
          ? { ...output, output: mockOutput, status: 'success' as const }
          : output
      ))
      
    } catch (error) {
      const errorOutput = `Error ejecutando: ${task.command}
Error: Fallo en la conexión con el servidor de mantenimiento
Código: 500 - Internal Server Error`
      
      setTerminalOutputs(prev => prev.map(output => 
        output.id === newOutput.id 
          ? { ...output, output: errorOutput, status: 'error' as const }
          : output
      ))
    } finally {
      setIsExecuting(false)
    }
  }

  const clearTerminal = () => {
    setTerminalOutputs([])
  }

  const tasksByCategory = {
    license: maintenanceTasks.filter(t => t.category === 'license'),
    maintenance: maintenanceTasks.filter(t => t.category === 'maintenance'),
    service: maintenanceTasks.filter(t => t.category === 'service')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-tech font-bold text-cyber-gold">
            Server Maintenance
          </h1>
          <p className="text-gray-400 mt-1">
            Panel de control para licencias QHosting, mantenimiento y gestión de servicios
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={clearTerminal}
            className="flex items-center space-x-2 px-4 py-2 bg-cyber-gray-700 hover:bg-cyber-gray-600 text-white rounded-lg transition-colors"
            disabled={isExecuting}
          >
            <Terminal className="w-4 h-4" />
            <span>Limpiar Terminal</span>
          </button>
        </div>
      </div>

      {/* Tasks by Category */}
      <div className="space-y-8">
        {/* License Tasks */}
        <div>
          <h2 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Licencias QHosting</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasksByCategory.license.map((task) => (
              <MaintenanceButton
                key={task.id}
                task={task}
                onExecute={executeTask}
              />
            ))}
          </div>
        </div>

        {/* Maintenance Tasks */}
        <div>
          <h2 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
            <Trash2 className="w-5 h-5" />
            <span>Mantenimiento del Sistema</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tasksByCategory.maintenance.map((task) => (
              <MaintenanceButton
                key={task.id}
                task={task}
                onExecute={executeTask}
              />
            ))}
          </div>
        </div>

        {/* Service Tasks */}
        <div>
          <h2 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Gestión de Servicios</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tasksByCategory.service.map((task) => (
              <MaintenanceButton
                key={task.id}
                task={task}
                onExecute={executeTask}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-cyber-cyan flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Terminal Output</span>
          </h2>
          {isExecuting && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm">Ejecutando...</span>
            </div>
          )}
        </div>
        <Terminal outputs={terminalOutputs} />
      </div>
    </div>
  )
}