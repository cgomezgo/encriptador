// Selección de elementos del DOM
const textArea = document.querySelector(".input-text");
const mensaje = document.querySelector(".mensaje");

// Definir reglas de cifrado en un array de objetos
const reglasCifrado = [
    { original: "e", encriptado: "enter" },
    { original: "i", encriptado: "imes" },
    { original: "a", encriptado: "ai" },
    { original: "o", encriptado: "ober" },
    { original: "u", encriptado: "ufat" }
];

// Validar que texto solo contenga letras minúsculas y sin acentos
function soloMinusculasYSinAcentos(texto) {
    const regex = /^[a-z]+$/; // Expresión regular que verifica solo letras minúsculas sin acentos
    return regex.test(texto);
}

// Muestra mensaje de alerta y recarga la página
function mostrarAlerta(mensaje) {
    alert(mensaje);
    location.reload();
}

// Transforma el texto aplicando las reglas de cifrado o descifrado
function transformarTexto(texto, reglas) {
    return reglas.reduce((resultado, { original, encriptado }) => {
        // Reemplaza cada letra según las reglas definidas
        return resultado.replaceAll(original, encriptado);
    }, texto.toLowerCase()); // Convierte el texto a minúsculas antes de aplicar las reglas
}

// Encripta el texto utilizando las reglas definidas
function encriptarTexto(texto) {
    return transformarTexto(texto, reglasCifrado);
}

// Desencripta el texto utilizando las reglas invertidas
function desencriptarTexto(texto) {
    // Invertimos las reglas de cifrado para desencriptar
    const reglasInversas = reglasCifrado.map(({ original, encriptado }) => ({ original: encriptado, encriptado: original }));
    return transformarTexto(texto, reglasInversas);
}

// Maneja el proceso de encriptado o desencriptado según  parámetro recibido
function manejarCifrado(encriptar = true) {
    const texto = textArea.value;

    // Validamos el texto antes de proceder
    if (!soloMinusculasYSinAcentos(texto)) {
        mostrarAlerta("Solo son permitidas letras minúsculas y sin acentos");
        return;
    }

    // Dependiendo del parámetro, encripta o desencripta el texto
    mensaje.value = encriptar ? encriptarTexto(texto) : desencriptarTexto(texto);
    mensaje.style.backgroundImage = "none"; // Eliminamos cualquier imagen de fondo del área de mensaje
    textArea.value = ""; // Limpiamos el área de texto después de procesar
}

// Copia el texto encriptado o desencriptado al portapapeles
function copiarAlPortapapeles() {
    mensaje.select(); // Selecciona el texto dentro del área de mensaje
    navigator.clipboard.writeText(mensaje.value); // Copia el texto seleccionado al portapapeles
    mensaje.value = ""; // Limpia el área de mensaje después de copiar
    mostrarAlerta("Texto Copiado");
}

// Asignamos las funciones a los botones correspondientes
document.querySelector(".boton-encriptar").addEventListener("click", () => manejarCifrado(true));
document.querySelector(".boton-desencriptar").addEventListener("click", () => manejarCifrado(false));
document.querySelector(".boton-copiar").addEventListener("click", copiarAlPortapapeles);
