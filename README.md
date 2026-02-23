# 🏦 NOC / CPD - Sistema Automatizado de Planillas (BCRA)

Este proyecto es una solución web moderna diseñada para reemplazar el manejo manual de planillas de actividades operativas. Automatiza el control de los turnos de **Lunes a Viernes (V9.2)** y **Fin de Semana (SD&F)**, evolucionando de un registro estático a un Dashboard dinámico integrado con herramientas de monitoreo.

## 🚀 Características Principales

- **Consolidación de Tareas:** Agrupa tareas recurrentes (ej. Verificación Web cada 30 min) en bloques lógicos para evitar scrolls infinitos y redundancia visual.
- **Dinamismo por Turno:** Selección inteligente de actividades según el día y horario (carga procesos específicos como Tuxedo, SEPAIMPO o cierres de Sybase solo cuando corresponde).
- **Integración con Checkmk (Check_MK):** Preparado para consumir la API de monitoreo. Los estados de los servidores y servicios se actualizan dinámicamente sin intervención manual.
- **Generación de Reportes:** Exportación profesional a PDF utilizando `html2pdf.js` para auditorías.
- **Trazabilidad de Novedades:** Bloque dedicado para el resumen del turno, registro de tickets iTop e incidencias.

## 🛠️ Tecnologías Utilizadas

* **Front-end:** HTML5, CSS3, Bootstrap 5 (Framework UI).
* **Lógica y Persistencia:** JavaScript (Vanilla) y LocalStorage.
* **Exportación:** `html2pdf.js`.
* **Monitoreo / API:** Integración proyectada con API REST de Checkmk.

## 📋 Instrucciones de Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/FedeRamadan89/BANK-planilla.git](https://github.com/FedeRamadan89/BANK-planilla.git)
    ```
2.  **Ejecutar:**
    Abre el archivo `index.html` en Chrome, Edge o Firefox. (Para la fase de integración con Checkmk se requerirá levantar un servidor local o middleware para evitar errores de CORS).
3.  **Operación:**
    - Selecciona el turno en la barra de navegación superior.
    - El sistema verificará automáticamente el estado de los servicios vinculados a Checkmk.
    - Completa observaciones adicionales o estados de tareas 100% manuales.
    - Registra los tickets de iTop en la sección "Novedades".
    - Usa "Descargar PDF" para guardar el reporte formal del turno.

## 📌 Estructura de Datos (Manuales de Procedimiento)
La lógica de negocio mapea directamente la normativa vigente:
- **Cap. 15:** Verificación Web.
- **Cap. 2.2:** Control de Resguardos (Data Protector / Veeam / Teradata).
- **Cap. 3:** Reinicio de Servidores.
- **Cap. 32.8:** Herramienta Gestión BD / Backups.

## ✍️ Autor
- **FedeRamadan89** - *Desarrollo Inicial y Arquitectura* - [Perfil de GitHub](https://github.com/FedeRamadan89)
