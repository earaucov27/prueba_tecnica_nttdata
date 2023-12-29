document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular-btn");
    const resultados = document.getElementById("resultados");
    const valorEnFechaSpan = document.getElementById("valorEnFecha");
    const valorDolarSpan = document.getElementById("valorDolar");
    const porcentajeDeVariacionSpan = document.getElementById("porcentajeDeVariacion");
    const diferenciaEnPesosSpan = document.getElementById("diferenciaEnPesos");
    const promedioMesSpan = document.getElementById("promedioDelMes"); // Cambiado a "promedioDelMes" para que coincida con el HTML

    if (calcularBtn && resultados) {
        calcularBtn.addEventListener("click", function () {
            // Tipo de indicador que deseas consultar
            const tipoIndicador = "dolar"; // Cambiar a "uf" u otro tipo de indicador según sea necesario

            // Obtener el año seleccionado
            const anioSelect = document.getElementById("anio");
            const anio = anioSelect.value;

            // Obtener el mes seleccionado
            const mesSelect = document.getElementById("mes");
            const mes = mesSelect.value;

            // Obtener el primer día del mes
            const primerDiaDelMes = new Date(anio, mes - 1, 1);
            const primerDiaDelMesFormat = formatearFecha(primerDiaDelMes); // Formato "dd-mm-yyyy"

            // Obtener el último día del mes
            const ultimoDiaDelMes = new Date(anio, mes, 0);
            const ultimoDiaDelMesFormat = formatearFecha(ultimoDiaDelMes); // Formato "dd-mm-yyyy"

            // Construir la URL de la API para consultar el valor al principio del mes
            const apiUrlFechaInicio = `https://mindicador.cl/api/${tipoIndicador}/${primerDiaDelMesFormat}`;

            // Construir la URL de la API para consultar el valor al final del mes
            const apiUrlFechaFin = `https://mindicador.cl/api/${tipoIndicador}/${ultimoDiaDelMesFormat}`;

            // Realizar la consulta al principio del mes
            fetch(apiUrlFechaInicio)
                .then(response => response.json())
                .then(indicadorFechaInicio => {
                    if (indicadorFechaInicio.serie && indicadorFechaInicio.serie.length > 0) {
                        const valorInicioMes = indicadorFechaInicio.serie[0].valor;

                        // Realizar la consulta al final del mes
                        fetch(apiUrlFechaFin)
                            .then(response => response.json())
                            .then(indicadorFechaFin => {
                                if (indicadorFechaFin.serie && indicadorFechaFin.serie.length > 0) {
                                    const valorFinMes = indicadorFechaFin.serie[0].valor;

                                    // Obtener el valor actual del indicador
                                    fetch('https://mindicador.cl/api')
                                        .then(response => response.json())
                                        .then(dailyIndicators => {
                                            const valorIndicadorActual = dailyIndicators[tipoIndicador].valor;

                                            // Calcular el porcentaje de variación entre el principio y el final del mes
                                            const porcentajeVariacion = ((valorFinMes - valorInicioMes) / valorInicioMes) * 100;

                                            // Calcular la diferencia en pesos entre el principio y el valor actual
                                            const diferenciaEnPesos = valorInicioMes - valorFinMes;

                                            // Calcular el promedio del mes
                                            const promedioMes = ((valorFinMes + valorInicioMes) / 2);

                                            // Actualizar los valores en el HTML
                                            valorEnFechaSpan.textContent = `$${valorInicioMes}`;
                                            valorDolarSpan.textContent = `$${valorFinMes}`;
                                            porcentajeDeVariacionSpan.textContent = `${porcentajeVariacion.toFixed(3)}%`;
                                            diferenciaEnPesosSpan.textContent = `$${diferenciaEnPesos.toFixed(3)}`;
                                            promedioMesSpan.textContent = `$${promedioMes.toFixed(3)}`;

                                            // Mostrar los resultados en la consola
                                            console.log(`Valor al principio del mes: $${valorInicioMes}`);
                                            console.log(`Valor al final del mes: $${valorFinMes}`);
                                            console.log(`Valor Actual del Indicador: $${valorIndicadorActual}`);
                                            console.log(`Porcentaje de Variación: ${porcentajeVariacion.toFixed(3)}%`);
                                            console.log(`Diferencia en Pesos: $${diferenciaEnPesos.toFixed(3)}`);
                                            console.log(`Promedio del Mes: $${promedioMes.toFixed(3)}`);

                                            // Mostrar los resultados en el div "resultados"
                                            resultados.style.display = "block";
                                        })
                                } else {
                                    console.log(`No se encontraron datos para el último día del mes ${mes}-${anio}.`);
                                }
                            })
                            .catch(error => {
                                console.log(`Error al consultar el valor al final del mes ${mes}-${anio}:`, error);
                            });
                    } else {
                        console.log(`No se encontraron datos para el primer día del mes ${mes}-${anio}.`);
                    }
                })
                .catch(error => {
                    console.log(`Error al consultar el valor al principio del mes ${mes}-${anio}:`, error);
                });
        });
    } else {
        console.error("No se encontraron los elementos calcular-btn o resultados.");
    }
});

// Función para formatear la fecha en "dd-mm-yyyy"
function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
}
