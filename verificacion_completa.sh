#!/bin/bash
echo "==============================================="
echo "VERIFICACIÓN COMPLETA DE SYMLINKS Y ARCHIVOS"
echo "==============================================="
echo ""

echo "1. ARCHIVOS CRÍTICOS EN EL SISTEMA LOCAL:"
echo "-------------------------------------------"
for file in "aurum-control-center/Dockerfile" "aurum-control-center/.dockerignore" "aurum-control-center/docker-compose.yml" "aurum-control-center/package.json" "aurum-control-center/package-lock.json" "aurum-control-center/EASYPANEL_DEPLOY.md" "ANALISIS_DEPLOY.md"; do
  echo -n "$file: "
  if [ -L "$file" ]; then
    echo "SYMLINK -> $(readlink $file)"
  elif [ -f "$file" ]; then
    echo "ARCHIVO REAL ($(wc -c < $file) bytes)"
  else
    echo "NO EXISTE"
  fi
done

echo ""
echo "2. ARCHIVOS CRÍTICOS EN GIT (índice):"
echo "--------------------------------------"
git ls-files -s | grep -E "(Dockerfile|\.dockerignore|docker-compose\.yml|package\.json|package-lock\.json|EASYPANEL_DEPLOY\.md|ANALISIS_DEPLOY\.md)" | while read mode hash stage path; do
  if [ "$mode" = "120000" ]; then
    echo "$path: SYMLINK (modo: $mode)"
  else
    echo "$path: ARCHIVO REAL (modo: $mode)"
  fi
done

echo ""
echo "3. TODOS LOS SYMLINKS RASTREADOS POR GIT:"
echo "-----------------------------------------"
git ls-files -s | awk '$1 == "120000" {print $4 " (modo: " $1 ")"}'

echo ""
echo "4. VERIFICACIÓN DE CONTENIDO DEL DOCKERFILE:"
echo "--------------------------------------------"
if [ -f "aurum-control-center/Dockerfile" ]; then
  echo "Primeras 5 líneas:"
  head -5 aurum-control-center/Dockerfile
else
  echo "Dockerfile NO ENCONTRADO"
fi
