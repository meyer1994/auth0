package io.meyer1994.auth0;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(final HttpSecurity http) throws Exception {
        // Disable
        http.csrf().disable();
        http.formLogin().disable();
        http.httpBasic().disable();

        // Cors
        http.cors();

        // OAuth2
        http.oauth2ResourceServer()
                .jwt();

        // Stateless
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Endpoints
        http.authorizeRequests()
                .mvcMatchers("/ping").permitAll()
                .mvcMatchers("/auth").authenticated()
                .anyRequest().authenticated();
    }
}
