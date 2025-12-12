# Scripts de Aurum Control Center

Colección de scripts para automatización, validación y mantenimiento del proyecto.

## 📁 Estructura

```
scripts/
├── build/              # Scripts de construcción y validación
├── deploy/             # Scripts de despliegue
├── database/           # Scripts de base de datos
├── git/               # Scripts de control de versiones
└── utils/             # Utilidades generales
```

## 🔨 Scripts de Build

### `build/pre-build-check.sh`
**Propósito:** Verificación antes de build Docker

**Uso:**
```bash
./scripts/build/pre-build-check.sh
```

**Verifica:**
- Existencia de Dockerfile y archivos críticos
- Validez de package.json y lockfiles
- Estructura de directorios requerida
- Configuración de .dockerignore

---

### `build/validate-absolute-paths.sh`
**Propósito:** Detecta rutas absolutas problemáticas

**Uso:**
```bash
./scripts/build/validate-absolute-paths.sh
```

**Detecta:**
- Rutas absolutas del host
- Symlinks en código fuente
- Configuración incorrecta de paths
- Imports con rutas absolutas

---

## 🚀 Scripts de Deploy

### `deploy/pre-deploy-check.sh`
**Propósito:** Verificación exhaustiva antes de deployment

**Uso:**
```bash
./scripts/deploy/pre-deploy-check.sh
```

**Verifica:**
- Configuración de Next.js (output: standalone)
- Estado de git y commits
- Dependencias críticas
- Configuración de Docker
- Variables de entorno

---

### `deploy/post-deploy-check.sh`
**Propósito:** Validación post-deployment

**Uso:**
```bash
./scripts/deploy/post-deploy-check.sh <URL>
```

**Ejemplo:**
```bash
./scripts/deploy/post-deploy-check.sh https://aurum.example.com
```

**Valida:**
- Conectividad y response time
- Certificado SSL
- Endpoints críticos
- Headers de seguridad
- Recursos estáticos

---

## 🗄️ Scripts de Database

### `database/diagnose-db.sh`
**Propósito:** Diagnóstico de PostgreSQL

**Uso:**
```bash
# Usar DATABASE_URL del .env
./scripts/database/diagnose-db.sh

# O especificar URL
./scripts/database/diagnose-db.sh "postgresql://user:pass@host:5432/db"
```

**Diagnóstica:**
- Conectividad de red
- Validación de credenciales
- Tablas existentes
- Estado de migraciones de Prisma
- Estadísticas de la BD

---

### `database/pg_backup.sh`
**Propósito:** Backup automático de PostgreSQL

**Uso:**
```bash
# Backup con configuración del .env
./scripts/database/pg_backup.sh

# Backup de DB específica
./scripts/database/pg_backup.sh mydb postgres mypassword localhost
```

**Características:**
- Dumps SQL comprimidos (gzip)
- Nomenclatura con timestamp
- Limpieza automática de backups antiguos
- Retention policy configurable

**Configuración:**
Editar variables en el script:
```bash
BACKUP_DIR="./backups"
RETENTION_DAYS=7
```

---

## 🔧 Scripts de Git

### `git/setup-git-hooks.sh`
**Propósito:** Instalar git hooks preventivos

**Uso:**
```bash
./scripts/git/setup-git-hooks.sh
```

**Instala:**
- Pre-push hook con validaciones
- Pre-commit hook (opcional)

---

## 🛠️ Scripts de Utilidades

### `utils/generate-env.js`
**Propósito:** Generar archivo .env con valores seguros

**Uso:**
```bash
node scripts/utils/generate-env.js [options]

# Opciones:
# --db-name <name>     Nombre de la base de datos
# --app-url <url>      URL de la aplicación
# --force              Sobrescribir .env existente
```

**Ejemplo:**
```bash
node scripts/utils/generate-env.js --db-name aurum-control-center-db --app-url http://localhost:3000
```

**Genera:**
- Secretos criptográficamente seguros
- DATABASE_URL configurada
- Variables de entorno completas
- Backup del .env anterior

---

## 🔄 Workflow Recomendado

### Desarrollo Local

```bash
# 1. Verificar antes de build
./scripts/build/pre-build-check.sh

# 2. Validar paths
./scripts/build/validate-absolute-paths.sh

# 3. Build de la aplicación
npm run build
```

### Antes de Deployment

```bash
# 1. Verificación completa
./scripts/deploy/pre-deploy-check.sh

# 2. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 3. Deploy (según plataforma)
# ...

# 4. Validación post-deploy
./scripts/deploy/post-deploy-check.sh https://aurum.example.com
```

### Mantenimiento de Base de Datos

```bash
# Diagnóstico
./scripts/database/diagnose-db.sh

# Backup manual
./scripts/database/pg_backup.sh

# Backup automático (cron job)
# Agregar a crontab:
# 0 2 * * * /path/to/scripts/database/pg_backup.sh
```

---

## 📝 Notas Importantes

### Scripts Adaptados de Escalafín
Estos scripts fueron originalmente desarrollados para el proyecto Escalafín y adaptados para Aurum Control Center. Incluyen:

- ✅ Validaciones probadas en producción
- ✅ Detección de errores comunes
- ✅ Automatización de tareas repetitivas

### Requisitos
- **Bash:** >= 4.0
- **Node.js:** >= 18.0
- **PostgreSQL Client:** psql (para scripts de BD)
- **Git:** >= 2.0

### Configuración de CI/CD

Integrar scripts en pipeline:

```yaml
# .github/workflows/deploy.yml
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Pre-build check
        run: ./scripts/build/pre-build-check.sh
      
      - name: Validate paths
        run: ./scripts/build/validate-absolute-paths.sh
      
      - name: Pre-deploy check
        run: ./scripts/deploy/pre-deploy-check.sh

  deploy:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      # ... deployment steps ...
      
      - name: Post-deploy validation
        run: ./scripts/deploy/post-deploy-check.sh ${{ env.APP_URL }}
```

---

## 🆘 Troubleshooting

### Script no ejecutable
```bash
chmod +x scripts/**/*.sh
```

### Error de permisos en backups
```bash
mkdir -p backups
chmod 755 backups
```

### Script no encuentra .env
Asegurarse de estar en la raíz del proyecto:
```bash
cd /home/ubuntu/aurum-control-center
./scripts/database/diagnose-db.sh
```

---

## 📚 Referencias

- Documentación original: https://github.com/qhosting/escalafin
- Análisis de scripts: `/SCRIPTS_ESCALAFIN_ANALISIS.md`

---

**Fecha de creación:** 2025-12-12  
**Versión:** 1.0.0  
**Mantenedor:** Equipo Aurum Capital
