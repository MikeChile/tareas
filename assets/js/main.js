// Función constructora "Tarea"
function Tarea(descripcion, estado = "pendiente") {
    this.descripcion = descripcion;
    this.estado = estado;
}

// Arreglo para almacenar tareas
let tareas = [];

// Función para agregar nuevas tareas
function agregarTarea() {
    let descripcion = document.getElementById("descripcion").value;
    if (descripcion === "") {
        alert("Por favor, ingresa una descripción para la tarea");
        return;
    }
    let tarea = new Tarea(descripcion);
    let tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    let tareaExistente = tareasStorage.find(tarea => tarea.descripcion === descripcion);
    if (tareaExistente) {
        alert("La tarea ya existe");
    } else {
        tareasStorage.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareasStorage));
        document.getElementById("descripcion").value = "";
        mostrarTareas();
    }
}
// Función para filtrar tareas por estado
function filtrarTareasPorEstado(estado) {
    let tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    let tareasFiltradas = tareasStorage.filter(tarea => tarea.estado === estado);
    mostrarTareasFiltradas(tareasFiltradas, estado);
}

// Función para mostrar tareas filtradas
function mostrarTareasFiltradas(tareasFiltradas, estado) {
    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;
    tareasFiltradas.forEach(tarea => {
        let textoBoton = tarea.estado === "completada" ? "Marcar como pendiente" : "Marcar como completada";
        let claseBoton = tarea.estado === "completada" ? "btn-danger" : "btn-info";
        html += `
            <tr>
                <td>${tarea.descripcion}</td>
                <td>${tarea.estado}</td>
                <td>
                    <button class="btn ${claseBoton}" onclick="marcarTareaCompletada('${tarea.descripcion}')">${textoBoton}</button>
                </td>
            </tr>
        `;
    });
    html += `
            </tbody>
        </table>
    `;
    document.getElementById("tareas").innerHTML = html;
}

// Función para mostrar el número total de tareas
function mostrarTotalTareas() {
    let tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    let totalTareas = tareasStorage.length;
    let tareasCompletadas = tareasStorage.filter(tarea => tarea.estado === "completada").length;
    let tareasPendientes = tareasStorage.filter(tarea => tarea.estado === "pendiente").length;
    alert(`Total de tareas: ${totalTareas}
----------------------------------------
Tareas completadas: ${tareasCompletadas}
Tareas pendientes: ${tareasPendientes}`);
}

// Función para mostrar tareas
function mostrarTareas() {
    let tareasStorage = JSON.parse(localStorage.getItem("tareas")) || [];
    let html = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th width="30%">Descripción</th>
                    <th width="30%">Estado</th>
                    <th width="40%">Acción</th>
                </tr>
            </thead>
            <tbody>
    `;
    tareasStorage.forEach(tarea => {
        let textoBoton = tarea.estado === "completada" ? "Marcar como pendiente" : "Marcar como completada";
        let claseBoton = tarea.estado === "completada" ? "btn-danger" : "btn-info";
        let icon = tarea.estado === "completada" ? "<i class='bx bx-checkbox-checked' ></i>" : "<i class='bx bx-checkbox' ></i>";
        html += `
            <tr>
                <td>${tarea.descripcion}</td>
                <td>${tarea.estado}</td>
                <td>
                    <button class="btn ${claseBoton}" onclick="marcarTareaCompletada('${tarea.descripcion}')">${icon} ${textoBoton}</button>
                </td>
            </tr>
        `;
    });
    html += `
            </tbody>
        </table>
    `;
    document.getElementById("tareas").innerHTML = html;
}

// Función para marcar una tarea como completada
function marcarTareaCompletada(descripcion) {
    let tareasStorage = JSON.parse(localStorage.getItem("tareas"));
    let tarea = tareasStorage.find(tarea => tarea.descripcion === descripcion);
    if (tarea) {
        tarea.estado = tarea.estado === "completada" ? "pendiente" : "completada";
        localStorage.setItem("tareas", JSON.stringify(tareasStorage));
        mostrarTareas();
    }
}