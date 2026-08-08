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
	@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
	@PostMapping
	public ResponseEntity<ClaimResponse> submitClaim(@Valid @RequestBody ClaimRequest request) {

		ClaimResponse response = claimService.submitClaim(request);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/pending")
	public ResponseEntity<List<ClaimResponse>> getPendindClaims() {
		
		List<ClaimResponse> list = claimService.getPendingClaims();
		return ResponseEntity.ok(list);
	}
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{ClaimId}/approve")
    public ResponseEntity<ClaimResponse> ApprovedClaims(@PathVariable Long ClaimId)
    {
    	ClaimResponse status = claimService.approveClaim(ClaimId);
    	
    	return ResponseEntity.ok(status);
    }
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{ClaimId}/reject")
    public ResponseEntity<ClaimResponse> RejectedClaims(@PathVariable Long ClaimId)
    {
    	ClaimResponse status = claimService.rejectClaim(ClaimId);
    	
    	return ResponseEntity.ok(status);
    }
	@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PutMapping("/history/{policyId}")
    public ResponseEntity<List<ClaimResponse>> getAllClaims(@PathVariable Long policyId)
    {
    	List<ClaimResponse> list = claimService.getClaimHistory(policyId);
    	return ResponseEntity.ok(list);
    }
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
	@GetMapping("/status")
	public ResponseEntity<List<ClaimResponse>> getClaimsByStatus(
	        @RequestParam ClaimStatus status) {

	    return ResponseEntity.ok(
	            claimService.getClaimsByStatus(status)
	    );
	}
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
	@GetMapping("/{claimId}")
	public ResponseEntity<ClaimResponse> getClaimById(
	        @PathVariable Long claimId) {

	    return ResponseEntity.ok(
	            claimService.getClaimById(claimId)
	    );
	}
	@PreAuthorize("hasAnyRole('ADMIN','AGENT')")
	@GetMapping("/customer/{customerId}")
	public ResponseEntity<List<ClaimResponse>> getCustomerClaims(
	        @PathVariable Long customerId) {

	    return ResponseEntity.ok(
	            claimService.getCustomerClaims(customerId)
	    );
	}

}