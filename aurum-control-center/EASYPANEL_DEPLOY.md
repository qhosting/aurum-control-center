# 🚀 Guía de Deployment en Easypanel - AURUM CONTROL CENTER

## Requisitos Previos
- Cuenta en Easypanel
- Repositorio GitHub configurado
- Instancia n8n con webhooks configurados (opcional)

## 📋 Pasos para Deploy en Easypanel

### 1. Preparar el Repositorio
Asegúrate de que tu repositorio en GitHub contenga:
- ✅ `Dockerfile`
- ✅ `package.json` y `package-lock.json`
- ✅ `.dockerignore`
- ✅ `docker-compose.yml` (opcional)
- ✅ `.env.example`

### 2. Crear Aplicación en Easypanel

1. **Login** en tu panel de Easypanel
2. Ir a **Apps** → **Create App**
3. Seleccionar **GitHub** como fuente
4. Seleccionar el repositorio `aurum-control-center`
5. Elegir la rama `main` o la rama que prefieras

### 3. Configurar Build

En la configuración de la aplicación:

- **Build Method**: Docker
- **Dockerfile Path**: `aurum-control-center/Dockerfile`
- **Build Context**: `aurum-control-center/`
- **Port**: `3000`

### 4. Variables de Entorno Requeridas

Agregar las siguientes variables de entorno en Easypanel:

```env
# Configuración de Node.js
NODE_ENV=production

# NextAuth (IMPORTANTE: Cambiar el secret)
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=genera-un-secret-muy-seguro-aqui

# Webhooks n8n (Opcional - Configurar según tu instancia)
NEXT_PUBLIC_WEBHOOK_SERVER_MAINTENANCE=https://tu-n8n.com/webhook/server-maintenance
NEXT_PUBLIC_WEBHOOK_SERVICE_DEPLOYER=https://tu-n8n.com/webhook/service-deployer
NEXT_PUBLIC_WEBHOOK_DOMAIN_MANAGER=https://tu-n8n.com/webhook/domain-manager
NEXT_PUBLIC_WEBHOOK_DNS_AUDIT=https://tu-n8n.com/webhook/dns-audit
NEXT_PUBLIC_WEBHOOK_N8N_HEALTH=https://tu-n8n.com/webhook/health-monitor
```

#### Generar NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 5. Configurar Dominio

1. Ir a **Settings** → **Domains**
2. Agregar tu dominio custom: `aurum-control.tudominio.com`
3. Configurar DNS de tu dominio para apuntar a los servidores de Easypanel
4. Habilitar SSL automático (Let's Encrypt)

### 6. Deployment

1. Click en **Deploy** en Easypanel
2. Esperar a que el build termine (puede tomar 2-5 minutos)
3. Verificar los logs del build
4. Una vez completado, acceder a tu aplicación

## 🔧 Verificación Post-Deploy

### Verificar que la aplicación esté corriendo:
1. Acceder a `https://tu-dominio.com`
2. Verificar que el dashboard cargue correctamente
3. Probar la navegación entre módulos
4. Verificar la funcionalidad PWA (instalar en móvil)

### Verificar Logs:
En Easypanel:
- Ir a **Logs** de tu aplicación
- Verificar que no haya errores críticos
- Los warnings normales de Next.js son aceptables

## 🐛 Solución de Problemas

### Build Falla
**Error**: "Cannot find module 'dns'"
- **Solución**: Ya corregido en package.json (módulo 'dns' eliminado)

**Error**: "Package-lock.json not found"
- **Solución**: Ya generado - asegúrate de hacer commit del archivo

**Error**: Build timeout
- **Solución**: Aumentar el timeout en configuración de Easypanel

### Aplicación No Carga
**Error**: "Application error: a client-side exception has occurred"
- **Solución**: Verificar que NEXTAUTH_URL esté configurado correctamente
- **Solución**: Verificar que todas las variables de entorno requeridas estén configuradas

**Error**: 502 Bad Gateway
- **Solución**: Verificar que el puerto 3000 esté correctamente mapeado
- **Solución**: Revisar logs de la aplicación

### Variables de Entorno
Si los webhooks no funcionan:
- Verificar que las URLs de n8n sean accesibles
- Verificar que las variables NEXT_PUBLIC_* estén configuradas
- Recordar que cambios en variables requieren re-deploy

## 📝 Configuración Adicional

### Configurar Webhooks n8n
Ver archivo `DEPLOYMENT.md` para instrucciones detalladas sobre:
- Configuración de workflows en n8n
- Comandos de licencias QHosting
- Integración con servicios

### Actualizar Aplicación
Cuando hagas cambios en el código:
1. Hacer push a GitHub
2. Easypanel auto-deployará (si está configurado)
3. O hacer click manual en **Redeploy**

### Backup y Rollback
- Easypanel mantiene historial de deployments
- Puedes hacer rollback a versiones anteriores desde el panel

## 🎯 Checklist Final

Antes de dar por completado el deploy:

- [ ] Aplicación accesible en dominio configurado
- [ ] SSL habilitado y funcionando
- [ ] Todas las páginas del dashboard cargan correctamente
- [ ] No hay errores críticos en los logs
- [ ] Variables de entorno configuradas
- [ ] PWA instala correctamente en móvil
- [ ] Webhooks n8n configurados (si aplica)

## 📚 Recursos Adicionales

- [Documentación de Easypanel](https://easypanel.io/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía completa de deployment

---

**¿Problemas?** Revisa los logs de Easypanel y el archivo ANALISIS_DEPLOY.md para más detalles técnicos.
