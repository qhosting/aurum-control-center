# Comandos de Mantenimiento - Aurum Control Center

## 📋 Descripción General

Este documento detalla todos los comandos de mantenimiento y actualización de licencias disponibles en el módulo **Server Maintenance** del Aurum Control Center. Todos los comandos se ejecutan vía SSH a través de webhooks n8n configurados.

## 🛡️ Comandos de Licencias QHosting

### Formato Base
```bash
bash <( curl https://mirror.qhosting.net/pre.sh ) [LICENCIA]
```

### Licencias Disponibles

| Licencia | Comando | Descripción |
|----------|---------|-------------|
| **cPanel** | `bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel` | Actualiza licencia del panel de control cPanel |
| **Softaculous** | `bash <( curl https://mirror.qhosting.net/pre.sh ) softaculous` | Actualiza licencia del instalador automático Softaculous |
| **SitePad** | `bash <( curl https://mirror.qhosting.net/pre.sh ) sitepad` | Actualiza licencia del constructor de sitios SitePad |
| **WHMReseller** | `bash <( curl https://mirror.qhosting.net/pre.sh ) whmreseller` | Actualiza licencia del panel de revendedores |
| **WHMxtra** | `bash <( curl https://mirror.qhosting.net/pre.sh ) whmxtra` | Actualiza licencia de herramientas WHMxtra |
| **JetBackup** | `bash <( curl https://mirror.qhosting.net/pre.sh ) jetbackup` | Actualiza licencia del sistema de respaldos JetBackup |
| **CloudLinux** | `bash <( curl https://mirror.qhosting.net/pre.sh ) cloudlinux` | Actualiza licencia del sistema operativo CloudLinux |
| **LiteSpeed Enterprise** | `bash <( curl https://mirror.qhosting.net/pre.sh ) litespeedx` | Actualiza licencia del servidor web LiteSpeed |
| **KernelCare** | `bash <( curl https://mirror.qhosting.net/pre.sh ) kernelcare` | Actualiza licencia de parches de kernel KernelCare |
| **OSM** | `bash <( curl https://mirror.qhosting.net/pre.sh ) osm` | Actualiza licencia del optimizador de servidor OSM |
| **CXS** | `bash <( curl https://mirror.qhosting.net/pre.sh ) cxs` | Actualiza licencia del escáner de seguridad CXS |
| **Backuply** | `bash <( curl https://mirror.qhosting.net/pre.sh ) backuply` | Actualiza licencia del sistema de respaldos Backuply |
| **Imunify360** | `bash <( curl https://mirror.qhosting.net/pre.sh ) imunify360` | Actualiza licencia del firewall Imunify360 |

## 🔧 Comandos de Mantenimiento del Sistema

### Limpieza de Temporales
```bash
find /tmp -type f -mtime +7 -delete && find /var/tmp -type f -mtime +7 -delete
```
- Elimina archivos temporales con más de 7 días de antigüedad
- Acelera el rendimiento del sistema

### Actualización del Sistema
```bash
apt update && apt upgrade -y
```
- Actualiza la lista de paquetes disponibles
- Instala todas las actualizaciones de seguridad y mejoras

## 🚀 Comandos de Gestión de Servicios

### Reiniciar Apache
```bash
systemctl restart apache2
```
- Reinicia el servidor web Apache
- Aplica cambios de configuración sin downtime prolongado

### Reiniciar Nginx
```bash
systemctl restart nginx
```
- Reinicia el servidor web Nginx
- Útil para cambios de configuración

### Reiniciar Servicios Web Completos
```bash
systemctl restart apache2 nginx && systemctl restart php8.1-fpm
```
- Reinicia Apache, Nginx y PHP-FPM
- Aplicar cambios de configuración PHP y web server

### Verificar Estado de Servicios
```bash
systemctl status apache2 nginx mysql
```
- Muestra el estado actual de servicios críticos
- Identifica servicios caídos o con problemas

## ⚙️ Configuración en n8n

### Estructura del Webhook
```json
{
  "action": "cpanel-license",
  "command": "bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel",
  "timestamp": "2025-12-09T10:15:25.000Z",
  "server": "all"
}
```

### Respuesta Esperada
```json
{
  "success": true,
  "output": "License updated successfully",
  "executionTime": "2.47s",
  "serversProcessed": 3,
  "status": "completed"
}
```

## 📊 Monitoreo y Logs

### Visualización en la Aplicación
- Terminal visual en tiempo real
- Indicadores de estado (Ejecutando/Éxito/Error)
- Timestamp de ejecución
- Tiempo de procesamiento
- Servidores procesados

### Información Mostrada
- ✅ Comando ejecutado exitosamente
- ⏱️ Tiempo de ejecución
- 🖥️ Servidores procesados
- 📝 Detalles por servidor
- 🔄 Próxima verificación automática

## 🔒 Seguridad

### Consideraciones
- Todos los comandos se ejecutan con privilegios de administrador
- Los webhooks deben estar protegidos con autenticación
- Implementar logs de auditoría para todas las ejecuciones
- Validar origen de las peticiones

### Mejores Prácticas
- Ejecutar comandos en horarios de menor tráfico
- Verificar el estado del servicio después de cada actualización
- Mantener backups antes de actualizaciones críticas
- Monitorear logs del sistema post-actualización

## 📞 Soporte

Para soporte técnico o consultas sobre los comandos:
- Revisar logs del sistema: `/var/log/syslog`
- Verificar estado de servicios: `systemctl status [servicio]`
- Consultar documentación oficial de cada licencia
- Contactar al equipo de QHosting para problemas específicos