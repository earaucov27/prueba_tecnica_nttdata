package com.earauco.prueba_tecnica_nttdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ComparacionController {

    @GetMapping("/comparacion")
    public String mostrarComparacion() {
        return "comparacion";
    }
}

