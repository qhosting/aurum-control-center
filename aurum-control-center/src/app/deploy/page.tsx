'use client'

import { useState } from 'react'
import { 
  Rocket, 
  User, 
  Server, 
  QrCode, 
  CheckCircle, 
  Loader2,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  MessageSquare,
  Phone
} from 'lucide-react'
import { config } from '@/config/config'

interface ServiceType {
  id: string
  name: string
  description: string
  icon: any
  ports: number[]
  category: 'communication' | 'support' | 'infrastructure'
  features: string[]
}

interface DeploymentConfig {
  service: ServiceType | null
  clientName: string
  port: number
  customOptions: Record<string, any>
}

interface DeploymentResult {
  success: boolean
  serviceId: string
  url: string
  qrCode: string
  message: string
}

const serviceTypes: ServiceType[] = [
  {
    id: 'waha',
    name: 'WAHA (WhatsApp Web API)',
    description: 'API de WhatsApp Web para automatización de mensajes',
    icon: MessageSquare,
    ports: config.services.waha.ports,
    category: 'communication',
    features: [
      'Envío y recepción de mensajes',
      'Soporte para grupos',
      'Envío de multimedia',
      'Webhooks configurables'
    ]
  },
  {
    id: 'chatwoot',
    name: 'Chatwoot',
    description: 'Plataforma de atención al cliente en tiempo real',
    icon: MessageSquare,
    ports: config.services.chatwoot.ports,
    category: 'support',
    features: [
      'Chat en vivo',
      'Múltiples canales',
      'Reportes avanzados',
      'Integración con CRM'
    ]
  },
  {
    id: 'pbx',
    name: 'Asterisk PBX',
    description: 'Sistema telefónico PBX basado en Asterisk',
    icon: Phone,
    ports: config.services.pbx.ports,
    category: 'infrastructure',
    features: [
      'Llamadas VoIP',
      'IVR configurables',
      'Grabación de llamadas',
      'Cola de llamadas'
    ]
  }
]

