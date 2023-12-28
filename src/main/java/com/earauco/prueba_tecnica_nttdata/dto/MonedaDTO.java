package com.earauco.prueba_tecnica_nttdata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonedaDTO {
    private String nombre;
    private String unidad_medida;
    private Date fecha;
    private BigDecimal valor;
    private String codigo;

    @Override
    public String toString() {
        return "Nombre: " + nombre + "\n" +
                "Unidad de Medida: " + unidad_medida + "\n" +
                "Fecha: " + fecha + "\n" +
                "Valor: " + valor + "\n" +
                "Código: " + codigo + "\n";
    }
}




