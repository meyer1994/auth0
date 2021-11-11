package io.meyer1994.auth0.serv;

import lombok.Data;

import java.net.URL;
import java.time.Instant;

@Data
public class Auth0User {
    private String given_name;
    private String family_name;
    private String nickname;
    private String name;
    private URL picture;
    private String locale;
    private Instant updated_at;
    private String email;
    private Boolean email_verified;
    private String sub;
}
