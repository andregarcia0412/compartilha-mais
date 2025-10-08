package com.vortex_project.vortex_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication
public class VortexProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(VortexProjectApplication.class, args);
	}

}
