//PruebaTecnicaNttdataApplication.java
package com.earauco.prueba_tecnica_nttdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class PruebaTecnicaNttdataApplication {

	public static void main(String[] args) {
		SpringApplication.run(PruebaTecnicaNttdataApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
