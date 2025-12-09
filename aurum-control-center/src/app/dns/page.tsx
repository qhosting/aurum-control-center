'use client'

import { useState } from 'react'
import { 
  Shield, 
  Search, 
  Globe, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Cloud,
  CloudOff,
  Loader2
} from 'lucide-react'

interface DNSRecord {
  type: string
  name: string
  value: string
  ttl?: number
}

interface SecurityAudit {
  spf: 'valid' | 'invalid' | 'missing'
  dmarc: 'valid' | 'invalid' | 'missing'
  dkim: 'valid' | 'invalid' | 'missing'
  records: DNSRecord[]
  recommendations: string[]
}

// Componente para mostrar el resultado de un registro DNS
function DNSRecordCard({ record }: { record: DNSRecord }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-cyber-gold">{record.type}</span>
        <span className="text-xs text-gray-400">{record.ttl || 'Auto'}</span>
      </div>
      <div className="text-sm text-white font-mono break-all">{record.name}</div>
      <div className="text-sm text-gray-300 font-mono break-all mt-1">{record.value}</div>
    </div>
  )
}

// Componente para mostrar el estado de seguridad
function SecurityStatus({ audit }: { audit: SecurityAudit }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'invalid':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'missing':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Válido'
      case 'invalid':
        return 'Inválido'
      case 'missing':
        return 'No encontrado'
      default:
        return 'Desconocido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-400'
      case 'invalid':
        return 'text-red-400'
      case 'missing':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyber-cyan">Estado de Seguridad</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(audit.spf)}
            <div>
              <div className="font-medium text-white">SPF Record</div>
              <div className={`text-sm ${getStatusColor(audit.spf)}`}>
                {getStatusText(audit.spf)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(audit.dmarc)}
            <div>
              <div className="font-medium text-white">DMARC Record</div>
              <div className={`text-sm ${getStatusColor(audit.dmarc)}`}>
                {getStatusText(audit.dmarc)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(audit.dkim)}
            <div>
              <div className="font-medium text-white">DKIM Record</div>
              <div className={`text-sm ${getStatusColor(audit.dkim)}`}>
                {getStatusText(audit.dkim)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {audit.recommendations.length > 0 && (
        <div className="glass-card p-4">
          <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>Recomendaciones</span>
          </h4>
          <ul className="space-y-2">
            {audit.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                <span className="text-cyber-gold mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Toggle de Cloudflare Under Attack Mode
function CloudflareToggle({ 
  enabled, 
  onToggle 
}: { 
  enabled: boolean, 
  onToggle: (enabled: boolean) => void 
}) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center transition-colors
            ${enabled ? 'bg-orange-500/20' : 'bg-gray-600/20'}
          `}>
            {enabled ? (
              <Cloud className="w-6 h-6 text-orange-400" />
            ) : (
              <CloudOff className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Cloudflare Shield</h3>
            <p className="text-sm text-gray-400">
              {enabled ? 'Modo de protección activo' : 'Modo de protección inactivo'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onToggle(!enabled)}
          className={`
            relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-gold focus:ring-offset-2 focus:ring-offset-cyber-dark
            ${enabled ? 'bg-orange-500' : 'bg-gray-600'}
          `}
        >
          <span
            className={`
              inline-block h-6 w-6 transform rounded-full bg-white transition-transform
              ${enabled ? 'translate-x-7' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
      
      {enabled && (
        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-sm text-orange-300">
            ⚠️ El modo "Under Attack" está activo. Los visitantes pueden experimentar retrasos de 5-10 segundos al acceder al sitio.
          </p>
        </div>
      )}
    </div>
  )
}

export default function DNSSecurity() {
  const [domain, setDomain] = useState('')
  const [dkimSelector, setDkimSelector] = useState('')
  const [audit, setAudit] = useState<SecurityAudit | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cloudflareEnabled, setCloudflareEnabled] = useState(false)

  const analyzeDomain = async () => {
    if (!domain.trim()) return
    
    setIsAnalyzing(true)
    
    try {
      // Simular llamada a API de auditoría DNS
      const response = await fetch('/api/dns-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain.trim(),
          dkimSelector: dkimSelector.trim() || null
        })
      })
      
      // Simular análisis (en producción, esto sería una llamada real)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockAudit: SecurityAudit = {
        spf: 'valid',
        dmarc: 'missing',
        dkim: dkimSelector ? 'valid' : 'missing',
        records: [
          { type: 'A', name: domain, value: '192.168.1.100', ttl: 300 },
          { type: 'MX', name: domain, value: 'mail.' + domain, ttl: 300 },
          { type: 'TXT', name: domain, value: 'v=spf1 include:_spf.google.com ~all', ttl: 300 },
          { type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@' + domain, ttl: 300 },
        ],
        recommendations: [
          'Implementar registro DMARC para mejorar la seguridad del correo',
          dkimSelector ? 'DKIM configurado correctamente' : 'Considerar configurar DKIM para autenticación de correo',
          'Revisar y actualizar el registro SPF regularmente'
        ]
      }
      
      setAudit(mockAudit)
      
    } catch (error) {
      console.error('Error en auditoría DNS:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleCloudflare = async (enabled: boolean) => {
    try {
      // Simular llamada al webhook de n8n para toggle de Cloudflare
      await fetch(config.webhooks.dnsAudit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cloudflare_toggle',
          enabled: enabled,
          timestamp: new Date().toISOString()
        })
      })
      
      setCloudflareEnabled(enabled)
    } catch (error) {
      console.error('Error toggling Cloudflare:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-tech font-bold text-cyber-gold">
            DNS & Security Audit
          </h1>
          <p className="text-gray-400 mt-1">
            Herramientas de auditoría de DNS y seguridad
          </p>
        </div>
      </div>

      {/* Cloudflare Shield */}
      <CloudflareToggle 
        enabled={cloudflareEnabled} 
        onToggle={toggleCloudflare} 
      />

      {/* Domain Analysis Form */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Análisis de Dominio</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dominio a analizar
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="ejemplo.com"
                className="flex-1 px-4 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyber-gold focus:outline-none"
              />
              <input
                type="text"
                value={dkimSelector}
                onChange={(e) => setDkimSelector(e.target.value)}
                placeholder="Selector DKIM (opcional)"
                className="w-48 px-4 py-2 bg-cyber-gray-800 border border-cyber-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyber-gold focus:outline-none"
              />
              <button
                onClick={analyzeDomain}
                disabled={isAnalyzing || !domain.trim()}
                className="cyber-button px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 inline mr-2" />
                    Analizar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {audit && (
        <div className="space-y-6">
          {/* DNS Records */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyber-cyan">Registros DNS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {audit.records.map((record, index) => (
                <DNSRecordCard key={index} record={record} />
              ))}
            </div>
          </div>

          {/* Security Audit */}
          <SecurityStatus audit={audit} />
        </div>
      )}

      {/* Instructions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-cyber-cyan mb-4">Instrucciones</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• <strong>SPF:</strong> Verifica que exista un registro TXT con "v=spf1" para autenticación de correo</p>
          <p>• <strong>DMARC:</strong> Asegúrate de que exista un registro TXT en "_dmarc" para política anti-phishing</p>
          <p>• <strong>DKIM:</strong> Proporciona el selector para verificar la existencia del registro DKIM</p>
          <p>• <strong>Cloudflare:</strong> Activa "Under Attack Mode" durante situaciones de alto tráfico malicioso</p>
        </div>
      </div>
    </div>
  )
}