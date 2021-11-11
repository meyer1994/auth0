package io.meyer1994.auth0;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

import java.util.List;

@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {
    @Value("${auth0.issuer}")
    private String issuer;

    @Value("${auth0.audience}")
    private String audience;

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
                .mvcMatchers("/authenticated").authenticated()
                .mvcMatchers("/unauthenticated").permitAll()
                .anyRequest().authenticated();
    }

    @Bean
    public JwtDecoder decoder() {
        var validAudience = new JwtClaimValidator<List<String>>(JwtClaimNames.AUD, aud -> aud.contains(this.audience));
        var validIssuer = JwtValidators.createDefaultWithIssuer(this.issuer);
        var validator = new DelegatingOAuth2TokenValidator<>(validIssuer, validAudience);

        var decoder = (NimbusJwtDecoder) JwtDecoders.fromIssuerLocation(this.issuer);
        decoder.setJwtValidator(validator);

        return decoder;
    }
}
