document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular-btn");
    const resultados = document.getElementById("resultados");
    const promedioPorMesSpan = document.getElementById("promedioPorMes");
    const porcentajeVariacionSpan = document.getElementById("porcentajeVariacion");

    if (calcularBtn && resultados) {
        calcularBtn.addEventListener("click", function () {
            // Tipo de indicador que deseas consultar
            const tipoMonedaSelect = document.getElementById("tipoMoneda");
            const tipoIndicador = tipoMonedaSelect.value; // Obtener el tipo de moneda seleccionado

            // Obtener el año especificado
            const anioInput = document.getElementById("anio");
            const anio = anioInput.value;

            // Construir la URL de la API para consultar el valor
            const apiUrlAnioEspecifico = `https://mindicador.cl/api/${tipoIndicador}/${anio}`;

            // Realizar la consulta al año especificado
            fetch(apiUrlAnioEspecifico)
                .then(response => response.json())
                .then(data => {
                    const promedioPorMes = calcularPromedioPorMes(data);
                    const porcentajeVariacion = calcularPorcentajeVariacion(data);

                    if (typeof porcentajeVariacion === 'number') {
                        // Formatear el porcentajeVariacion como un número con 3 decimales
                        const porcentajeVariacionFormateado = porcentajeVariacion.toFixed(3);

                        // Luego, establecer el contenido en el elemento HTML
                        promedioPorMesSpan.textContent = `$${promedioPorMes.toFixed(3)}`;
                        porcentajeVariacionSpan.textContent = `${porcentajeVariacionFormateado}%`;

                        // Mostrar los resultados en el div "resultados"
                        resultados.style.display = "block";

                        // Mostrar los resultados por consola
                        console.log(`Promedio por Mes: $${promedioPorMes.toFixed(3)}`);
                        console.log(`Porcentaje de Variación: ${porcentajeVariacionFormateado}%`);
                    } else {
                        // Manejar el caso en el que porcentajeVariacion no sea un número
                        console.error("El valor de porcentajeVariacion no es un número válido.");
                    }
                })
                .catch(error => {
                    console.error(`Error al consultar los datos para el año ${anio}:`, error);
                });
        });
    } else {
        console.error("No se encontraron los elementos calcular-btn o resultados.");
    }
});

// Función para calcular el promedio por mes
function calcularPromedioPorMes(data) {
    if (data && data.serie && data.serie.length > 0) {
        const valoresMensuales = data.serie.map(entry => entry.valor);
        const totalValores = valoresMensuales.reduce((acumulador, valor) => acumulador + valor, 0);
        const promedioPorMes = totalValores / valoresMensuales.length;
        return promedioPorMes;
    } else {
        console.error("Los datos de la API no son válidos o están incompletos.");
        return null;
    }
}

// Función para calcular el porcentaje de variación
function calcularPorcentajeVariacion(data) {
    if (data && data.serie && data.serie.length >= 2) {
        const primerValor = data.serie[0].valor;
        const ultimoValor = data.serie[data.serie.length - 1].valor;

        // Calcular el porcentaje de variación
        const porcentajeVariacion = ((ultimoValor - primerValor) / primerValor) * 100;

        return porcentajeVariacion;
    } else {
        console.error("Los datos de la API no son válidos o están incompletos para calcular el porcentaje de variación.");
        return null;
    }
}
