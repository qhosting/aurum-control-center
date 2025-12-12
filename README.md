# Aurum Control Center

**ERP para Holding Aurum Capital con 11 Satélites**

Sistema de gestión empresarial integral desarrollado con Next.js 14, PostgreSQL, Redis y arquitectura Clean.

## 🚀 Características

### **FASE 1 - Fundamentos Sólidos** ✅

- ✅ **Infraestructura Completa**: Docker Compose con PostgreSQL, PgBouncer, Redis
- ✅ **Base de Datos**: Prisma ORM con modelos completos e índices optimizados
- ✅ **Arquitectura Clean**: Separación de capas (core, infrastructure, presentation)
- ✅ **Frontend Cyberpunk Gold**: Next.js 14 + Tailwind CSS + ShadcnUI
- ✅ **Autenticación**: NextAuth con roles (CEO, MANAGER, EMPLOYEE)
- ✅ **Gestión de Satélites**: CRUD completo con Server Actions
- ✅ **Scripts de Escalafín**: 7 scripts críticos integrados

## 📦 Stack Tecnológico

### **Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript 5.3
- Tailwind CSS
- ShadcnUI
- Lucide Icons

### **Backend**
- Node.js 18+
- Prisma ORM
- NextAuth.js
- Server Actions

### **Base de Datos**
- PostgreSQL 15
- PgBouncer (Connection Pooling)
- Redis 7 (Cache)

### **Infraestructura**
- Docker & Docker Compose
- Git

## 💻 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose
- Git

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd aurum-control-center
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```env
# Base de datos
DATABASE_URL="postgresql://postgres:202284abf4656b289b41@qhosting_aurum-control-center-db:5432/aurum-control-center-db?schema=public"

# Redis
REDIS_URL="redis://default:aurum-control-center-redis@qhosting_aurum-control-center-redis:6379"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui" # Generar con: openssl rand -base64 32
```

### 4. Levantar servicios con Docker

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en puerto 5432
- PgBouncer en puerto 6432
- Redis en puerto 6379

### 5. Generar cliente de Prisma

```bash
npm run db:generate
```

### 6. Ejecutar migraciones

```bash
npm run db:push
```

### 7. Poblar base de datos con datos iniciales

```bash
npm run db:seed
```

Esto creará:
- 11 satélites del holding
- Usuario CEO (edwin@aurumcapital.com)
- Usuarios de ejemplo (Manager, Employee)
- Tareas de ejemplo

### 8. Iniciar aplicación en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 🔐 Credenciales de Acceso

### CEO (Acceso Total)
- **Email**: edwin@aurumcapital.com
- **Password**: AurumCEO2025!

### Manager (Acceso a Satélites Específicos)
- **Email**: manager@aurumcapital.com
- **Password**: Manager2025!

### Employee (Acceso Limitado)
- **Email**: employee@aurumcapital.com
- **Password**: Employee2025!

## 🛢️ Satélites del Holding

| # | Código | Nombre | Categoría | Inbox |
|---|--------|--------|-----------|-------|
| 1 | QHOSTING | QHosting | Infraestructura | 3 |
| 2 | NEURONADS | NeuroNads | Marketing | 6 |
| 3 | SHULA_STUDIO | Shula Studio | Belleza | 9 |
| 4 | LUMINAFLEX | LuminaFlex | Manufactura | 3 |
| 5 | ESCALAFIN | Escalafín | Fintech | 3 |
| 6 | CUENTY | Cuenty | SaaS | 7 |
| 7 | WHATSCLOUD | WhatsCloud | SaaS | 3 |
| 8 | VERTEXERP | VertexERP | Consultoría | 3 |
| 9 | CITA_PLANNER | Cita Planner | SaaS | 3 |
| 10 | CLOUDMX | CloudMX | Hardware | 3 |
| 11 | AURUM_INVEST | Aurum Invest | Trading | 3 |

## 📚 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar en modo producción
npm run lint         # Linter
```

### Base de Datos
```bash
npm run db:generate  # Generar cliente de Prisma
npm run db:push      # Aplicar schema a BD
npm run db:migrate   # Crear migración
npm run db:seed      # Poblar BD con datos
npm run db:studio    # Abrir Prisma Studio
npm run db:reset     # Resetear BD
```

### Scripts de Escalafín
```bash
# Verificación pre-build
./scripts/build/pre-build-check.sh

# Verificación pre-deploy
./scripts/deploy/pre-deploy-check.sh

# Validación post-deploy
./scripts/deploy/post-deploy-check.sh <URL>

# Diagnóstico de BD
./scripts/database/diagnose-db.sh

# Backup de BD
./scripts/database/pg_backup.sh

# Validar paths absolutos
./scripts/build/validate-absolute-paths.sh

