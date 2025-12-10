# Guía para Agregar Nuevas Licencias - Aurum Control Center

## 🎯 Introducción

Esta guía te explica cómo agregar fácilmente nuevas licencias al sistema de mantenimiento del Aurum Control Center. El sistema está diseñado para ser **100% dinámico** y **fácil de extender**.

## 📝 Método 1: Agregar Licencias QHosting (Más Fácil)

### Paso 1: Editar la Configuración
Edita el archivo `src/config/config.js` y busca la sección `maintenanceCommands.licenses`:

```javascript
licenses: [
  // ... licencias existentes
  
  // AGREGAR AQUÍ TU NUEVA LICENCIA:
  {
    id: 'nueva-licencia',
    name: 'Nombre de la Licencia',
    description: 'Descripción clara de qué hace esta licencia',
    command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) nueva-licencia',
    category: 'categoria',
    enabled: true,
    vendor: 'QHosting'
  }
]
```

### Paso 2: Campos Requeridos
| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | Identificador único (sin espacios) | `cpanel-pro` |
| `name` | Nombre visible en la interfaz | `cPanel Pro` |
| `description` | Descripción breve | `Versión profesional de cPanel` |
| `command` | Comando a ejecutar | `bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel-pro` |
| `category` | Categoría para organización | `control-panel` |
| `enabled` | Si está habilitada (true/false) | `true` |
| `vendor` | Proveedor de la licencia | `QHosting` |

### Paso 3: Categorías Disponibles
- `control-panel` - Paneles de control
- `installer` - Instaladores automáticos
- `builder` - Constructores de sitios
- `reseller` - Paneles de revendedores
- `tools` - Herramientas adicionales
- `backup` - Sistemas de respaldo
- `os` - Sistemas operativos
- `webserver` - Servidores web
- `security` - Seguridad y firewalls
- `optimizer` - Optimizadores

## 🏢 Método 2: Agregar Licencias de Otros Proveedores

### Ejemplo: Licencia de cPanel desde otro proveedor

```javascript
{
  id: 'cpanel-enterprise',
  name: 'cPanel Enterprise',
  description: 'Versión empresarial de cPanel con características avanzadas',
  command: 'curl -sSL https://enterprise.cpanel.net/install.sh | bash',
  category: 'control-panel',
  enabled: true,
  vendor: 'cPanel Inc.'
}
```

### Ejemplo: Licencia personalizada

```javascript
{
  id: 'mi-licencia-custom',
  name: 'Mi Licencia Personalizada',
  description: 'Licencia personalizada para nuestro sistema',
  command: 'bash /path/to/custom-script.sh',
  category: 'tools',
  enabled: true,
  vendor: 'Mi Empresa'
}
```

## 🚀 Método 3: Ejemplo Práctico Completo

### Agregar "cPanel Pro" paso a paso:

1. **Abrir** `src/config/config.js`

2. **Buscar** la sección `licenses: [` 

3. **Agregar** antes del cierre `]`:

```javascript
{
  id: 'cpanel-pro',
  name: 'cPanel Pro',
  description: 'Versión profesional de cPanel con características empresariales',
  command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) cpanel-pro',
  category: 'control-panel',
  enabled: true,
  vendor: 'QHosting'
},
```

4. **Guardar** el archivo

5. **Recargar** la aplicación (F5 en el navegador)

¡Listo! La nueva licencia aparecerá automáticamente en el módulo de Server Maintenance.

## ⚙️ Configuración Avanzada

### Deshabilitar una Licencia
```javascript
{
  id: 'licencia-antigua',
  name: 'Licencia Antigua',
  description: 'Esta licencia ya no se usa',
  command: 'comando-antiguo',
  category: 'tools',
  enabled: false,  // ← Esto la oculta de la interfaz
  vendor: 'Proveedor Antiguo'
}
```

### Comandos con Parámetros
```javascript
{
  id: 'softaculous-enterprise',
  name: 'Softaculous Enterprise',
  description: 'Versión empresarial con múltiples sitios',
  command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) softaculous --enterprise --multi-site',
  category: 'installer',
  enabled: true,
  vendor: 'QHosting'
}
```

### Scripts Personalizados
```javascript
{
  id: 'mi-script-personalizado',
  name: 'Mi Script de Mantenimiento',
  description: 'Script personalizado para nuestro entorno',
  command: 'bash /opt/scripts/mi-mantenimiento.sh --production --verbose',
  category: 'maintenance',
  enabled: true,
  vendor: 'Mi Empresa'
}
```

## 🎨 Personalización Visual

### Nuevas Categorías
Si necesitas una nueva categoría, solo agrégala al campo `category`. El sistema会自动:
- Asignar un icono por defecto
- Darle un color único
- Organizarla correctamente

### Ejemplo de nueva categoría:
```javascript
{
  id: 'nueva-cat',
  name: 'Nueva Categoría',
  description: 'Ejemplo de nueva categoría',
  command: 'mi-comando',
  category: 'mi-nueva-categoria',  // ← Nueva categoría
  enabled: true,
  vendor: 'Mi Empresa'
}
```

## 🔧 Solución de Problemas

### La licencia no aparece
1. Verifica que `enabled: true`
2. Revisa que el `id` sea único
3. Asegúrate de que el JSON sea válido (coma al final)

### Error de sintaxis JSON
- Usa un validador JSON online
- Verifica que todas las comillas estén correctas
- Asegúrate de que no falten comas

### El comando no funciona
1. Prueba el comando manualmente en el servidor
2. Verifica que la URL del script sea correcta
3. Revisa los permisos del script

## 📊 Ejemplo: Agregar 3 Licencias de Una Vez

```javascript
// En src/config/config.js, dentro del array licenses:
{
  id: 'directadmin',
  name: 'DirectAdmin',
  description: 'Panel de control alternativo a cPanel',
  command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) directadmin',
  category: 'control-panel',
  enabled: true,
  vendor: 'QHosting'
},
{
  id: 'mailman',
  name: 'Mailman',
  description: 'Sistema de listas de correo',
  command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) mailman',
  category: 'tools',
  enabled: true,
  vendor: 'QHosting'
},
{
  id: 'ssl-provider',
  name: 'SSL Provider',
  description: 'Proveedor de certificados SSL',
  command: 'bash <( curl https://mirror.qhosting.net/pre.sh ) ssl-provider',
  category: 'security',
  enabled: true,
  vendor: 'QHosting'
}
```

## 🎯 Ventajas del Sistema Dinámico

✅ **Fácil de mantener** - Solo editar un archivo de configuración  
✅ **Sin recompilar** - Los cambios se ven inmediatamente  
✅ **Organizado** - Categorías automáticas  
✅ **Escalable** - Agregar 1 o 100 licencias igual de fácil  
✅ **Flexible** - Soporte para cualquier proveedor  
✅ **Seguro** - Control granular de qué licencias mostrar  

## 📞 Soporte

Si necesitas ayuda para agregar una licencia específica:
1. Documenta el comando que quieres ejecutar
2. Identifica la categoría más apropiada
3. Agrega la licencia siguiendo esta guía
4. Prueba en un entorno de desarrollo primero

¡El sistema está diseñado para ser intuitivo y fácil de usar!