#!/bin/bash

# Script de instalación para Aurum Control Center
# Este script automatiza la configuración inicial

set -e

echo "🚀 Aurum Control Center - Script de Instalación"
echo "================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para print con color
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Verificar dependencias
print_header "Verificando dependencias..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js versión 18 o superior requerida. Versión actual: $(node --version)"
    exit 1
fi

print_status "Node.js $(node --version) ✓"

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi

print_status "npm $(npm --version) ✓"

# Verificar Git
if ! command -v git &> /dev/null; then
    print_warning "Git no está instalado. Recomendado para control de versiones."
else
    print_status "Git $(git --version | cut -d' ' -f3) ✓"
fi

# Instalar dependencias
print_header "Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    print_status "Dependencias instaladas correctamente ✓"
else
    print_error "Error al instalar dependencias"
    exit 1
fi

# Crear archivo .env si no existe
print_header "Configurando variables de entorno..."
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        print_status "Archivo .env.local creado desde .env.example"
        print_warning "IMPORTANTE: Edita .env.local con tus configuraciones reales"
    else
        print_warning "Archivo .env.example no encontrado"
    fi
else
    print_status "Archivo .env.local ya existe"
fi

# Crear directorio de logs si no existe
if [ ! -d "logs" ]; then
    mkdir logs
    print_status "Directorio logs creado"
fi

# Verificar configuración
print_header "Verificando configuración..."

# Ejecutar build para verificar que todo funciona
print_status "Ejecutando build de prueba..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build exitoso ✓"
else
    print_error "Error en el build. Revisa la configuración."
    exit 1
fi

# Generar secreto para NEXTAUTH_SECRET si no existe
if grep -q "NEXTAUTH_SECRET=your-super-secret-key" .env.local 2>/dev/null; then
    print_status "Generando NEXTAUTH_SECRET seguro..."
    SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    if command -v sed &> /dev/null; then
        sed -i.bak "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$SECRET/" .env.local
        print_status "NEXTAUTH_SECRET generado automáticamente"
    else
        print_warning "No se pudo generar NEXTAUTH_SECRET automáticamente. Edita .env.local manualmente."
    fi
fi

# Verificar Docker
if command -v docker &> /dev/null; then
    print_status "Docker $(docker --version | cut -d' ' -f3 | tr -d ',') disponible ✓"
    DOCKER_AVAILABLE=true
else
    print_warning "Docker no está instalado. Necesario para despliegue en producción."
    DOCKER_AVAILABLE=false
fi

# Mostrar información final
print_header "✅ Instalación Completada"
echo ""
echo "🎉 Aurum Control Center ha sido instalado correctamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Edita .env.local con tus configuraciones específicas"
echo "2. Configura las URLs de webhooks n8n en src/config/config.js"
echo "3. Ejecuta 'npm run dev' para desarrollo local"
echo "4. Ejecuta 'npm run build && npm start' para producción"
echo ""
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "🐳 Para Docker: 'docker-compose up -d'"
fi
echo ""
echo "📚 Documentación completa en DEPLOYMENT.md"
echo "🐛 Issues en: https://github.com/tu-usuario/aurum-control-center/issues"
echo ""

# Preguntar si quiere ejecutar en modo desarrollo
read -p "¿Quieres ejecutar la aplicación en modo desarrollo ahora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Iniciando servidor de desarrollo..."
    print_warning "Presiona Ctrl+C para detener el servidor"
    npm run dev
fi