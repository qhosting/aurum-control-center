import base64
import json

# Leer el archivo de salida del Git Tool
with open('/home/ubuntu/.external_service_outputs/git_tool_output_1765348275.json', 'r') as f:
    data = json.load(f)

# Decodificar el contenido base64
content = base64.b64decode(data['response']['content']).decode('utf-8')
print("=== CONTENIDO DEL DOCKERFILE EN GITHUB ===")
print(content[:500])
print("\n[...contenido truncado...]")
