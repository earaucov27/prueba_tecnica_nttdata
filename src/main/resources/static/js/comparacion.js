document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular-btn");
    const resultados = document.getElementById("resultados");
    const valorEnFechaSpan = document.getElementById("valorEnFecha");
    const valorMonedaSpan = document.getElementById("valorMoneda");
    const porcentajeDeVariacionSpan = document.getElementById("porcentajeDeVariacion");
    const diferenciaEnPesosSpan = document.getElementById("diferenciaEnPesos");

    if (calcularBtn && resultados && valorMonedaSpan) {
        calcularBtn.addEventListener("click", function () {
            const fechaConsultaInput = document.getElementById("fecha");
            const tipoMonedaSelect = document.getElementById("tipoMoneda");

            if (fechaConsultaInput && tipoMonedaSelect) {
                const fechaConsulta = fechaConsultaInput.value;
                const tipoMoneda = tipoMonedaSelect.value;

                const apiUrlFechaEspecifica = `https://mindicador.cl/api/${tipoMoneda}/${fechaConsulta}`;

                fetch(apiUrlFechaEspecifica)
                    .then(response => response.json())
                    .then(indicadorFechaEspecifica => {
                        if (indicadorFechaEspecifica.serie && indicadorFechaEspecifica.serie.length > 0) {
                            const valorEnFecha = indicadorFechaEspecifica.serie[0].valor;

                            fetch(`https://mindicador.cl/api/${tipoMoneda}`)
                                .then(response => response.json())
                                .then(indicadorMoneda => {
                                    const valorMoneda = indicadorMoneda.serie[0].valor;
                                    const porcentajeVariacion = ((valorEnFecha - valorMoneda) / valorMoneda) * 100;
                                    const diferenciaEnPesos = valorEnFecha - valorMoneda;

                                    valorEnFechaSpan.textContent = `$${valorEnFecha}`;
                                    valorMonedaSpan.textContent = `$${valorMoneda}`;
                                    porcentajeDeVariacionSpan.textContent = `${porcentajeVariacion.toFixed(3)}%`;
                                    diferenciaEnPesosSpan.textContent = `$${diferenciaEnPesos.toFixed(3)}`;

                                    resultados.style.display = "block";
                                })
                                .catch(error => {
                                    console.log(`Error al obtener el valor actual de ${tipoMoneda}:`, error);
                                });
                        } else {
                            console.log(`No se encontraron datos para la fecha ${fechaConsulta}.`);
                        }
                    })
                    .catch(error => {
                        console.log(`Error al consultar el valor de ${tipoMoneda} para la fecha ${fechaConsulta}:`, error);
                    });
            } else {
                console.error("No se encontraron los elementos fecha o tipoMoneda.");
            }
        });
    } else {
        console.error("No se encontraron los elementos calcular-btn, resultados o valorMoneda.");
    }
});
