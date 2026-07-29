package com.InsuranceManagement.Services;

import com.InsuranceManagement.DTO.AuthResponse;
import com.InsuranceManagement.DTO.LoginRequest;
import com.InsuranceManagement.DTO.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
