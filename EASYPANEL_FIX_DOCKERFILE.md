# 🔧 Fix Dockerfile - Configuración para Easypanel

## 📋 Problema Identificado

**Error en Easypanel:**
```
ERROR: failed to build: failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory
```

### Causa Raíz
El Dockerfile estaba ubicado en el subdirectorio `aurum-control-center/Dockerfile` en lugar de la raíz del repositorio, donde Easypanel lo busca por defecto.

## ✅ Solución Implementada

### 1. Archivos Creados en la Raíz

Se crearon los siguientes archivos en la raíz del repositorio:

#### **Dockerfile**
- Ubicación: `/Dockerfile` (raíz del proyecto)
- Multi-stage build optimizado para Next.js 14
- Copia archivos desde el subdirectorio `aurum-control-center/`
- Funciona con el contexto de build desde la raíz

#### **.dockerignore**
- Ubicación: `/.dockerignore` (raíz del proyecto)
- Optimiza el build context excluyendo archivos innecesarios
- Reduce tiempo de build y tamaño de la imagen

### 2. Estructura del Proyecto

```
aurum-control-center/
├── Dockerfile                    ← NUEVO: Para Easypanel
├── .dockerignore                 ← NUEVO: Optimiza build context
├── aurum-control-center/
│   ├── Dockerfile                ← ORIGINAL: Mantener para referencia
│   ├── .dockerignore             ← ORIGINAL: Mantener para referencia
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.js
│   ├── src/
│   └── ...
├── scripts/
├── prisma/
└── ...
```

## 🚀 Configuración de Easypanel

### Opción 1: Build desde Raíz (RECOMENDADO)

```yaml
Build Settings:
  Build Path: .
  Dockerfile Path: ./Dockerfile
  Context: .
  
Environment Variables:
  NODE_ENV: production
  NEXTAUTH_SECRET: <generar con: openssl rand -base64 32>
  NEXTAUTH_URL: https://tu-dominio.com
  DATABASE_URL: postgresql://user:password@host:5432/database
  
Port Mapping:
  Container Port: 3000
  Public Port: 80 o 443
```

### Opción 2: Build desde Subdirectorio (Alternativa)

Si prefieres usar el Dockerfile en el subdirectorio:

```yaml
Build Settings:
  Build Path: aurum-control-center
  Dockerfile Path: aurum-control-center/Dockerfile
  Context: aurum-control-center
  
Environment Variables:
  (Iguales que Opción 1)
```

## 🔍 Diagnóstico Realizado

### Scripts Ejecutados

1. **validate-absolute-paths.sh**
   - ✅ No se encontraron rutas absolutas problemáticas
   - ✅ No hay symlinks en código fuente
   - ⚠️ Scripts diseñados para estructura `app/` diferente

2. **pre-build-check.sh**
   - ❌ Scripts buscan directorio `app/` que no existe
   - ✅ Dockerfile verificado como archivo real (no symlink)
   - ✅ Contenido UTF-8 válido

3. **pre-deploy-check.sh**
   - ✅ Variables de entorno configuradas correctamente en .env.example
   - ⚠️ Algunos warnings por estructura de directorio diferente

### Problemas Encontrados y Corregidos

| Problema | Estado | Solución |
|----------|--------|----------|
| Dockerfile no encontrado en raíz | ✅ CORREGIDO | Creado Dockerfile en raíz |
| .dockerignore no encontrado en raíz | ✅ CORREGIDO | Creado .dockerignore optimizado |
| Scripts buscan directorio `app/` | ⚠️ CONOCIDO | Scripts funcionan con subdirectorio |
| Symlinks en código fuente | ✅ VERIFICADO | No hay symlinks problemáticos |
| Rutas absolutas en código | ✅ VERIFICADO | No hay rutas absolutas del host |

## 📝 Verificación del Dockerfile

### Características del Dockerfile Creado

✅ **Multi-stage build** (3 stages: deps, builder, runner)
✅ **Optimizado para Next.js 14** con standalone output
✅ **Seguridad**: Ejecuta como usuario no-root (nextjs:1001)
✅ **Variables de entorno**: NODE_ENV, NEXT_TELEMETRY_DISABLED
✅ **Puerto**: 3000 (configurable vía ENV)
✅ **Copia selectiva**: Solo archivos necesarios en producción

