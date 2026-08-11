package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.ClaimRequest;
import com.InsuranceManagement.DTO.ClaimResponse;
import com.InsuranceManagement.Entities.ClaimStatus;
import com.InsuranceManagement.Services.ClaimService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }


    // =====================================================
    // CUSTOMER + ADMIN
    // =====================================================

    // Submit Claim
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping
    public ResponseEntity<ClaimResponse> submitClaim(
            @Valid @RequestBody ClaimRequest request) {

        ClaimResponse response =
                claimService.submitClaim(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // CUSTOMER
    // =====================================================

    // Get Logged-in Customer Claims
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<List<ClaimResponse>> getMyClaims() {

        return ResponseEntity.ok(
                claimService.getMyClaims()
        );
    }


    // Get Logged-in Customer Claim By ID
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my/{claimId}")
    public ResponseEntity<ClaimResponse> getMyClaimById(
            @PathVariable Long claimId) {

        return ResponseEntity.ok(
                claimService.getMyClaimById(claimId)
        );
    }


    // =====================================================
    // ADMIN + AGENT
    // =====================================================

    // Pending Claims
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/pending")
    public ResponseEntity<List<ClaimResponse>> getPendingClaims() {

        List<ClaimResponse> list =
                claimService.getPendingClaims();

        return ResponseEntity.ok(list);
    }


    // Approve Claim
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{claimId}/approve")
    public ResponseEntity<ClaimResponse> approveClaim(
            @PathVariable Long claimId) {

        ClaimResponse status =
                claimService.approveClaim(claimId);

        return ResponseEntity.ok(status);
    }


    // Reject Claim
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{claimId}/reject")
    public ResponseEntity<ClaimResponse> rejectClaim(
            @PathVariable Long claimId) {

        ClaimResponse status =
                claimService.rejectClaim(claimId);

        return ResponseEntity.ok(status);
    }


    // Claim History By Policy
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PutMapping("/history/{policyId}")
    public ResponseEntity<List<ClaimResponse>> getAllClaims(
            @PathVariable Long policyId) {

        List<ClaimResponse> list =
                claimService.getClaimHistory(policyId);

        return ResponseEntity.ok(list);
    }


    // Filter Claims By Status
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/status")
    public ResponseEntity<List<ClaimResponse>> getClaimsByStatus(
            @RequestParam ClaimStatus status) {

        return ResponseEntity.ok(
                claimService.getClaimsByStatus(status)
        );
    }


    // Get Claim By ID - Admin / Agent
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/{claimId:\\d+}")
    public ResponseEntity<ClaimResponse> getClaimById(
            @PathVariable Long claimId) {

        return ResponseEntity.ok(
                claimService.getClaimById(claimId)
        );
    }


    // Get Specific Customer Claims - Admin / Agent
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ClaimResponse>> getCustomerClaims(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                claimService.getCustomerClaims(customerId)
        );
    }

}