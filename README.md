# 🏦 CPD - Sistema Automatizado de Planillas (BCRA)

Este proyecto es una solución web moderna diseñada para reemplazar el manejo manual de planillas de actividades diarias en el CPD. Automatiza la generación de reportes para los turnos de **Lunes a Viernes (V9.2)** y **Fin de Semana (SD&F)**, eliminando la redundancia de tareas repetitivas y estandarizando la salida en formato PDF.

## 🚀 Características Principales

- **Consolidación de Tareas:** Agrupa tareas recurrentes (ej. Verificación Web cada 30 min) en bloques únicos para evitar scrolls infinitos.
- **Dinamismo por Turno:** Selección inteligente de actividades según el día (Carga procesos específicos como Tuxedo o SEPAIMPO solo cuando corresponde).
- **Generación de PDF:** Exportación profesional de reportes con un solo clic utilizando `html2pdf.js`.
- **Historial Local:** Almacenamiento de reportes finalizados en el navegador para consultas rápidas por mes/fecha.
- **Sección de Novedades:** Bloque dedicado para resumen de turno, tickets iTop e incidencias.

## 🛠️ Tecnologías Utilizadas

* **HTML5 / CSS3**
* **Bootstrap 5** (Framework UI)
* **JavaScript (Vanilla)** (Lógica de negocio y persistencia local)
* **html2pdf.js** (Librería para exportación de documentos)

## 📋 Instrucciones de Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/FedeRamadan89/BANK-planilla.git](https://github.com/FedeRamadan89/BANK-planilla.git)
    ```
2.  **Ejecutar:**
    Simplemente abre el archivo `index.html` en cualquier navegador moderno (Chrome, Edge o Firefox). No requiere servidor web.
3.  **Operación:**
    - Selecciona el turno en la barra de navegación superior.
    - Completa los estados y observaciones.
    - Al finalizar el turno, completa el cuadro de "Novedades".
    - Usa "Descargar PDF" para obtener el archivo físico y "Finalizar" para registrarlo en el historial.

## 📌 Estructura de Datos
El sistema se basa en los manuales de procedimiento del CPD:
- **Capítulo 15:** Verificación Web.
- **Capítulo 3:** Reinicio de Servidores.
- **Capítulo 32.8:** Gestión de Backups.
- **Capítulo 2.2:** Control de Resguardos.

## ✍️ Autor
- **FedeRamadan89** - *Desarrollo Inicial* - [FedeRamadan89](https://github.com/FedeRamadan89)
