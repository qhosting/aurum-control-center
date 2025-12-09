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
  return (
    <button
      onClick={() => onExecute(task)}
      className="glass-card p-6 hover:scale-105 transition-all duration-300 group text-left"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-cyber-gold/10 rounded-lg flex items-center justify-center group-hover:bg-cyber-gold/20 transition-colors">
          <task.icon className="w-6 h-6 text-cyber-gold" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{task.name}</h3>
          <p className="text-sm text-gray-400">{task.description}</p>
        </div>
      </div>
    </button>
  )
}

const maintenanceTasks: MaintenanceTask[] = [
  // Licencias QHosting
  {
    id: 'cpanel-license',
    name: 'Actualizar Licencia cPanel',
    description: 'Actualiza la licencia de cPanel vía mirror QHosting',
    command: config.maintenanceCommands.licenses.cpanel,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'softaculous-license',
    name: 'Actualizar Licencia Softaculous',
    description: 'Actualiza la licencia del instalador automático Softaculous',
    command: config.maintenanceCommands.licenses.softaculous,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'sitepad-license',
    name: 'Actualizar Licencia SitePad',
    description: 'Actualiza la licencia del constructor de sitios SitePad',
    command: config.maintenanceCommands.licenses.sitepad,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'whmreseller-license',
    name: 'Actualizar Licencia WHMReseller',
    description: 'Actualiza la licencia del panel de revendedores',
    command: config.maintenanceCommands.licenses.whmreseller,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'whmxtra-license',
    name: 'Actualizar Licencia WHMxtra',
    description: 'Actualiza la licencia de herramientas WHMxtra',
    command: config.maintenanceCommands.licenses.whmxtra,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'jetbackup-license',
    name: 'Actualizar Licencia JetBackup',
    description: 'Actualiza la licencia del sistema de respaldos JetBackup',
    command: config.maintenanceCommands.licenses.jetbackup,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'cloudlinux-license',
    name: 'Actualizar Licencia CloudLinux',
    description: 'Actualiza la licencia de CloudLinux OS',
    command: config.maintenanceCommands.licenses.cloudlinux,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'litespeedx-license',
    name: 'Actualizar Licencia LiteSpeed Enterprise',
    description: 'Actualiza la licencia del servidor web LiteSpeed',
    command: config.maintenanceCommands.licenses.litespeedx,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'kernelcare-license',
    name: 'Actualizar Licencia KernelCare',
    description: 'Actualiza la licencia de parches de kernel KernelCare',
    command: config.maintenanceCommands.licenses.kernelcare,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'osm-license',
    name: 'Actualizar Licencia OSM',
    description: 'Actualiza la licencia del optimizador de servidor OSM',
    command: config.maintenanceCommands.licenses.osm,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'cxs-license',
    name: 'Actualizar Licencia CXS',
    description: 'Actualiza la licencia del escáner de seguridad CXS',
    command: config.maintenanceCommands.licenses.cxs,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'backuply-license',
    name: 'Actualizar Licencia Backuply',
    description: 'Actualiza la licencia del sistema de respaldos Backuply',
    command: config.maintenanceCommands.licenses.backuply,
    icon: Shield,
    category: 'license'
  },
  {
    id: 'imunify360-license',
    name: 'Actualizar Licencia Imunify360',
    description: 'Actualiza la licencia del firewall Imunify360',
    command: config.maintenanceCommands.licenses.imunify360,
    icon: Shield,
    category: 'license'
  },
  
  // Tareas de mantenimiento
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
  },
  
  // Servicios
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
]

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