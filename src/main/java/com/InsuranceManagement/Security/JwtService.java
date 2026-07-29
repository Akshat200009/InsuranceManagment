package com.InsuranceManagement.Security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	// Secret Key 
	private static final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey12345";

	// Generate Secret Key Object
	private Key getSignKey() {

		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
	}

	// Generate JWT Token
	public String generateToken(String email) {

		return Jwts.builder().setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60*24*7))
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
	}

	// Extract Email
	public String extractEmail(String token) {

		return extractAllClaims(token).getSubject();
	}

	// Extract Expiration Date
	public Date extractExpiration(String token) {

		return extractAllClaims(token).getExpiration();
	}

	// Check Token Expiry
	public boolean isTokenExpired(String token) {

		return extractExpiration(token).before(new Date());
	}

	// Validate Token
	public boolean validateToken(String token, String email) {

		String extractedEmail = extractEmail(token);

		return extractedEmail.equals(email) && !isTokenExpired(token);
	}

	// Extract All Claims
	private Claims extractAllClaims(String token) {

		return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
	}
}