// Componente QR Code (simulado)
function QRCodeDisplay({ qrData, serviceName }: { qrData: string, serviceName: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-48 h-48 bg-white p-4 rounded-lg">
        {/* Simulación de QR Code */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded flex items-center justify-center">
          <QrCode className="w-32 h-32 text-white" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400">Escanea el código QR para acceder a</p>
        <p className="text-cyber-gold font-medium">{serviceName}</p>
      </div>
      <div className="text-xs text-gray-500 font-mono bg-gray-800 px-3 py-1 rounded">
        {qrData.substring(0, 32)}...
      </div>
    </div>
  )
}

// Componente para selección de tipo de servicio
function ServiceSelection({ 
  selectedService, 
  onSelectService 
}: { 
  selectedService: ServiceType | null
  onSelectService: (service: ServiceType) => void 
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cyber-cyan mb-2">Selecciona el Servicio</h2>
        <p className="text-gray-400">Elige el tipo de servicio que deseas desplegar</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service)}
            className={`
              glass-card p-6 text-left transition-all duration-300 hover:scale-105
              ${selectedService?.id === service.id ? 'border-2 border-cyber-gold' : 'border border-gray-600'}
            `}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-cyber-gold/10 rounded-lg flex items-center justify-center">
                <service.icon className="w-6 h-6 text-cyber-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{service.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{service.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">{service.description}</p>
            
            <div className="space-y-2">
              <div className="text-xs text-gray-400">Características:</div>
              <ul className="text-xs text-gray-300 space-y-1">
                {service.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente para configuración del servicio
function ServiceConfiguration({ 
  config, 
  onUpdateConfig 
}: { 
  config: DeploymentConfig
  onUpdateConfig: (updates: Partial<DeploymentConfig>) => void 
}) {
  const availablePorts = config.service?.ports || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cyber-cyan mb-2">Configuración</h2>
        <p className="text-gray-400">Configura los parámetros del servicio</p>
      </div>
      
      <div className="glass-card p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre del Cliente
          </label>
          <input
            type="text"
            value={config.clientName}
            onChange={(e) => onUpdateConfig({ clientName: e.target.value })}
            placeholder="ej: Empresa ABC"
            className="w-full px-4 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyber-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Puerto
          </label>
          <select
            value={config.port}
            onChange={(e) => onUpdateConfig({ port: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded-lg text-white focus:border-cyber-gold focus:outline-none"
          >
            <option value="">Selecciona un puerto</option>
            {availablePorts.map((port) => (
              <option key={port} value={port}>
                Puerto {port}
              </option>
            ))}
          </select>
        </div>

        {config.service && (
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Características del Servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {config.service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente para resultado del despliegue
function DeploymentResult({ result, onDeployAnother }: { 
  result: DeploymentResult
  onDeployAnother: () => void 
}) {
  if (!result.success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error en el Despliegue</h2>
          <p className="text-gray-400">{result.message}</p>
        </div>
        
        <div className="text-center">
          <button
            onClick={onDeployAnother}
            className="cyber-button px-6 py-3"
          >
            Intentar Nuevamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-400 mb-2">¡Despliegue Exitoso!</h2>
        <p className="text-gray-400">{result.message}</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Detalles del Servicio</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">ID del Servicio:</span>
            <span className="text-cyber-gold font-mono">{result.serviceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">URL de Acceso:</span>
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyber-cyan hover:text-cyber-blue transition-colors"
            >
              {result.url}
            </a>
          </div>
        </div>
      </div>

      {result.qrCode && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Código QR de Acceso
          </h3>
          <QRCodeDisplay qrData={result.qrCode} serviceName="Servicio Desplegado" />
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onDeployAnother}
          className="cyber-button px-6 py-3"
        >
          Desplegar Otro Servicio
        </button>
      </div>
    </div>
  )
}

// Importar XCircle
import { XCircle } from 'lucide-react'

export default function ServiceDeployer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<DeploymentConfig>({
    service: null,
    clientName: '',
    port: 0,
    customOptions: {}
  })
  const [isDeploying, setIsDeploying] = useState(false)
  const [result, setResult] = useState<DeploymentResult | null>(null)

  const updateConfig = (updates: Partial<DeploymentConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const handleDeploy = async () => {
    if (!config.service || !config.clientName || !config.port) {
      alert('Por favor completa todos los campos')
      return
    }

    setIsDeploying(true)
    
    try {
      // Simular llamada al webhook de n8n
      const response = await fetch(config.webhooks.serviceDeployer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: config.service.id,
          clientName: config.clientName,
          port: config.port,
          timestamp: new Date().toISOString()
        })
      })

      // Simular proceso de despliegue
      await new Promise(resolve => setTimeout(resolve, 3000))

      const mockResult: DeploymentResult = {
        success: true,
        serviceId: `${config.service.id}-${Date.now()}`,
        url: `http://localhost:${config.port}`,
        qrCode: `QR-${config.service.id}-${config.clientName.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`,
        message: `El servicio ${config.service.name} ha sido desplegado exitosamente para ${config.clientName}`
      }

      setResult(mockResult)
      setCurrentStep(4)
      
    } catch (error) {
      const mockError: DeploymentResult = {
        success: false,
        serviceId: '',
        url: '',
        qrCode: '',
        message: 'Error de conexión con el servidor de despliegue'
      }
      
      setResult(mockError)
      setCurrentStep(4)
    } finally {
      setIsDeploying(false)
    }
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setConfig({
      service: null,
      clientName: '',
      port: 0,
      customOptions: {}
    })
    setResult(null)
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return config.service !== null
      case 2:
        return config.clientName && config.port
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-tech font-bold text-cyber-gold">
            Service Deployer
          </h1>
          <p className="text-gray-400 mt-1">
            Asistente para desplegar nuevos servicios en Docker
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      {currentStep < 4 && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${currentStep >= step 
                    ? 'bg-cyber-gold text-cyber-dark' 
                    : 'bg-cyber-gray-700 text-gray-400'
                  }
                `}>
                  {step}
                </div>
                {step < 3 && (
                  <ChevronRight className="w-6 h-6 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Seleccionar Servicio</span>
            <span>Configurar</span>
            <span>Confirmar</span>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-96">
        {currentStep === 1 && (
          <ServiceSelection
            selectedService={config.service}
            onSelectService={(service) => updateConfig({ service })}
          />
        )}

        {currentStep === 2 && (
          <ServiceConfiguration
            config={config}
            onUpdateConfig={updateConfig}
          />
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-cyber-cyan mb-2">Confirmar Despliegue</h2>
              <p className="text-gray-400">Revisa la configuración antes de proceder</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Resumen de Configuración</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Servicio:</span>
                  <span className="text-white">{config.service?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cliente:</span>
                  <span className="text-white">{config.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Puerto:</span>
                  <span className="text-white">{config.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">URL de Acceso:</span>
                  <span className="text-cyber-cyan">http://localhost:{config.port}</span>
                </div>
              </div>
            </div>

            {isDeploying && (
              <div className="glass-card p-6 text-center">
                <Loader2 className="w-12 h-12 text-cyber-gold animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Desplegando Servicio...</h3>
                <p className="text-gray-400">Esto puede tomar unos minutos</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && result && (
          <DeploymentResult result={result} onDeployAnother={resetWizard} />
        )}
      </div>

      {/* Navigation */}
      {currentStep < 4 && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 bg-cyber-gray-700 hover:bg-cyber-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNext()}
              className="flex items-center space-x-2 cyber-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center space-x-2 cyber-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Rocket className="w-4 h-4" />
              <span>{isDeploying ? 'Desplegando...' : 'Desplegar Servicio'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}