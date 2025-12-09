// Configuración de URLs de webhooks n8n
export const config = {
  // URLs base de webhooks n8n (cambiar por las URLs reales)
  webhooks: {
    serverMaintenance: 'https://tu-n8n-instance.com/webhook/server-maintenance',
    serviceDeployer: 'https://tu-n8n-instance.com/webhook/service-deployer',
    domainManager: 'https://tu-n8n-instance.com/webhook/domain-manager',
    dnsAudit: 'https://tu-n8n-instance.com/webhook/dns-audit',
    n8nHealth: 'https://tu-n8n-instance.com/webhook/health-monitor',
  },
  
  // Configuración de servidores
  servers: [
    {
      id: 'aurum',
      name: 'Aurum Server',
      ip: '192.168.1.100',
      status: 'online',
      cpu: 45,
      ram: 67,
      disk: 34,
    },
    {
      id: 'qhosting',
      name: 'QHosting Server',
      ip: '192.168.1.101',
      status: 'online',
      cpu: 23,
      ram: 45,
      disk: 78,
    },
    {
      id: 'investti',
      name: 'Investti Server',
      ip: '192.168.1.102',
      status: 'offline',
      cpu: 0,
      ram: 0,
      disk: 0,
    },
  ],

  // Mock data para dominios
  domains: [
    {
      id: 1,
      domain: 'ejemplo1.com',
      client: 'Cliente ABC',
      expirationDate: '2024-12-15',
      status: 'active',
      nameservers: ['ns1.ejemplo.com', 'ns2.ejemplo.com'],
    },
    {
      id: 2,
      domain: 'ejemplo2.net',
      client: 'Cliente XYZ',
      expirationDate: '2024-11-20',
      status: 'active',
      nameservers: ['ns1.ejemplo.net', 'ns2.ejemplo.net'],
    },
  ],

  // Configuración de servicios para deploy
  services: {
    waha: {
      name: 'WhatsApp Web API',
      ports: [3001, 3002, 3003, 3004, 3005],
    },
    chatwoot: {
      name: 'Chatwoot',
      ports: [3006, 3007],
    },
    pbx: {
      name: 'Asterisk PBX',
      ports: [3008, 3009],
    },
  },
};