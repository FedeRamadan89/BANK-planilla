/* --- app.js --- */

// 1. VARIABLES GLOBALES Y CONFIGURACIÓN INICIAL
let currentScheduleType = '';
const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

// Carga la fecha al iniciar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('fechaActual').innerText = new Date().toLocaleDateString('es-AR', opcionesFecha);
    cargarDatosGuardados(); // Revisa si hay una sesión previa guardada
});

// 2. BASE DE DATOS LOCAL (Manuales y Tareas)
const schedules = {
    'LaV': [
        { time: '00:00', task: 'Verificación de la Página WEB del B.C.R.A.', target: 'ProdWeb1 (192.168.188.3)', cap: 'Cap. 15' },
        { time: '00:00', task: 'Monitoreo de Servidores y Control de Acceso', target: 'Nagios', cap: 'Cap. 23' },
        { time: '02:00', task: 'Control UPS', target: '10.2.0.242 y 10.2.0.243', cap: '-' },
        { time: '03:35', task: 'TUXEDO - Detención de los 69 servicios', target: 'ProdTuxedoComm', cap: 'Cap. 16.3.2' },
        { time: '06:05', task: 'TUXEDO – Inicio de los 69 servicios', target: 'ProdTuxedoComm', cap: 'Cap. 16.3.1' },
        { time: '08:00', task: 'SEPAIMPO (Proceso Diario)', target: 'SEPAIMPO 1 – Proceso Completo', cap: 'Cap. 24' },
        { time: '10:00', task: 'Control PCs de Arsat', target: 'Acceso Remoto APC0790 y APC0588', cap: '-' },
        { time: '17:15', task: 'Verificación inicio Proceso CHEQUES diario', target: 'Servidor PRODSQL1', cap: 'Cap. 27.2' },
        { time: '23:10', task: 'Herramienta Gestión BD', target: 'Backup PRODBDSY1', cap: 'Cap. 32.8' }
    ],
    'SDF': [
        { time: '00:00', task: 'Verificación de la Página WEB del B.C.R.A.', target: 'PRODWEB1 Dirección Privada', cap: 'Cap. 15' },
        { time: '00:00', task: 'Control de Correo Entrante y Saliente', target: 'Mail Sweeper', cap: 'Cap. 20' },
        { time: '00:00', task: 'Control de Resguardos (Cell Manager)', target: 'Resguardos en curso / Sesiones fallidas', cap: 'Cap. 2.2' },
        { time: '08:00', task: 'Reinicio de Servidores Bases de Datos', target: '08:00 a 11:00 hs.', cap: 'Cap. 3' },
        { time: '10:15', task: 'Descarga de Archivos A.F.I.P.', target: 'Tasa 0 Diferida (CTS)', cap: 'Cap. 1.5' },
        { time: '18:00', task: 'Descarga de Archivos de A.F.I.P.', target: 'Facturas Apócrifas', cap: 'Cap. 38' },
        { time: '22:00', task: 'Reinicio de Servidores de Producción', target: '22:00 a 01:00 hs.', cap: 'Cap. 3' }
    ]
};

// 3. FUNCIONES DE RENDERIZADO (UI)
function loadSchedule(type) {
    currentScheduleType = type;
    const tbody = document.getElementById('tableBody');
    document.getElementById('pageTitle').innerText = type === 'LaV' ? 'Planilla Operativa: Lunes a Viernes (V9.2)' : 'Planilla Operativa: Fin de Semana (SD&F)';
    tbody.innerHTML = '';
    
    schedules[type].forEach(row => {
        tbody.innerHTML += `
            <tr>
                <td class="text-center fw-bold text-primary">${row.time}</td>
                <td class="fw-semibold">${row.task}</td>
                <td class="small font-monospace text-secondary">${row.target}</td>
                <td>
                    <select class="form-select form-select-sm border-secondary shadow-sm status-select" onchange="toggleReason(this); guardarDatos();">
                        <option value="Realizado" selected>Realizado</option>
                        <option value="No realizado">No realizado</option>
                    </select>
                    <textarea class="form-control form-control-sm mt-2 reason-box border-warning shadow-sm reason-text" rows="2" placeholder="Indique el motivo o Nro de ticket..." oninput="guardarDatos()"></textarea>
                </td>
                <td class="text-center"><span class="badge bg-secondary">${row.cap}</span></td>
            </tr>
        `;
    });
    guardarDatos();
}

