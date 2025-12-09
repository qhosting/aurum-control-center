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

  // Comandos de mantenimiento y licencias QHosting
  maintenanceCommands: {
    // Licencias usando mirror.qhosting.net
    licenses: {
      cpanel: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel',
      softaculous: 'bash <( curl https://mirror.qhosting.net/pre.sh ) softaculous',
      sitepad: 'bash <( curl https://mirror.qhosting.net/pre.sh ) sitepad',
      whmreseller: 'bash <( curl https://mirror.qhosting.net/pre.sh ) whmreseller',
      whmxtra: 'bash <( curl https://mirror.qhosting.net/pre.sh ) whmxtra',
      jetbackup: 'bash <( curl https://mirror.qhosting.net/pre.sh ) jetbackup',
      cloudlinux: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cloudlinux',
      litespeedx: 'bash <( curl https://mirror.qhosting.net/pre.sh ) litespeedx',
      kernelcare: 'bash <( curl https://mirror.qhosting.net/pre.sh ) kernelcare',
      osm: 'bash <( curl https://mirror.qhosting.net/pre.sh ) osm',
      cxs: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cxs',
      backuply: 'bash <( curl https://mirror.qhosting.net/pre.sh ) backuply',
      imunify360: 'bash <( curl https://mirror.qhosting.net/pre.sh ) imunify360'
    },
    
    // Comandos de mantenimiento del sistema
    maintenance: {
      cleanTemp: 'find /tmp -type f -mtime +7 -delete && find /var/tmp -type f -mtime +7 -delete',
      restartApache: 'systemctl restart apache2',
      restartNginx: 'systemctl restart nginx',
      restartWeb: 'systemctl restart apache2 nginx && systemctl restart php8.1-fpm',
      updateSystem: 'apt update && apt upgrade -y',
      checkServices: 'systemctl status apache2 nginx mysql'
    }
  },
};