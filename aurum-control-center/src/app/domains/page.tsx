'use client'

import { useState } from 'react'
import { 
  Globe, 
  Calendar, 
  User, 
  Settings, 
  Copy, 
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Lock,
  Key
} from 'lucide-react'
import { config } from '@/config/config'

interface Domain {
  id: number
  domain: string
  client: string
  expirationDate: string
  status: 'active' | 'expired' | 'pending'
  nameservers: string[]
  eppCode?: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

// Componente Modal reutilizable
function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Configuración</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Componente para cambiar nameservers
function NameserverModal({ 
  isOpen, 
  onClose, 
  domain, 
  onSave 
}: ModalProps & { 
  domain: Domain | null
  onSave: (nameservers: string[]) => void 
}) {
  const [nameservers, setNameservers] = useState<string[]>(
    domain?.nameservers || ['', '']
  )

  const handleSave = () => {
    const validNS = nameservers.filter(ns => ns.trim())
    if (validNS.length >= 2) {
      onSave(validNS)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dominio
          </label>
          <div className="text-cyber-gold font-mono">{domain?.domain}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nameservers
          </label>
          {nameservers.map((ns, index) => (
            <input
              key={index}
              type="text"
              value={ns}
              onChange={(e) => {
                const newNS = [...nameservers]
                newNS[index] = e.target.value
                setNameservers(newNS)
              }}
              placeholder={`ns${index + 1}.ejemplo.com`}
              className="w-full px-3 py-2 mb-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded text-white placeholder-gray-400 focus:border-cyber-gold focus:outline-none"
            />
          ))}
          <button
            onClick={() => setNameservers([...nameservers, ''])}
            className="text-cyber-gold text-sm hover:text-cyber-amber transition-colors"
          >
            + Agregar Nameserver
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-cyber-gray-700 hover:bg-cyber-gray-600 text-white rounded transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 cyber-button px-4 py-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Componente para mostrar código EPP
function EppModal({ 
  isOpen, 
  onClose, 
  domain, 
  eppCode 
}: ModalProps & { 
  domain: Domain | null
  eppCode: string 
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(eppCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dominio
          </label>
          <div className="text-cyber-gold font-mono">{domain?.domain}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Código EPP
          </label>
          <div className="relative">
            <textarea
              value={eppCode}
              readOnly
              className="w-full px-3 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded text-white font-mono text-sm"
              rows={3}
            />
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 text-cyber-gold hover:text-cyber-amber transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-400">
          ⚠️ Mantén este código seguro. Es necesario para transferencias de dominio.
        </div>
        
        <button
          onClick={onClose}
          className="w-full cyber-button px-4 py-2"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  )
}

// Componente para dropdown de acciones
function ActionDropdown({ 
  domain, 
  onChangeNameservers, 
  onGetEpp, 
  onBlockDomain 
}: {
  domain: Domain
  onChangeNameservers: (domain: Domain) => void
  onGetEpp: (domain: Domain) => void
  onBlockDomain: (domain: Domain) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 glass-card z-10">
          <div className="py-1">
            <button
              onClick={() => {
                onChangeNameservers(domain)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-cyber-gold/10 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Cambiar Nameservers</span>
            </button>
            <button
              onClick={() => {
                onGetEpp(domain)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-cyber-gold/10 transition-colors flex items-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Obtener Código EPP</span>
            </button>
            <button
              onClick={() => {
                onBlockDomain(domain)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Bloquear Registro</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para tarjeta de dominio
function DomainCard({ domain }: { domain: Domain }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400'
      case 'expired':
        return 'text-red-400'
      case 'pending':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'expired':
        return <XCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  const daysUntilExpiration = Math.ceil(
    (new Date(domain.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-cyber-gold" />
          <div>
            <h3 className="text-lg font-semibold text-white">{domain.domain}</h3>
            <div className={`flex items-center space-x-2 ${getStatusColor(domain.status)}`}>
              {getStatusIcon(domain.status)}
              <span className="text-sm capitalize">{domain.status}</span>
            </div>
          </div>
        </div>
        <ActionDropdown 
          domain={domain}
          onChangeNameservers={() => {}}
          onGetEpp={() => {}}
          onBlockDomain={() => {}}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Cliente:</span>
          <span className="text-white">{domain.client}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Vencimiento:</span>
          <span className="text-white">
            {new Date(domain.expirationDate).toLocaleDateString('es-ES')}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${
            daysUntilExpiration <= 30 ? 'bg-red-500/20 text-red-400' :
            daysUntilExpiration <= 90 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {daysUntilExpiration > 0 ? `${daysUntilExpiration} días` : 'Vencido'}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Nameservers:</div>
          <div className="text-sm font-mono text-gray-300">
            {domain.nameservers.join(', ')}
          </div>
        </div>
      </div>
    </div>
  )
}

// Importar Clock desde lucide-react
import { Clock } from 'lucide-react'

export default function DomainManager() {
  const [domains, setDomains] = useState<Domain[]>([...config.domains] as Domain[])
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [nameserverModal, setNameserverModal] = useState(false)
  const [eppModal, setEppModal] = useState(false)
  const [eppCode, setEppCode] = useState('')

  const handleChangeNameservers = async (domain: Domain) => {
    setSelectedDomain(domain)
    setNameserverModal(true)
  }

  const handleGetEpp = async (domain: Domain) => {
    try {
      // Simular llamada al webhook para obtener código EPP
      const response = await fetch(config.webhooks.domainManager, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get_epp_code',
          domain: domain.domain
        })
      })

      // Simular código EPP
      const mockEppCode = `EPP-${domain.domain.replace(/\./g, '').toUpperCase()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      
      setSelectedDomain(domain)
      setEppCode(mockEppCode)
      setEppModal(true)
    } catch (error) {
      console.error('Error obteniendo código EPP:', error)
    }
  }

  const handleBlockDomain = async (domain: Domain) => {
    if (confirm(`¿Estás seguro de que quieres bloquear el dominio ${domain.domain}?`)) {
      // Simular bloqueo
      setDomains(prev => prev.map(d => 
        d.id === domain.id ? { ...d, status: 'expired' as const } : d
      ))
    }
  }

  const handleSaveNameservers = async (nameservers: string[]) => {
    if (!selectedDomain) return

    try {
      // Simular llamada al webhook para cambiar nameservers
      await fetch(config.webhooks.domainManager, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'change_nameservers',
          domain: selectedDomain.domain,
          nameservers: nameservers
        })
      })

      setDomains(prev => prev.map(d => 
        d.id === selectedDomain.id ? { ...d, nameservers } : d
      ))
    } catch (error) {
      console.error('Error cambiando nameservers:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-tech font-bold text-cyber-gold">
            Domain Manager
          </h1>
          <p className="text-gray-400 mt-1">
            Gestión de dominios e integración con WHMCS
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{domains.length}</div>
          <div className="text-sm text-gray-400">Dominios totales</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-green-400">
            {domains.filter(d => d.status === 'active').length}
          </div>
          <div className="text-sm text-gray-400">Activos</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {domains.filter(d => d.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-400">Pendientes</div>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-2xl font-bold text-red-400">
            {domains.filter(d => d.status === 'expired').length}
          </div>
          <div className="text-sm text-gray-400">Expirados</div>
        </div>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>

      {/* Modals */}
      <NameserverModal
        isOpen={nameserverModal}
        onClose={() => setNameserverModal(false)}
        domain={selectedDomain}
        onSave={handleSaveNameservers}
      />

      <EppModal
        isOpen={eppModal}
        onClose={() => setEppModal(false)}
        domain={selectedDomain}
        eppCode={eppCode}
      />
    </div>
  )
}