package io.meyer1994.auth0;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RestController
public class Rest {
    @Autowired
    private Auth0 auth0;

    @GetMapping("/authenticated")
    public Map<String, String> auth(@ModelAttribute User user) {
        log.debug("USER: {}", user);
        return Map.of("data", "this is from an authenticated request");
    }

    @GetMapping("/unauthenticated")
    public Map<String, String> unauth() {
        return Map.of("data", "this is from an unauthenticated request");
    }

    @ModelAttribute
    protected User user(@RequestHeader("Authorization") String token) throws IOException, InterruptedException {
        return this.auth0.fetchUser(token);
    }
}
