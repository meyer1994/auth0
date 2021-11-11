package io.meyer1994.auth0;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Rest {
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/auth")
    public String auth() {
        return "nice";
    }

    @GetMapping("/other")
    public String other() {
        return "other";
    }
}
