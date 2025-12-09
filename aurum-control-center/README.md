# Aurum Control Center 🚀

Una aplicación web progresiva (PWA) completa para la gestión de infraestructura de hosting y servicios de IA. Desarrollada con Next.js 14, TypeScript y un diseño cyberpunk corporativo moderno.

![Aurum Control Center](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PWA](https://img.shields.io/badge/PWA-Installable-orange)

## ✨ Características Principales

### 🏠 Dashboard & Server Health
- Monitoreo en tiempo real de servidores múltiples
- Gráficas sparkline de CPU, RAM y uso de disco
- Indicadores de estado visual (Online/Offline)
- Botones de acción rápida para tareas administrativas

### 🛠️ Server Maintenance
- Panel de control para licencias QHosting y tareas administrativas
- Ejecución remota de scripts SSH vía webhooks n8n
- Terminal visual para mostrar salidas de comandos en tiempo real
- **Licencias soportadas**: cPanel, Softaculous, SitePad, WHMReseller, WHMxtra, JetBackup, CloudLinux, LiteSpeed Enterprise, KernelCare, OSM, CXS, Backuply, Imunify360
- **Comandos base**: `bash <( curl https://mirror.qhosting.net/pre.sh ) [licencia]`
- Tareas de mantenimiento: limpieza temporal, actualización del sistema
- Gestión de servicios: reinicio de Apache/Nginx, verificación de estado

### 🌐 Domain Manager
- Gestión completa de cartera de dominios
- Integración simulada con WHMCS
- Funciones de cambio de nameservers
- Gestión de códigos EPP
- Sistema de bloqueo de dominios

### 🛡️ DNS & Security Audit
- Auditoría completa de registros DNS
- Verificación de SPF, DMARC y DKIM
- Toggle de Cloudflare "Under Attack Mode"
- Herramientas de consulta DNS en tiempo real

### 🚀 Service Deployer
- Wizard intuitivo para desplegar servicios
- Soporte para WAHA, Chatwoot, PBX
- Generación automática de códigos QR
- Configuración de puertos y clientes

### 🚨 n8n Health Monitor
- Monitoreo de logs de flujos n8n
- Filtrado avanzado por estado y fecha
- Estadísticas de errores y advertencias
- Alertas en tiempo real

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con tema Cyberpunk Corporate
- **Iconos**: Lucide React
- **Estado**: React Hooks + Zustand
- **Backend**: Next.js API Routes
- **PWA**: Manifest.json completo
- **Despliegue**: Docker + Easypanel

## 🎨 Diseño

### Tema Cyberpunk Corporate
- **Colores principales**: Negro profundo (#0a0a0a), Dorado (#FFD700), Cian (#00FFFF)
- **Efectos**: Glassmorphism, animaciones suaves, gradientes
- **Tipografía**: Orbitron para títulos, JetBrains Mono para código
- **Responsive**: Optimizado para desktop y móvil

### Características PWA
- Instalable en dispositivos móviles Android/iOS
- Modo standalone
- Iconos personalizados
- Shortcuts para acceso rápido

## 📦 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Docker (para despliegue)

### Configuración Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/aurum-control-center.git
cd aurum-control-center

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Ejecutar en desarrollo
npm run dev
```

### Configuración de Webhooks n8n

Actualiza `src/config/config.js` con las URLs de tus webhooks:

```javascript
export const config = {
  webhooks: {
    serverMaintenance: 'https://tu-n8n-instance.com/webhook/server-maintenance',
    serviceDeployer: 'https://tu-n8n-instance.com/webhook/service-deployer',
    domainManager: 'https://tu-n8n-instance.com/webhook/domain-manager',
    dnsAudit: 'https://tu-n8n-instance.com/webhook/dns-audit',
    n8nHealth: 'https://tu-n8n-instance.com/webhook/health-monitor',
  },
  // ... más configuración
}
```

## 🚀 Despliegue

### Docker

```bash
# Construir imagen
docker build -t aurum-control-center .

# Ejecutar contenedor
docker run -p 3000:3000 -e NODE_ENV=production aurum-control-center

# O usar docker-compose
docker-compose up -d
```

### Easypanel

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Establece build command: `npm run build`
4. Establece start command: `npm start`
5. Configura tu dominio y SSL

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

## 📱 Estructura de la Aplicación

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Páginas principales
│   ├── domains/           # Gestión de dominios
│   ├── maintenance/       # Mantenimiento de servidores
│   ├── dns/              # Auditoría DNS
│   ├── deploy/           # Despliegue de servicios
│   ├── monitor/          # Monitoreo n8n
│   ├── globals.css       # Estilos globales
│   └── layout.tsx        # Layout principal
├── components/            # Componentes reutilizables
│   └── layout/           # Componentes de layout
├── config/               # Configuración de la aplicación
└── types/                # Definiciones TypeScript
```

## 🔧 API Endpoints

### DNS Audit
- `POST /api/dns-audit` - Auditoría de registros DNS

### n8n Health
- `POST /api/n8n-health` - Monitoreo de logs de n8n

## 📊 Características Técnicas

### Rendimiento
- Build optimizado con `output: 'standalone'`
- Lazy loading de componentes
- Optimización automática de imágenes
- Service Worker para caché offline

### Seguridad
- Variables de entorno seguras
- Validación de entrada en API routes
- Headers de seguridad configurados
- HTTPS forzado en producción

### Monitoreo
- Health checks integrados
- Logs estructurados
- Métricas de rendimiento
- Alertas de errores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- 📖 [Documentación completa](./DEPLOYMENT.md)
- 🐛 [Reportar issues](https://github.com/tu-usuario/aurum-control-center/issues)
- 💬 [Discusiones](https://github.com/tu-usuario/aurum-control-center/discussions)

## 🎯 Roadmap

- [ ] Integración real con APIs de cPanel/WHMCS
- [ ] Dashboard de analytics avanzados
- [ ] Sistema de notificaciones push
- [ ] Multi-tenancy para múltiples clientes
- [ ] API GraphQL para integraciones externas
- [ ] Módulo de facturación y reportes

## 🏆 Créditos

Desarrollado con ❤️ por el equipo de Aurum Control

---

**Aurum Control Center** - Tu centro de comando para infraestructura de hosting moderna. ⚡