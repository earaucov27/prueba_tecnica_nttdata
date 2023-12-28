package com.earauco.prueba_tecnica_nttdata.service;

import com.earauco.prueba_tecnica_nttdata.dto.MonedaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MonedaService {

    private final RestTemplate restTemplate;

    public MonedaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MonedaDTO> obtenerTodasLasMonedas() {
        String url = "https://658c98b9859b3491d3f63c9b.mockapi.io/api/v1/monedas";
        MonedaDTO[] monedaDTOArray = restTemplate.getForObject(url, MonedaDTO[].class);
        return monedaDTOArray != null ? Arrays.asList(monedaDTOArray) : Collections.emptyList();
    }

    public MonedaDTO obtenerMonedaPorId(String id) {
        String url = "https://658c98b9859b3491d3f63c9b.mockapi.io/api/v1/monedas/" + id;
        return restTemplate.getForObject(url, MonedaDTO.class);
    }
}

