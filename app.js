// Alura 2025
// Reto amigo secreto Hector Silva
// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//INICIO DEL PROGRAMA

// Lista de amigos participantes
let amigos = [];

/**
 * Agrega un nombre a la lista de amigos evitando duplicados.
 */
function agregarAmigo() {
    let input = document.getElementById("amigo"); // Obtiene el input donde el usuario escribe el nombre
    let nombre = input.value.trim(); // Elimina espacios en blanco extra

    // Validación: Verifica que el campo no esté vacío
    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }
    
    // Validación: Evita nombres duplicados
    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre); // Agrega el nombre a la lista
    actualizarLista(); // Actualiza la lista en la interfaz
    input.value = ""; // Limpia el input después de agregar
}

/**
 * Actualiza la lista de amigos en la interfaz.
 */
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpia la lista antes de actualizarla
    
    amigos.forEach((amigo) => {
        let li = document.createElement("li"); // Crea un nuevo elemento de lista
        li.textContent = amigo; // Asigna el nombre del amigo como texto
        lista.appendChild(li); // Agrega el elemento a la lista en la interfaz
    });
}

/**
 * Realiza el sorteo del amigo secreto.
 */
function sortearAmigo() {
    // Verifica que haya al menos dos participantes para el sorteo
    if (amigos.length < 2) {
        alert("Se necesitan al menos dos personas para el sorteo.");
        return;
    }
    
    let asignaciones = asignarAmigosSecretos(); // Genera las asignaciones aleatorias
    mostrarResultado(asignaciones); // Muestra los resultados en la interfaz
}

/**
 * Asigna aleatoriamente cada amigo a otro sin que se repitan ni se asignen a sí mismos.
 * @returns {Object} - Un objeto con los pares de amigo secreto
 */
function asignarAmigosSecretos() {
    let participantes = [...amigos]; // Copia la lista original para no modificarla
    let resultado = {}; // Objeto donde se guardarán las asignaciones
    let disponibles = [...participantes]; // Lista de nombres disponibles para asignar
    
    for (let i = 0; i < participantes.length; i++) {
        let amigo = participantes[i]; // Toma el amigo actual
        let posibles = disponibles.filter(p => p !== amigo); // Filtra los nombres para evitar autoasignaciones

        // Si no hay opciones disponibles, se reinicia el proceso
        if (posibles.length === 0) {
            return asignarAmigosSecretos();
        }
        
        let asignado = posibles[Math.floor(Math.random() * posibles.length)]; // Selecciona un amigo al azar
        resultado[amigo] = asignado; // Guarda la asignación en el objeto resultado
        disponibles.splice(disponibles.indexOf(asignado), 1); // Elimina al asignado de la lista de disponibles
    }
    return resultado; // Devuelve el resultado final con todas las asignaciones
}

/**
 * Muestra los resultados del sorteo en la interfaz.
 * @param {Object} asignaciones - Objeto con las asignaciones de amigo secreto
 */
function mostrarResultado(asignaciones) {
    let listaResultados = document.getElementById("resultado");
    listaResultados.innerHTML = ""; // Limpia la lista de resultados antes de actualizarla
    
    // Recorre cada pareja de amigo y asignado para mostrarla en la interfaz
    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        let li = document.createElement("li"); // Crea un nuevo elemento de lista
        li.textContent = `${amigo} → ${asignado}`; // Formatea el resultado
        listaResultados.appendChild(li); // Agrega el resultado a la lista
    }
}
