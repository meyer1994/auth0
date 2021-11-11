package io.meyer1994.auth0;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class Rest {
    @GetMapping("/authenticated")
    public Map<String, String> ping() {
        return Map.of("data", "this is from an authenticated request");
    }

    @GetMapping("/unauthenticated")
    public Map<String, String> auth() {
        return Map.of("data", "this is from an unauthenticated request");
    }
}
