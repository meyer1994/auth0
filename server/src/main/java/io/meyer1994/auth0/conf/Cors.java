package io.meyer1994.auth0.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Cors implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(final CorsRegistry cors) {
        cors
                .addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET");
    }
}
