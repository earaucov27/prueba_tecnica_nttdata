package com.earauco.prueba_tecnica_nttdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DiferenciaMesController {

    @GetMapping("/diferencia-mes")
    public String mostrarDiferenciaMes() {
        return "diferencia-mes";
    }
}

