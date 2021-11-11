package io.meyer1994.auth0;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Slf4j
@Service
public class Auth0 {
    @Autowired
    private ObjectMapper mapper;

    @Value("${auth0.issuer}userinfo")
    private URI issuer;

    protected HttpClient client = HttpClient.newHttpClient();

    public User fetchUser(final String token) {
        var req = HttpRequest.newBuilder()
                .GET()
                .uri(this.issuer)
                .header("Authorization", token)
                .build();

        HttpResponse<String> res;
        try {
            res = this.client.send(req, HttpResponse.BodyHandlers.ofString());
        } catch (InterruptedException | IOException e) {
            log.error("Error making request to Auth0", e);
            throw this.unauth("Error making request to Auth0");
        }

        if (res.statusCode() != HttpStatus.OK.value()) {
            log.error("Error response from Auth0: {}", res);
            throw this.unauth("Response from Auth0 is not 200");
        }

        try {
            return this.mapper.readValue(res.body(), User.class);
        } catch (IOException e) {
            log.error("Error parsing response from Auth0", e);
            throw this.unauth("Error parsing response from Auth0");
        }
    }

    protected ResponseStatusException unauth(String message) {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, message);
    }
}
