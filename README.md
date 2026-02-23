# 🏦 NOC / CPD - Sistema Automatizado de Planillas (BCRA)

Este proyecto es una solución web moderna diseñada para reemplazar el manejo manual de planillas de actividades operativas. Automatiza el control de los turnos de **Lunes a Viernes (V9.2)** y **Fin de Semana (SD&F)**, evolucionando de un registro estático a un Dashboard dinámico integrado con herramientas de monitoreo.

## 🚀 Características Principales

- **Consolidación de Tareas:** Agrupa tareas recurrentes (ej. Verificación Web cada 30 min) en bloques lógicos para evitar scrolls infinitos y redundancia visual.
- **Dinamismo por Turno:** Selección inteligente de actividades según el día y horario (carga procesos específicos como Tuxedo, SEPAIMPO o cierres de Sybase solo cuando corresponde).
- **Integración con Checkmk (vía Middleware):** Preparado para consumir la API de monitoreo. Los estados de los servidores y servicios se actualizan dinámicamente sin intervención manual.
- **Generación de Reportes:** Exportación profesional a PDF utilizando `html2pdf.js` para auditorías.
- **Trazabilidad de Novedades:** Bloque dedicado para el resumen del turno, registro de tickets iTop e incidencias.

## 🏗️ Arquitectura del Proyecto

El sistema se divide en dos capas principales para garantizar seguridad y rendimiento:
1. **Front-end (`index.html`):** Interfaz de usuario (UI) responsiva donde el operador visualiza el dashboard, interactúa con la grilla y genera los reportes PDF.
2. **Middleware (`app.py`):** Servidor intermedio (API REST) desarrollado en Python/Flask. Sus funciones vitales son:
   - Almacenar de forma segura las credenciales de Checkmk.
   - Resolver las restricciones de CORS al hacer peticiones desde el front-end hacia el servidor de monitoreo.
   - Realizar las consultas a la API de Checkmk y formatear la respuesta para el dashboard.

## 🛠️ Tecnologías Utilizadas

* **Front-end:** HTML5, CSS3, Bootstrap 5 (Framework UI), JavaScript (Vanilla) y LocalStorage.
* **Backend / Middleware:** Python 3, Flask, Flask-CORS, Requests.
* **Exportación:** `html2pdf.js`.
* **Monitoreo:** Checkmk (API REST).

## 📋 Instrucciones de Configuración y Uso

### 1. Preparar el Entorno
Clonar el repositorio en el equipo local:
```bash
git clone [https://github.com/FedeRamadan89/BANK-planilla.git](https://github.com/FedeRamadan89/BANK-planilla.git)
cd BANK-planilla
