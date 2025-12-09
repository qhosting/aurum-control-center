'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Settings, 
  Server, 
  Shield, 
  Rocket, 
  Activity,
  Globe,
  Monitor
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Server Health', href: '/health', icon: Monitor },
  { name: 'Maintenance', href: '/maintenance', icon: Settings },
  { name: 'Domain Manager', href: '/domains', icon: Globe },
  { name: 'DNS & Security', href: '/dns', icon: Shield },
  { name: 'Service Deployer', href: '/deploy', icon: Rocket },
  { name: 'n8n Monitor', href: '/monitor', icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 glass">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-cyber-gold/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <Server className="w-5 h-5 text-cyber-dark" />
          </div>
          <span className="text-xl font-tech font-bold text-cyber-gold">
            AURUM CONTROL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-cyber-gold/10 text-cyber-gold border-l-4 border-cyber-gold' 
                      : 'text-gray-300 hover:text-cyber-gold hover:bg-cyber-gold/5'
                    }
                  `}
                >
                  <item.icon 
                    className={`
                      mr-3 h-5 w-5 transition-colors
                      ${isActive ? 'text-cyber-gold' : 'text-gray-400 group-hover:text-cyber-gold'}
                    `} 
                  />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-cyber-gold rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Status Indicator */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Sistema Operativo</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  )
}