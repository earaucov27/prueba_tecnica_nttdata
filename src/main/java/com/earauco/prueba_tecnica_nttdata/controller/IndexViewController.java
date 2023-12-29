package com.earauco.prueba_tecnica_nttdata.controller;

import com.earauco.prueba_tecnica_nttdata.dto.MonedaDTO;
import com.earauco.prueba_tecnica_nttdata.service.MonedaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class IndexViewController {

    private final MonedaService monedaService;

    public IndexViewController(MonedaService monedaService) {
        this.monedaService = monedaService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<MonedaDTO> monedas = monedaService.obtenerTodasLasMonedas();
        model.addAttribute("monedas", monedas);
        return "index"; // Nombre del archivo HTML sin extensión
    }
}
