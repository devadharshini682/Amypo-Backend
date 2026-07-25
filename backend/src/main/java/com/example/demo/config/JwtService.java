// package com.example.demo.config;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.stereotype.Service;

// import java.security.Key;
// import java.util.Date;

// @Service
// public class JwtService {

//     // Private secret key (t23)
//     private static final String SECRET =
//             "LanguageLoopSecretKeyLanguageLoopSecretKey12345";

//     private Key getSigningKey() {
//         return Keys.hmacShaKeyFor(SECRET.getBytes());
//     }

//     // Generate JWT Token (t24)
//     public String generateToken(String username) {

//         return Jwts.builder()
//                 .setSubject(username)
//                 .setIssuedAt(new Date())
//                 .setExpiration(
//                         new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     // Extract Username (t26)
//     public String extractUsername(String token) {

//         return extractClaims(token).getSubject();
//     }

//     // Validate Token (t25)
//     public boolean validateToken(String token, String username) {

//         String extractedUsername = extractUsername(token);

//         return extractedUsername.equals(username)
//                 && !isTokenExpired(token);
//     }

//     private boolean isTokenExpired(String token) {

//         return extractClaims(token)
//                 .getExpiration()
//                 .before(new Date());
//     }

//     private Claims extractClaims(String token) {

//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }
// }

package com.example.demo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "LanguageLoopSecretKeyLanguageLoopSecretKey12345";


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }


    public String generateToken(String username, String role) {

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }


    public String extractRole(String token) {

        return extractClaims(token)
                .get("role", String.class);
    }


    public boolean validateToken(String token, String username) {

        return extractUsername(token).equals(username)
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }


    private Claims extractClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}