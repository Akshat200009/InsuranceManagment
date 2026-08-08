package com.InsuranceManagement.Services;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.AuthResponse;
import com.InsuranceManagement.DTO.LoginRequest;
import com.InsuranceManagement.DTO.RegisterRequest;
import com.InsuranceManagement.Entities.User;
import com.InsuranceManagement.Repository.UserRepository;
import com.InsuranceManagement.Security.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepo;
	private final PasswordEncoder passenc;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {

		this.userRepo = userRepository;
		this.passenc = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	@Override
	public String register(RegisterRequest request) {

		if (userRepo.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already Exists") ;
		}
		if (userRepo.existsByPhone(request.getPhone())) {
			throw new RuntimeException("Phone Already Exists");
		}

		User user = new User();
		user.setFullname(request.getFullName());
		user.setEmail(request.getEmail());

		// Encrypt Password
		user.setPassword(passenc.encode(request.getPassword()));

		user.setPhone(request.getPhone());
		user.setRole(request.getRole());

		userRepo.save(user);

		return "User Registered Successfully";
	}

	@Override
	public AuthResponse login(LoginRequest request) {

	    authenticationManager.authenticate(

	            new UsernamePasswordAuthenticationToken(
	                    request.getEmail(),
	                    request.getPassword()));

	    User user = userRepo.findByEmail(request.getEmail())
	            .orElseThrow(() ->
	                    new RuntimeException("User Not Found"));

	    String token = jwtService.generateToken(user.getEmail());

	    return new AuthResponse(
	            token,
	            user.getRole().name(),
	            user.getFullname(),
	            "Login Successful");
	}

}
