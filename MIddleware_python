from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
# Habilitamos CORS para que tu HTML (index.html) pueda consultar esta API sin bloqueos
CORS(app)

# =====================================================================
# CONFIGURACIÓN DE CHECKMK (Esto lo tiene que llenar tu compañero)
# =====================================================================
CMK_URL = "http://TU_SERVIDOR_CHECKMK/TU_SITIO/check_mk/api/1.0"
CMK_USER = "usuario_api" # Nombre del Automation User
CMK_SECRET = "TU_AUTOMATION_SECRET_AQUI" # Contraseña del Automation User

# Headers estándar para la API REST de Checkmk
HEADERS = {
    "Authorization": f"Bearer {CMK_USER} {CMK_SECRET}",
    "Accept": "application/json"
}

@app.route('/api/status', methods=['GET'])
def get_service_status():
    """
    Recibe por parámetro el host y el servicio, consulta a Checkmk y devuelve el estado.
    Ejemplo de uso: http://localhost:5000/api/status?host=prodweb1&service=HTTP
    """
    host_name = request.args.get('host')
    service_name = request.args.get('service')

    if not host_name or not service_name:
        return jsonify({"error": "Faltan parámetros 'host' o 'service'"}), 400

    # Construimos la URL para consultar un servicio específico en la API de Checkmk
    api_endpoint = f"{CMK_URL}/domain-types/service/collections/all"
    
    # Filtramos por el host y la descripción del servicio
    query_params = {
        "query": f'{{"op": "and", "expr": [{{"op": "=", "left": "host_name", "right": "{host_name}"}}, {{"op": "=", "left": "description", "right": "{service_name}"}}]}}'
    }

    try:
        response = requests.get(api_endpoint, headers=HEADERS, params=query_params, timeout=10)
        response.raise_for_status()
        data = response.json()

        # Si Checkmk encontró el servicio, extraemos su estado
        if data.get('value'):
            # state: 0 = OK, 1 = WARN, 2 = CRIT, 3 = UNKNOWN
            state = data['value'][0]['extensions']['state']
            
            # Mapeamos el número al texto y clase CSS que usa tu HTML
            status_map = {
                0: {"text": "OK", "class": "cmk-ok", "icon": "bi-check-circle-fill"},
                1: {"text": "WARN", "class": "cmk-warn", "icon": "bi-exclamation-triangle-fill"},
                2: {"text": "CRIT", "class": "cmk-crit", "icon": "bi-x-octagon-fill"},
                3: {"text": "UNKN", "class": "cmk-unknown", "icon": "bi-question-circle-fill"}
            }
            
            result = status_map.get(state, status_map[3])
            return jsonify(result)
        else:
            return jsonify({"text": "NOT FOUND", "class": "cmk-unknown", "icon": "bi-question-circle-fill"})

    except Exception as e:
        print(f"Error consultando Checkmk: {e}")
        return jsonify({"text": "ERROR", "class": "cmk-crit", "icon": "bi-x-octagon-fill"}), 500

if __name__ == '__main__':
    # Arranca el servidor de pruebas en el puerto 5000
    app.run(debug=True, port=5000)
