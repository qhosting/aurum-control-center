# ⚙️ CONFIGURACIÓN CORRECTA PARA EASYPANEL

## 🎯 Configuración del Build

### Opción 1: Build Context en el subdirectorio (RECOMENDADA)

```yaml
Repository: qhosting/aurum-control-center
Branch: master
Build Context: aurum-control-center/
Dockerfile Path: Dockerfile
```

**Explicación:** Easypanel clonará el repositorio y luego entrará al directorio `aurum-control-center/` donde encontrará el `Dockerfile`.

### Opción 2: Build Context en la raíz

```yaml
Repository: qhosting/aurum-control-center
Branch: master
Build Context: .
Dockerfile Path: aurum-control-center/Dockerfile
```

**Explicación:** Easypanel clonará el repositorio en la raíz y buscará el Dockerfile en la ruta relativa `aurum-control-center/Dockerfile`.

## 🔧 Pasos de Configuración en Easypanel

1. **Crear un nuevo servicio**
   - Tipo: GitHub Repository

2. **Configurar el repositorio:**
   ```
   Repository URL: https://github.com/qhosting/aurum-control-center
   Branch: master
   ```

3. **Configurar Build:**
   - **Build Context:** `aurum-control-center/`
   - **Dockerfile Path:** `Dockerfile`
   
   O alternativamente:
   - **Build Context:** `.`
   - **Dockerfile Path:** `aurum-control-center/Dockerfile`

4. **Variables de entorno:**
   ```
   NODE_ENV=production
   NEXTAUTH_URL=https://tu-dominio.com
   NEXTAUTH_SECRET=<generar con: openssl rand -base64 32>
   NEXT_PUBLIC_WEBHOOK_DNS_AUDIT=https://tu-n8n.com/webhook/...
   NEXT_PUBLIC_WEBHOOK_DNS_UPDATE=https://tu-n8n.com/webhook/...
   NEXT_PUBLIC_WEBHOOK_HEALTH=https://tu-n8n.com/webhook/...
   ```

5. **Puerto:**
   ```
   Port: 3000
   ```

6. **Desplegar:**
   - Click en "Deploy"
   - Si falla, hacer "Rebuild without cache"

## 🚨 Solución de Problemas

### Si el error persiste:

1. **Limpiar caché de Easypanel:**
   - En la configuración del servicio, buscar opción "Rebuild without cache"
   - Eliminar y recrear el servicio si es necesario

2. **Verificar sincronización con GitHub:**
   - Asegurarse de que Easypanel tenga acceso al repositorio
   - Verificar que esté usando el commit más reciente: `96bbb9c` o posterior

3. **Verificar manualmente en GitHub:**
   - URL directa al Dockerfile: https://github.com/qhosting/aurum-control-center/blob/master/aurum-control-center/Dockerfile
   - Verificar que el archivo sea visible y tenga contenido

## ✅ Verificación de la Configuración

Una vez desplegado correctamente, deberías ver:

- ✅ Build exitoso sin errores
- ✅ Aplicación corriendo en puerto 3000
- ✅ Logs mostrando: "Ready on http://0.0.0.0:3000"
- ✅ La aplicación accesible desde tu dominio

## 📞 Si el problema continúa

Si después de seguir estos pasos el error persiste, por favor provee:

1. **Logs completos del build de Easypanel**
2. **Captura de pantalla de la configuración actual**
3. **Commit hash que Easypanel está intentando desplegar**

Esto nos ayudará a diagnosticar el problema específico.

---
**Última actualización:** Commit `96bbb9c`  
**Estado:** ✅ Repositorio verificado y listo
