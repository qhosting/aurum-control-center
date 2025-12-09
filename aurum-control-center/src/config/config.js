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

  // Configuración de comandos de mantenimiento y licencias
  maintenanceCommands: {
    // Configuración base para licencias QHosting
    qhosting: {
      baseUrl: 'https://mirror.qhosting.net/pre.sh',
      baseCommand: 'bash <( curl https://mirror.qhosting.net/pre.sh )'
    },
    
    // Definición de licencias QHosting (FÁCIL DE AGREGAR NUEVAS)
    licenses: [
      {
        id: 'cpanel',
        name: 'cPanel',
        description: 'Panel de control de hosting',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel',
        category: 'control-panel',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'softaculous',
        name: 'Softaculous',
        description: 'Instalador automático de aplicaciones',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) softaculous',
        category: 'installer',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'sitepad',
        name: 'SitePad',
        description: 'Constructor de sitios web',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) sitepad',
        category: 'builder',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'whmreseller',
        name: 'WHMReseller',
        description: 'Panel de revendedores',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) whmreseller',
        category: 'reseller',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'whmxtra',
        name: 'WHMxtra',
        description: 'Herramientas adicionales para WHM',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) whmxtra',
        category: 'tools',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'jetbackup',
        name: 'JetBackup',
        description: 'Sistema de respaldos avanzado',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) jetbackup',
        category: 'backup',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'cloudlinux',
        name: 'CloudLinux',
        description: 'Sistema operativo para hosting',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cloudlinux',
        category: 'os',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'litespeedx',
        name: 'LiteSpeed Enterprise',
        description: 'Servidor web de alto rendimiento',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) litespeedx',
        category: 'webserver',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'kernelcare',
        name: 'KernelCare',
        description: 'Parches de kernel en vivo',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) kernelcare',
        category: 'security',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'osm',
        name: 'OSM',
        description: 'Optimizador de servidor',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) osm',
        category: 'optimizer',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'cxs',
        name: 'CXS',
        description: 'Escáner de seguridad',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cxs',
        category: 'security',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'backuply',
        name: 'Backuply',
        description: 'Sistema de respaldos',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) backuply',
        category: 'backup',
        enabled: true,
        vendor: 'QHosting'
      },
      {
        id: 'imunify360',
        name: 'Imunify360',
        description: 'Firewall y seguridad avanzada',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) imunify360',
        category: 'security',
        enabled: true,
        vendor: 'QHosting'
      },
      
      // 🎯 EJEMPLO: Cómo agregar nuevas licencias fácilmente
      // Para agregar una nueva licencia, simplemente copia este formato:
      /*
      {
        id: 'directadmin',           // ID único (sin espacios)
        name: 'DirectAdmin',         // Nombre visible en la interfaz
        description: 'Panel de control alternativo a cPanel', // Descripción
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) directadmin', // Comando
        category: 'control-panel',   // Categoría para organización
        enabled: true,              // true = mostrar, false = ocultar
        vendor: 'QHosting'          // Proveedor de la licencia
      },
      */
      
      // 🌟 EJEMPLO REAL: DirectAdmin (descomenta para activar)
      /*
      {
        id: 'directadmin',
        name: 'DirectAdmin',
        description: 'Panel de control de hosting alternativo a cPanel',
        command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) directadmin',
        category: 'control-panel',
        enabled: true,
        vendor: 'QHosting'
      },
      */
    ],
    
    // Ejemplo de cómo agregar nuevas licencias en el futuro:
    // 
    // Para agregar una nueva licencia, simplemente agrega un nuevo objeto al array 'licenses':
    // {
    //   id: 'nueva-licencia',
    //   name: 'Nueva Licencia',
    //   description: 'Descripción de la nueva licencia',
    //   command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) nueva-licencia',
    //   category: 'categoria',
    //   enabled: true,
    //   vendor: 'QHosting'
    // }
    //
    // O si es de otro proveedor:
    // {
    //   id: 'cpanel-pro',
    //   name: 'cPanel Pro',
    //   description: 'Versión profesional de cPanel',
    //   command: 'curl -sSL https://example.com/install.sh | bash',
    //   category: 'control-panel',
    //   enabled: true,
    //   vendor: 'Otro Proveedor'
    // }
    
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