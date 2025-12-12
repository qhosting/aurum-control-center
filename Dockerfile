# Dockerfile para Easypanel - Build desde raíz del repositorio
# Multi-stage build optimizado para Next.js 14

FROM node:18-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias desde el subdirectorio aurum-control-center
COPY aurum-control-center/package.json aurum-control-center/package-lock.json* ./
RUN npm ci

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente desde el subdirectorio aurum-control-center
COPY aurum-control-center/ ./

# Variables de entorno de build
ENV NEXT_TELEMETRY_DISABLED 1

# Build de la aplicación
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando de inicio
CMD ["node", "server.js"]
