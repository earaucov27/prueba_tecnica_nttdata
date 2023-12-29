package com.earauco.prueba_tecnica_nttdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PromedioVariacionAnioViewController {

    @GetMapping("/promedio-variacion-anio")
    public String mostrarPromedioVariacionAnio() {
        return "promedio-variacion-anio";
    }
}

