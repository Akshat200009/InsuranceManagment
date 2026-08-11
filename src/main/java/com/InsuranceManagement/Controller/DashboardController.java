package com.InsuranceManagement.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.InsuranceManagement.DTO.DashboardResponse;
import com.InsuranceManagement.Services.DashboardService;

@RequestMapping("/api/dashboard")
@RestController
public class DashboardController {

    private final DashboardService dashService;

    public DashboardController(DashboardService dashService) {
        this.dashService = dashService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(
            Authentication authentication) {

        // Logged-in user's email
        String email = authentication.getName();

        // Logged-in user's role
        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(authority -> authority.getAuthority())
                .orElse("");

        // Remove ROLE_ prefix if present
        role = role.replace("ROLE_", "");

        DashboardResponse response =
                dashService.getDashboard(email, role);

        return ResponseEntity.ok(response);
    }
}