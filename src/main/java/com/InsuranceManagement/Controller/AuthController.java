package com.InsuranceManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.InsuranceManagement.DTO.AuthResponse;
import com.InsuranceManagement.DTO.LoginRequest;
import com.InsuranceManagement.DTO.RegisterRequest;
import com.InsuranceManagement.Services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
@Validated
public class AuthController {
  
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest request)
	{
		return ResponseEntity.ok(authService.register(request));
	}
	@PostMapping("/login")
	 public ResponseEntity<AuthResponse>loginUser(@Valid @RequestBody LoginRequest request)
	 {
		return ResponseEntity.ok(authService.login(request));
	 }
	
}
