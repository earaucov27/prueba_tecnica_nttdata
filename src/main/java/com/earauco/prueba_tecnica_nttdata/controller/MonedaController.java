package com.earauco.prueba_tecnica_nttdata.controller;

import com.earauco.prueba_tecnica_nttdata.dto.MonedaDTO;
import com.earauco.prueba_tecnica_nttdata.service.MonedaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class MonedaController {

    private final MonedaService monedaService;

    public MonedaController(MonedaService monedaService) {
        this.monedaService = monedaService;
    }

    @GetMapping("/monedas/listar")
    public List<MonedaDTO> getTodasLasMonedas() {
        List<MonedaDTO> monedas = monedaService.obtenerTodasLasMonedas();
        monedas.forEach(moneda -> log.info(moneda.toString()));
        return monedas;
    }

    @GetMapping("/monedas/{codigo}")
    public MonedaDTO getMonedaPorCodigo(@PathVariable String codigo) {
        MonedaDTO moneda = monedaService.obtenerMonedaPorCodigo(codigo);
        log.info(moneda.toString());
        return moneda;
    }
}
