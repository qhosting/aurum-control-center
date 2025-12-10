# Aurum Control Center - Instrucciones de Despliegue

## 🚀 Despliegue en GitHub y Easypanel

### 1. Preparación del Repositorio

```bash
# 1. Inicializar repositorio Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Realizar el commit inicial
git commit -m "Initial commit: Aurum Control Center PWA"

# 4. Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/aurum-control-center.git

# 5. Subir al repositorio
git branch -M main
git push -u origin main
```

### 2. Configuración en Easypanel

#### A. Crear Nueva Aplicación
1. Accede a tu panel de Easypanel
2. Ve a **Apps** → **New App**
3. Selecciona **Docker**
4. Conecta tu repositorio de GitHub
5. Configura la rama: `main`

#### B. Variables de Entorno
En la sección **Environment** de Easypanel, agrega:

```env
NODE_ENV=production
NEXTAUTH_SECRET=tu-clave-secreta-muy-segura-aqui
NEXTAUTH_URL=https://aurum-control.tudominio.com
WEBHOOK_BASE_URL=https://tu-n8n-instance.com/webhook
```

#### C. Configurar Build
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: `3000`

#### D. Configurar Dominio
1. Ve a **Settings** → **Domains**
2. Agrega tu dominio: `aurum-control.tudominio.com`
3. Configura SSL automático con Let's Encrypt

### 3. Configuración de Webhooks n8n

#### A. Crear Webhooks en n8n
Crea los siguientes webhooks en tu instancia de n8n:

1. **Server Maintenance**
   - URL: `https://tu-n8n-instance.com/webhook/server-maintenance`
   - Método: POST
   - **Configuración específica**: Este webhook maneja 13+ comandos de licencias QHosting:
     ```bash
     bash <( curl https://mirror.qhosting.net/pre.sh ) [cpanel|softaculous|sitepad|...]
     ```
   - Configurar workflow para ejecutar comandos SSH remotos

2. **Service Deployer**
   - URL: `https://tu-n8n-instance.com/webhook/service-deployer`
   - Método: POST
   - Configurar workflow para Docker deployments

3. **Domain Manager**
   - URL: `https://tu-n8n-instance.com/webhook/domain-manager`
   - Método: POST
   - Configurar workflow para WHMCS integration

4. **DNS Audit**
   - URL: `https://tu-n8n-instance.com/webhook/dns-audit`
   - Método: POST
   - Configurar workflow para DNS queries

5. **n8n Health Monitor**
   - URL: `https://tu-n8n-instance.com/webhook/health-monitor`
   - Método: POST
   - Configurar workflow para logs monitoring

#### B. Actualizar Configuración
Actualiza el archivo `src/config/config.js` con las URLs reales:

```javascript
export const config = {
  webhooks: {
    serverMaintenance: 'https://tu-n8n-instance.com/webhook/server-maintenance',
    serviceDeployer: 'https://tu-n8n-instance.com/webhook/service-deployer',
    domainManager: 'https://tu-n8n-instance.com/webhook/domain-manager',
    dnsAudit: 'https://tu-n8n-instance.com/webhook/dns-audit',
    n8nHealth: 'https://tu-n8n-instance.com/webhook/health-monitor',
  },
  // ... resto de configuración
}
```

### 4. Configuración SSL y Dominio

#### A. Configurar Proxy Reverso (Opcional)
Si usas Traefik, el docker-compose.yml ya incluye la configuración.

#### B. Certificado SSL
- Easypanel maneja automáticamente los certificados SSL
- Verifica que tu dominio apunte a la IP de tu servidor

### 5. Instalación de Dependencias Local (Desarrollo)

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### 6. Comandos Docker

```bash
# Construir imagen
docker build -t aurum-control-center .

# Ejecutar contenedor
docker run -p 3000:3000 aurum-control-center

# Usar docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f aurum-control-center

# Actualizar aplicación
git pull origin main
docker-compose build
docker-compose up -d
```

### 7. Monitoreo y Logs

#### A. Verificar Estado de la Aplicación
- Accede a `https://aurum-control.tudominio.com`
- Verifica que todos los módulos carguen correctamente
- Prueba la funcionalidad PWA (instala en móvil)

#### B. Logs del Sistema
```bash
# Logs de la aplicación
docker-compose logs aurum-control-center

# Logs del sistema
journalctl -u easypanel -f
```

### 8. Configuración de Seguridad

#### A. Firewall
Asegúrate de que los puertos necesarios estén abiertos:
- 80 (HTTP)
- 443 (HTTPS)
- 3000 (si usas proxy)

#### B. Variables de Entorno
- Nunca expongas el `NEXTAUTH_SECRET` en el repositorio
- Usa variables de entorno para toda la configuración sensible

### 9. Backup y Mantenimiento

#### A. Backup Automático
```bash
# Script de backup (agregar a crontab)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/aurum-control-$DATE.tar.gz /opt/aurum-control-center
```

#### B. Actualizaciones
```bash
# Actualizar aplicación
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### 10. Solución de Problemas Comunes

#### A. Error de Build
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el comando `npm run build` funcione localmente

#### B. Error de Conexión con n8n
- Verifica las URLs de los webhooks
- Confirma que n8n esté accesible desde el servidor
- Revisa los logs de n8n para errores

#### C. Problemas de SSL
- Verifica que el dominio apunte correctamente
- Confirma que Let's Encrypt esté configurado
- Revisa los logs de Traefik si lo usas

### 11. Configuración Específica de Licencias QHosting

#### A. Webhook Server Maintenance
El webhook `server-maintenance` debe estar configurado para recibir payloads como:

```json
{
  "action": "cpanel-license",
  "command": "bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel",
  "timestamp": "2025-12-09T10:15:25.000Z"
}
```

#### B. Workflow n8n para Licencias
1. **Node Webhook**: Recibe la petición POST
2. **Node Switch**: Evalúa el campo `action` para determinar qué licencia actualizar
3. **Node SSH**: Ejecuta el comando correspondiente en los servidores remotos
4. **Node Response**: Devuelve el resultado al frontend

#### C. Comandos de Licencias Soportados
- cPanel, Softaculous, SitePad
- WHMReseller, WHMxtra, JetBackup
- CloudLinux, LiteSpeed Enterprise
- KernelCare, OSM, CXS, Backuply, Imunify360

**Formato base**: `bash <( curl https://mirror.qhosting.net/pre.sh ) [licencia]`

#### D. Seguridad del Webhook
- Implementar autenticación en el webhook
- Validar origen de peticiones (IP whitelist)
- Logs de auditoría para todas las ejecuciones
- Timeouts apropiados para comandos largos

### 12. Configuración de Producción Avanzada

#### A. Optimización de Performance
```dockerfile
# En el Dockerfile, ya está optimizado para producción
# Usa output: 'standalone' para mejor rendimiento
```

#### B. Escalabilidad
- Considera usar Redis para sessions si necesitas clustering
- Implementa load balancing si tienes múltiples instancias

¡Tu Aurum Control Center está listo para producción! 🎉