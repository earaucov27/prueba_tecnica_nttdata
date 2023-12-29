document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular-btn");
    const resultados = document.getElementById("resultados");
    const valorEnFechaSpan = document.getElementById("valorEnFecha");
    const valorMonedaSpan = document.getElementById("valorMoneda");
    const porcentajeDeVariacionSpan = document.getElementById("porcentajeDeVariacion");
    const diferenciaEnPesosSpan = document.getElementById("diferenciaEnPesos");
    const promedioMesSpan = document.getElementById("promedioDelMes");

    if (calcularBtn && resultados && valorMonedaSpan) {
        calcularBtn.addEventListener("click", function () {
            const anioSelect = document.getElementById("anio");
            const mesSelect = document.getElementById("mes");
            const tipoMonedaSelect = document.getElementById("tipoMoneda"); // Agregado para seleccionar el tipo de moneda

            if (anioSelect && mesSelect && tipoMonedaSelect) {
                const anio = anioSelect.value;
                const mes = mesSelect.value;
                const tipoMoneda = tipoMonedaSelect.value; // Obtener el tipo de moneda seleccionado

                const primerDiaDelMes = new Date(anio, mes - 1, 1);
                const primerDiaDelMesFormat = formatearFecha(primerDiaDelMes);

                const ultimoDiaDelMes = new Date(anio, mes, 0);
                const ultimoDiaDelMesFormat = formatearFecha(ultimoDiaDelMes);

                const apiUrlFechaInicio = `https://mindicador.cl/api/${tipoMoneda}/${primerDiaDelMesFormat}`;
                const apiUrlFechaFin = `https://mindicador.cl/api/${tipoMoneda}/${ultimoDiaDelMesFormat}`;

                fetch(apiUrlFechaInicio)
                    .then(response => response.json())
                    .then(indicadorFechaInicio => {
                        if (indicadorFechaInicio.serie && indicadorFechaInicio.serie.length > 0) {
                            const valorInicioMes = indicadorFechaInicio.serie[0].valor;

                            fetch(apiUrlFechaFin)
                                .then(response => response.json())
                                .then(indicadorFechaFin => {
                                    if (indicadorFechaFin.serie && indicadorFechaFin.serie.length > 0) {
                                        const valorFinMes = indicadorFechaFin.serie[0].valor;

                                        fetch(`https://mindicador.cl/api/${tipoMoneda}`)
                                            .then(response => response.json())
                                            .then(indicadorMoneda => {
                                                const valorMoneda = indicadorMoneda.serie[0].valor;
                                                const porcentajeVariacion = ((valorFinMes - valorInicioMes) / valorInicioMes) * 100;
                                                const diferenciaEnPesos = valorInicioMes - valorFinMes;
                                                const promedioMes = ((valorFinMes + valorInicioMes) / 2);

                                                valorEnFechaSpan.textContent = `$${valorInicioMes}`;
                                                valorMonedaSpan.textContent = `$${valorMoneda}`;
                                                porcentajeDeVariacionSpan.textContent = `${porcentajeVariacion.toFixed(3)}%`;
                                                diferenciaEnPesosSpan.textContent = `$${diferenciaEnPesos.toFixed(3)}`;
                                                promedioMesSpan.textContent = `$${promedioMes.toFixed(3)}`;

                                                resultados.style.display = "block";
                                            })
                                            .catch(error => {
                                                console.log(`Error al obtener el valor actual de ${tipoMoneda}:`, error);
                                            });
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
            } else {
                console.error("No se encontraron los elementos anio, mes, tipoMoneda o calcular-btn.");
            }
        });
    } else {
        console.error("No se encontraron los elementos calcular-btn, resultados o valorMoneda.");
    }
});

// Función para formatear la fecha en "dd-mm-yyyy"
function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
}
