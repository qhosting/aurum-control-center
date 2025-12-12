# Estructura del Proyecto Aurum Control Center

```
aurum-control-center/
│
├── 📋 Documentación
│   ├── README.md                          # Documentación principal
│   ├── FASE_1_COMPLETADA.md              # Checklist de entregables
│   ├── INSTRUCCIONES_INICIO.md            # Guía de inicio rápido
│   └── SCRIPTS_ESCALAFIN_ANALISIS.md     # Análisis de scripts
│
├── 🐳 Docker & Configuración
│   ├── docker-compose.yml                 # PostgreSQL + PgBouncer + Redis
│   ├── pgbouncer.ini                      # Configuración PgBouncer
│   ├── .env                               # Variables de entorno
│   └── .env.example                       # Template de variables
│
├── 🗄️ Base de Datos (Prisma)
│   └── prisma/
│       ├── schema.prisma                  # 12 modelos con índices
│       └── seed.ts                        # 11 satélites + usuarios
│
├── 🔧 Scripts de Mantenimiento
│   └── scripts/
│       ├── build/
│       │   ├── pre-build-check.sh
│       │   └── validate-absolute-paths.sh
│       ├── deploy/
│       │   ├── pre-deploy-check.sh
│       │   └── post-deploy-check.sh
│       ├── database/
│       │   ├── diagnose-db.sh
│       │   └── pg_backup.sh
│       ├── git/
│       │   └── setup-git-hooks.sh
│       └── utils/
│           └── generate-env.js
│
├── 💻 Código Fuente
│   └── src/
│       │
│       ├── 📱 Aplicación (Next.js 14)
│       │   └── app/
│       │       ├── layout.tsx              # Root layout
│       │       ├── page.tsx                # Redirect a dashboard
│       │       ├── globals.css             # Tema Cyberpunk Gold
│       │       │
│       │       ├── (auth)/
│       │       │   └── login/
│       │       │       └── page.tsx        # Página de login
│       │       │
│       │       ├── (dashboard)/
│       │       │   ├── layout.tsx          # Layout protegido
│       │       │   └── dashboard/
│       │       │       ├── page.tsx        # Dashboard principal
│       │       │       └── satellites/
│       │       │           └── page.tsx    # Gestión satélites
│       │       │
│       │       ├── actions/
│       │       │   └── satellites.ts       # Server Actions
│       │       │
│       │       └── api/
│       │           └── auth/[...nextauth]/
│       │               └── route.ts        # NextAuth route
│       │
│       ├── 🏛️ Core (Clean Architecture)
│       │   └── core/
│       │       ├── entities/               # Entidades de dominio
│       │       ├── interfaces/
│       │       │   ├── IRepository.ts
│       │       │   └── ICacheService.ts
│       │       └── use-cases/              # Lógica de negocio
│       │
│       ├── 🔌 Infrastructure
│       │   └── infrastructure/
│       │       ├── database/
│       │       │   └── prisma.service.ts   # Prisma singleton
│       │       ├── cache/
│       │       │   └── redis.service.ts    # Redis con cache-aside
│       │       └── repositories/
│       │           ├── satellite/
│       │           │   └── satellite.repository.ts
│       │           └── task/
│       │               └── task.repository.ts
│       │
│       ├── 🎨 Presentation
│       │   └── presentation/
│       │       ├── components/
│       │       │   ├── ui/                 # ShadcnUI components
│       │       │   │   ├── button.tsx
│       │       │   │   ├── card.tsx
│       │       │   │   ├── input.tsx
│       │       │   │   ├── label.tsx
│       │       │   │   ├── badge.tsx
│       │       │   │   ├── dialog.tsx
│       │       │   │   └── select.tsx
│       │       │   ├── layout/
│       │       │   │   ├── sidebar.tsx     # Sidebar dinámico
│       │       │   │   └── header.tsx      # Header con usuario
│       │       │   ├── satellites/
│       │       │   │   ├── satellite-table.tsx
│       │       │   │   ├── create-satellite-button.tsx
│       │       │   │   ├── satellite-form-dialog.tsx
│       │       │   │   └── edit-satellite-dialog.tsx
│       │       │   └── providers/
│       │       │       └── session-provider.tsx
│       │       └── hooks/                  # Custom hooks
│       │
│       ├── 📚 Lib
│       │   └── lib/
│       │       ├── auth.ts                 # NextAuth config
│       │       ├── session.ts              # Session utilities
│       │       └── utils.ts                # Helpers (cn, etc.)
│       │
│       └── 🔷 Types
│           └── types/
│               └── next-auth.d.ts          # Type extensions
│
└── ⚙️ Configuración
    ├── package.json                        # Dependencias
    ├── tsconfig.json                       # TypeScript config
    ├── next.config.js                      # Next.js config
    ├── tailwind.config.ts                  # Tailwind + tema
    ├── postcss.config.js                   # PostCSS config
    └── .gitignore                          # Git ignore
```

## Archivos Clave

### Autenticación
- `src/lib/auth.ts`: Configuración de NextAuth
- `src/lib/session.ts`: Utilidades de sesión y protección de rutas
- `src/app/api/auth/[...nextauth]/route.ts`: API route de NextAuth

### Base de Datos
- `prisma/schema.prisma`: Schema con 12 modelos
- `prisma/seed.ts`: Datos iniciales (11 satélites + usuarios)
- `src/infrastructure/database/prisma.service.ts`: Servicio de BD

### Cache
- `src/infrastructure/cache/redis.service.ts`: Redis con cache-aside pattern
- Implementa: get, set, delete, getOrSet, stats

### Repositories
- `src/infrastructure/repositories/satellite/satellite.repository.ts`
- `src/infrastructure/repositories/task/task.repository.ts`
- Implementan: CRUD + métodos específicos + cache

### UI Components
- `src/presentation/components/ui/*`: 7 componentes de ShadcnUI
- `src/presentation/components/layout/*`: Sidebar + Header
- `src/presentation/components/satellites/*`: Componentes de satélites

### Server Actions
- `src/app/actions/satellites.ts`: CRUD de satélites con validación

### Tema
- `src/app/globals.css`: Tema Cyberpunk Gold con CSS custom
- `tailwind.config.ts`: Colores y animaciones personalizadas

## Estadísticas

- **Archivos TS/TSX**: 32
- **Componentes UI**: 7
- **Scripts**: 8
- **Modelos de BD**: 12
- **Líneas de código**: ~4,800

