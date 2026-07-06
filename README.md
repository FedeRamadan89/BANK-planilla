# 🏦 NOC / CPD - Sistema Automatizado de Planillas (BCRA)

> ⚡ **RAMA DE MEJORA: MODO OFFLINE Y PERSISTENCIA (Pendiente de Aprobación)**
> 
> **Atención:** Esta rama es una versión "Candidata a Producción". Contiene el dashboard operativo base, pero incluye dos mejoras de infraestructura críticas para la resiliencia en el Data Center:
> 
> 1. **Modo 100% Offline:** Las dependencias visuales y de exportación (Bootstrap y html2pdf) fueron aisladas físicamente en la carpeta `Libs/`. El sistema ya no requiere salida a internet ni resolución DNS para funcionar o generar reportes.
> 2. **Autoguardado de Madrugada:** Lógica de congelamiento de fecha en `app.js` para proteger el registro de los turnos nocturnos ante recargas del navegador posteriores a la medianoche.

Este proyecto es una solución web moderna diseñada para reemplazar el manejo manual de planillas de actividades operativas. Automatiza el control de los turnos de **Lunes a Viernes (V9.2)** y **Fin de Semana (SD&F)**, evolucionando de un registro estático en Word a un Dashboard interactivo y auditable.

## 🚀 Características Principales

- **Consolidación de Tareas:** Agrupa tareas recurrentes (ej. Verificación Web) en bloques lógicos para evitar scrolls infinitos y redundancia visual.
- **Dinamismo por Turno:** Selección inteligente de actividades según el día y horario (carga procesos específicos como Tuxedo, SEPAIMPO o cierres de Sybase solo cuando corresponde).
- **Control de Ejecución Interactivo:** Implementación de selectores de estado ("Realizado" / "No realizado"). Si una tarea no se completa, el sistema despliega automáticamente un campo obligatorio para registrar el motivo o Nro. de ticket.
- **Gestión Dinámica de Tickets:** Sección de Novedades que permite agregar múltiples inputs de tickets iTop según la necesidad del turno.
- **Autoguardado Local (Persistencia):** El sistema guarda automáticamente el progreso del turno en la memoria del navegador. Si la página se recarga o cierra por accidente, no se pierden los datos cargados.
- **Generación de Reportes:** Exportación profesional a PDF utilizando `html2pdf.js` para firma y archivo.

## 🏗️ Arquitectura del Proyecto

El código está modularizado aplicando el principio de Separación de Responsabilidades (*Separation of Concerns*) para garantizar su escalabilidad y facilitar el mantenimiento en el Data Center:

- **`index.html`**: Estructura principal y maquetado semántico (UI).
- **`estilos.css`**: Hoja de estilos independiente.
- **`app.js`**: Motor lógico del dashboard (eventos, persistencia en `localStorage`, carga de manuales y generación de PDF).
- **`Libs/`**: Carpeta de dependencias locales para garantizar el funcionamiento offline (Bootstrap y html2pdf).

## 🛠️ Tecnologías Utilizadas

Al ser un MVP enfocado en la interfaz y la experiencia del operador, el proyecto es 100% Front-end y no requiere configuración de servidores para su uso inmediato.

* **Estructura y Diseño:** HTML5, CSS3, Bootstrap 5 (Framework UI).
* **Lógica Dinámica y Persistencia:** JavaScript (Vanilla) y LocalStorage API.
* **Exportación:** `html2pdf.js`.

## 📋 Instrucciones de Uso

### 1. Clonar el repositorio
Descargá el proyecto en tu equipo local:
```bash
git clone [https://github.com/FedeRamadan89/BANK-planilla.git](https://github.com/FedeRamadan89/BANK-planilla.git)
cd BANK-planilla```