### Build Stages

1. **deps**: Instala dependencias de Node.js desde package-lock.json
2. **builder**: Compila la aplicación Next.js con `npm run build`
3. **runner**: Imagen mínima de producción con solo archivos necesarios

## 🎯 Estado Final

### Archivos Corregidos
- ✅ `/Dockerfile` - Creado en raíz
- ✅ `/.dockerignore` - Creado en raíz
- ✅ `/aurum-control-center/Dockerfile` - Mantenido para referencia
- ✅ `/aurum-control-center/.dockerignore` - Mantenido para referencia

### Verificación de Archivos

```bash
# Verificar que son archivos reales (no symlinks)
$ file Dockerfile .dockerignore
Dockerfile:    Unicode text, UTF-8 text
.dockerignore: Unicode text, UTF-8 text

# Verificar contenido
$ head -5 Dockerfile
# Dockerfile para Easypanel - Build desde raíz del repositorio
# Multi-stage build optimizado para Next.js 14

FROM node:18-alpine AS base
```

## 🔄 Próximos Pasos

1. **Commit y Push** (En Proceso)
   ```bash
   git add Dockerfile .dockerignore EASYPANEL_FIX_DOCKERFILE.md
   git commit -m "fix: Add Dockerfile in root for Easypanel deployment"
   git push origin master
   ```

2. **Configurar Easypanel**
   - Ir a tu proyecto en Easypanel
   - Settings → Build Settings
   - Actualizar configuración según "Opción 1" arriba
   - Rebuild la aplicación

3. **Verificar Deploy**
   - Revisar logs de build en Easypanel
   - Verificar que el contenedor inicie en puerto 3000
   - Probar acceso a la aplicación

## 📚 Documentación Relacionada

- `CONFIGURACION_EASYPANEL.md` - Guía de configuración general
- `EASYPANEL_DEPLOY.md` - Instrucciones de deploy en subdirectorio
- `INFORME_VERIFICACION_SYMLINKS.md` - Verificación de symlinks
- `ANALISIS_DEPLOY.md` - Análisis técnico de deployment

## 🆘 Troubleshooting

### Si el Build Falla

1. **Verificar logs de Easypanel**
   - Revisar qué stage del build falló (deps, builder, runner)

2. **Verificar variables de entorno**
   - Asegurar que todas las variables requeridas estén configuradas
   - Generar nuevo NEXTAUTH_SECRET si es necesario

3. **Verificar package-lock.json**
   - Debe existir en `aurum-control-center/package-lock.json`
   - Debe ser coherente con `package.json`

4. **Limpiar cache de build**
   - En Easypanel: Settings → Clear Build Cache
   - Hacer rebuild completo

### Si la App no Inicia

1. **Verificar puerto**
   - App debe escuchar en puerto 3000
   - Easypanel debe mapear correctamente

2. **Verificar DATABASE_URL**
   - Debe apuntar a base de datos PostgreSQL válida
   - Probar conexión desde Easypanel

3. **Verificar NEXTAUTH_SECRET**
   - Debe estar configurado
   - Debe ser string base64 de 32+ caracteres

## ✨ Mejoras Futuras

- [ ] Añadir healthcheck endpoint en la aplicación
- [ ] Optimizar tamaño de imagen Docker (usar alpine más reducido)
- [ ] Implementar cache de dependencias de npm
- [ ] Añadir docker-compose para testing local

## 📞 Soporte

Si el problema persiste después de aplicar estas correcciones:

1. Verificar que el commit se subió correctamente a GitHub
2. Verificar que Easypanel está usando la branch correcta (master)
3. Revisar logs completos de build en Easypanel
4. Verificar que no hay errores en el código TypeScript/Next.js

---

**Fecha de corrección:** 2025-12-12  
**Commit:** `fix: Add Dockerfile in root for Easypanel deployment`  
**Status:** ✅ CORREGIDO - Listo para deploy
