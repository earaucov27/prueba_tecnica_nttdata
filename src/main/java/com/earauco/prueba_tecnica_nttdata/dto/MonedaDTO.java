package com.earauco.prueba_tecnica_nttdata.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonedaDTO {
    private String codigo;
    private String nombre;
    private String unidad_medida;
    private String fecha;
    private double valor;

    @Override
    public String toString() {
        return "Código: " + codigo + "\n" +
                "Nombre: " + nombre + "\n" +
                "Unidad de Medida: " + unidad_medida + "\n" +
                "Fecha: " + fecha + "\n" +
                "Valor: " + valor + "\n";
    }
}