# Generar .env
node scripts/utils/generate-env.js
```

## 🏛️ Arquitectura

### Estructura del Proyecto

```
aurum-control-center/
├── prisma/                    # Base de datos
│   ├── schema.prisma          # Modelos de BD
│   └── seed.ts                # Datos iniciales
├── scripts/                   # Scripts de mantenimiento
│   ├── build/                # Pre-build checks
│   ├── deploy/               # Deploy automation
│   ├── database/             # BD scripts
│   ├── git/                  # Git hooks
│   └── utils/                # Utilidades
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Páginas de autenticación
│   │   ├── (dashboard)/      # Dashboard protegido
│   │   ├── actions/          # Server Actions
│   │   └── api/              # API Routes
│   ├── core/                 # Arquitectura Clean - Core
│   │   ├── entities/         # Entidades de dominio
│   │   ├── interfaces/       # Interfaces y contratos
│   │   └── use-cases/        # Casos de uso
│   ├── infrastructure/       # Capa de infraestructura
│   │   ├── database/         # Prisma service
│   │   ├── cache/            # Redis service
│   │   └── repositories/     # Implementaciones de repositorios
│   ├── presentation/         # Capa de presentación
│   │   ├── components/       # Componentes React
│   │   └── hooks/            # Custom hooks
│   └── lib/                  # Utilidades y configuraciones
├── docker-compose.yml        # Orquestación de servicios
├── .env.example              # Template de variables de entorno
└── README.md                 # Este archivo
```

### Patrón Repository

Cada entidad tiene su propio repository:

```typescript
// Example: Satellite Repository
class SatelliteRepository implements IPaginatedRepository<Satellite> {
  async findAll(filters?: Record<string, any>): Promise<Satellite[]>
  async findById(id: string): Promise<Satellite | null>
  async create(data: Partial<Satellite>): Promise<Satellite>
  async update(id: string, data: Partial<Satellite>): Promise<Satellite>
  async delete(id: string): Promise<void>
  async findPaginated(...): Promise<PaginatedResult<Satellite>>
}
```

### Cache-Aside Pattern

Redis se usa con el patrón cache-aside:

```typescript
const satellite = await redisService.getOrSet(
  CACHE_KEYS.SATELLITE.BY_ID(id),
  async () => {
    return prisma.satellite.findUnique({ where: { id } });
  },
  CACHE_TTL.MEDIUM
);
```

## 🎨 Tema Cyberpunk Gold

- **Background**: Slate-950 (#0f172a)
- **Primary**: Gold (#FFD700)
- **Accent Colors**: Gradientes de oro
- **Typography**: Inter (Google Fonts)
- **Icons**: Lucide React

### Componentes Personalizados

```tsx
// Cyber Card
<div className="cyber-card cyber-glow">
  {/* content */}
</div>

// Cyber Button
<button className="cyber-button">
  {/* content */}
</button>

// Cyber Input
<input className="cyber-input" />
```

## 👥 Sistema de Roles

### CEO
- ✅ Acceso total a todos los satélites
- ✅ Gestión de usuarios
- ✅ Configuración del sistema
- ✅ Finanzas completas
- ✅ Eliminar satélites

### MANAGER
- ✅ Acceso a satélites específicos
- ✅ Gestión de tareas
- ✅ Crear/editar satélites
- ✅ Finanzas limitadas
- ❌ No puede eliminar satélites

### EMPLOYEE
- ✅ Tareas asignadas
- ✅ Tickets de soporte
- ❌ Sin acceso a satélites
- ❌ Sin acceso a finanzas

## 🛡️ Seguridad

- ✅ Autenticación con NextAuth
- ✅ Passwords hasheados con bcrypt
- ✅ Protección de rutas por roles
- ✅ Variables de entorno para secretos
- ✅ Validación con Zod
- ✅ SQL Injection protection (Prisma)
- ✅ CSRF protection (NextAuth)

## 🚀 Deployment

### Producción
```bash
# 1. Verificación pre-deploy
./scripts/deploy/pre-deploy-check.sh

# 2. Build
npm run build

# 3. Levantar servicios
docker-compose up -d

# 4. Migraciones
npm run db:migrate:deploy

# 5. Iniciar aplicación
npm run start

# 6. Validación post-deploy
./scripts/deploy/post-deploy-check.sh https://tudominio.com
```

## 📊 Monitoreo

### Health Checks

```bash
# Base de datos
./scripts/database/diagnose-db.sh

# Redis
curl http://localhost:3000/api/health/redis

# Aplicación
curl http://localhost:3000/api/health
```

## 🐛 Troubleshooting

### Error de conexión a PostgreSQL

```bash
# Verificar que los servicios estén corriendo
docker-compose ps

# Ver logs
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart postgres
```

### Error de conexión a Redis

```bash
# Verificar conexión
redis-cli -h localhost -p 6379 -a aurum-control-center-redis ping

# Ver logs
docker-compose logs redis
```

### Resetear base de datos

```bash
# CUIDADO: Esto eliminará todos los datos
npm run db:reset
```

## 📝 Próximos Pasos (FASE 2)

- [ ] Módulo de Tareas completo con Kanban board
- [ ] Sistema de tickets de soporte
- [ ] Módulo de finanzas con gráficas
- [ ] Dashboard analítico
- [ ] Notificaciones en tiempo real
- [ ] Sistema de permisos granular
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Integración con APIs externas
- [ ] Módulo de documentos
- [ ] Chat interno

## 💬 Soporte

Para soporte y preguntas:
- Email: edwin@aurumcapital.com
- Repositorio: [GitHub URL]

## 📜 Licencia

Propietario - Aurum Capital © 2025

---

**Desarrollado con ♥️ por el equipo de Aurum Capital**
