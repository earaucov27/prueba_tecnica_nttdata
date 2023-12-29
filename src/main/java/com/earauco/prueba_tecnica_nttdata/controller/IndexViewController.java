//IndexViewController.java
package com.earauco.prueba_tecnica_nttdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexViewController {

    @GetMapping("/")
    public String index(Model model) {
        return "index"; // Nombre del archivo HTML sin extensión
    }
}