function toggleReason(selectElement) {
    const reasonBox = selectElement.nextElementSibling;
    if (selectElement.value === 'No realizado') {
        reasonBox.style.display = 'block';
        selectElement.classList.replace('border-secondary', 'border-danger');
        selectElement.classList.add('text-danger', 'fw-bold');
    } else {
        reasonBox.style.display = 'none';
        reasonBox.value = ''; 
        selectElement.classList.replace('border-danger', 'border-secondary');
        selectElement.classList.remove('text-danger', 'fw-bold');
    }
}

// 4. FUNCIONES DE TICKETS (iTop)
function addTicket() {
    const container = document.getElementById('ticketsContainer');
    const newRow = document.createElement('div');
    newRow.className = 'input-group mb-2 ticket-row';
    newRow.innerHTML = `
        <input type="text" class="form-control border-info ticket-input" placeholder="Ej: INC-123456" oninput="guardarDatos()">
        <button class="btn btn-outline-danger" type="button" onclick="removeTicket(this)" data-html2canvas-ignore="true">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(newRow);
    guardarDatos();
}

function removeTicket(buttonElement) {
    buttonElement.parentElement.remove();
    guardarDatos();
}

// 5. FUNCIONES DE PERSISTENCIA (LocalStorage)
function guardarDatos() {
    if (!currentScheduleType) return; 

    const tableData = [];
    const selects = document.querySelectorAll('.status-select');
    const textareas = document.querySelectorAll('.reason-text');
    
    for (let i = 0; i < selects.length; i++) {
        tableData.push({ status: selects[i].value, reason: textareas[i].value });
    }

    const ticketInputs = document.querySelectorAll('.ticket-input');
    const tickets = Array.from(ticketInputs).map(input => input.value);

    const dataToSave = {
        type: currentScheduleType,
        table: tableData,
        novedades: document.getElementById('novedadesText').value,
        tickets: tickets,
        firma: document.getElementById('firmaInput').value
    };

    localStorage.setItem('planilla_cpd_datos', JSON.stringify(dataToSave));
}

function cargarDatosGuardados() {
    const saved = localStorage.getItem('planilla_cpd_datos');
    if (saved) {
        const data = JSON.parse(saved);

        loadSchedule(data.type);

        const selects = document.querySelectorAll('.status-select');
        const textareas = document.querySelectorAll('.reason-text');

        data.table.forEach((row, i) => {
            if (selects[i]) {
                selects[i].value = row.status;
                toggleReason(selects[i]);
                textareas[i].value = row.reason;
            }
        });

        document.getElementById('novedadesText').value = data.novedades || '';
        document.getElementById('firmaInput').value = data.firma || '';

        const container = document.getElementById('ticketsContainer');
        container.innerHTML = ''; 
        if (data.tickets && data.tickets.length > 0) {
            data.tickets.forEach((ticketVal, index) => {
                const btnHtml = index === 0 
                    ? `<button class="btn btn-outline-info" type="button" onclick="addTicket()" data-html2canvas-ignore="true"><i class="bi bi-plus-lg"></i></button>`
                    : `<button class="btn btn-outline-danger" type="button" onclick="removeTicket(this)" data-html2canvas-ignore="true"><i class="bi bi-trash"></i></button>`;
                
                container.innerHTML += `
                    <div class="input-group mb-2 ticket-row">
                        <input type="text" class="form-control border-info ticket-input" placeholder="Ej: INC-123456" value="${ticketVal}" oninput="guardarDatos()">
                        ${btnHtml}
                    </div>
                `;
            });
        } else {
            container.innerHTML = `<div class="input-group mb-2 ticket-row"><input type="text" class="form-control border-info ticket-input" placeholder="Ej: INC-123456" oninput="guardarDatos()"><button class="btn btn-outline-info" type="button" onclick="addTicket()" data-html2canvas-ignore="true"><i class="bi bi-plus-lg"></i></button></div>`;
        }
    }
}

function limpiarPlanilla() {
    if (confirm("¿Estás seguro de que deseas limpiar toda la planilla para iniciar un nuevo turno?")) {
        localStorage.removeItem('planilla_cpd_datos');
        location.reload(); 
    }
}

// 6. EXPORTACIÓN A PDF
function exportarPDF() {
    const element = document.getElementById('reporteContenido');
    const dateStr = new Date().toISOString().slice(0,10);
    const turno = document.getElementById('pageTitle').innerText.includes('V9.2') ? 'LaV' : 'SDF';
    
    const opt = {
        margin:       [10, 10, 10, 10],
        filename:     `Planilla_${turno}_${dateStr}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
}
