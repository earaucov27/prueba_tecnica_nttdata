//ComparacionViewController.java
package com.earauco.prueba_tecnica_nttdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ComparacionViewController {

    @GetMapping("/comparacion")
    public String mostrarVistaComparacion() {
        return "comparacion";
    }

}
