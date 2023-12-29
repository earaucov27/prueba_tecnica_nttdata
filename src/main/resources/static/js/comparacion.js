document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular-btn");
    const resultados = document.getElementById("resultados");
    const valorEnFechaSpan = document.getElementById("valorEnFecha");
    const valorDolarSpan = document.getElementById("valorDolar");
    const porcentajeDeVariacionSpan = document.getElementById("porcentajeDeVariacion");
    const diferenciaEnPesosSpan = document.getElementById("diferenciaEnPesos");

    if (calcularBtn && resultados) {
        calcularBtn.addEventListener("click", function () {
            // Tipo de indicador que deseas consultar (en este caso, "dolar")
            const tipoIndicador = "dolar";

            // Obtener el campo de fechaConsulta
            const fechaConsultaInput = document.getElementById("fecha");

            if (fechaConsultaInput) {
                const fechaConsulta = fechaConsultaInput.value; // Obtener la fecha ingresada por el usuario

                // Construye la URL de la API para consultar el valor del indicador en la fecha especificada
                const apiUrlFechaEspecifica = `https://mindicador.cl/api/${tipoIndicador}/${fechaConsulta}`;

                fetch(apiUrlFechaEspecifica)
                    .then(response => response.json())
                    .then(indicadorFechaEspecifica => {
                        if (indicadorFechaEspecifica.serie && indicadorFechaEspecifica.serie.length > 0) {
                            const valorEnFecha = indicadorFechaEspecifica.serie[0].valor;

                            // Obtener el valor actual del Dólar
                            fetch('https://mindicador.cl/api')
                                .then(response => response.json())
                                .then(dailyIndicators => {
                                    const valorDolar = dailyIndicators.dolar.valor;

                                    // Calcular el porcentaje de variación
                                    const porcentajeVariacion = ((valorEnFecha - valorDolar) / valorDolar) * 100;

                                    // Calcular la diferencia en pesos
                                    const diferenciaEnPesos = valorEnFecha - valorDolar;

                                    // Actualizar los valores en el HTML
                                    valorEnFechaSpan.textContent = `$${valorEnFecha}`;
                                    valorDolarSpan.textContent = `$${valorDolar}`;
                                    porcentajeDeVariacionSpan.textContent = `${porcentajeVariacion.toFixed(3)}%`;
                                    diferenciaEnPesosSpan.textContent = `$${diferenciaEnPesos.toFixed(3)}`;

                                    // Mostrar los resultados en la consola
                                    console.log(`Valor en Fecha: $${valorEnFecha}`);
                                    console.log(`Valor Actual del Dólar: $${valorDolar}`);
                                    console.log(`Porcentaje de Variación: ${porcentajeVariacion.toFixed(3)}%`);
                                    console.log(`Diferencia en Pesos: $${diferenciaEnPesos.toFixed(3)}`);

                                    // Mostrar los resultados en el div "resultados"
                                    resultados.style.display = "block";
                                })
                                .catch(error => {
                                    console.log('Error al obtener el valor actual del Dólar:', error);
                                });
                        } else {
                            console.log(`No se encontraron datos para la fecha ${fechaConsulta}.`);
                        }
                    })
                    .catch(error => {
                        console.log(`Error al consultar el valor del Dólar para la fecha ${fechaConsulta}:`, error);
                    });
            } else {
                console.error("No se encontró el elemento fecha.");
            }
        });
    } else {
        console.error("No se encontraron los elementos calcular-btn o resultados.");
    }
});
