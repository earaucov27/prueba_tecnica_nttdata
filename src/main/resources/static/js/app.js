// Declarar una variable global para almacenar el valor del dólar
let valorDolar;

// URL de la API de Mindicador
const apiUrl = "https://165.227.94.139/api";

// Obtener referencia a la tabla en el HTML
const tablaIndicadores = document.getElementById("tabla-indicadores");

// Hacer la solicitud a la API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Iterar a través de los indicadores y agregar filas a la tabla
        for (const indicador in data) {
            if (indicador !== "version" && indicador !== "autor" && indicador !== "fecha") {
                const fila = document.createElement("tr");
                const nombreCel = document.createElement("td");
                const valorCel = document.createElement("td");
                const unidadCel = document.createElement("td");
                const fechaCel = document.createElement("td");

                nombreCel.textContent = data[indicador].nombre;
                valorCel.textContent = `$${data[indicador].valor}`;
                unidadCel.textContent = data[indicador].unidad_medida;
                fechaCel.textContent = data[indicador].fecha;

                fila.appendChild(nombreCel);
                fila.appendChild(valorCel);
                fila.appendChild(unidadCel);
                fila.appendChild(fechaCel);

                tablaIndicadores.appendChild(fila);

                // Si el indicador es "Dólar", almacena su valor en la variable global
                if (data[indicador].nombre === "Dólar") {
                    valorDolar = data[indicador].valor;
                }
            }
        }
    })
    .catch(error => {
        console.error("Error al obtener datos de la API:", error);
    });
