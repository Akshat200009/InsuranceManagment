package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.ClaimRequest;
import com.InsuranceManagement.DTO.ClaimResponse;
import com.InsuranceManagement.Entities.ClaimStatus;

public interface ClaimService {

	ClaimResponse submitClaim(ClaimRequest request);
	
	List<ClaimResponse> getPendingClaims();
	
	ClaimResponse approveClaim(Long claimId);

	ClaimResponse rejectClaim(Long claimId);
	 
	List<ClaimResponse> getClaimHistory(Long policyId);
	List<ClaimResponse> getCustomerClaims(Long customerId);
	
	List<ClaimResponse> getClaimsByStatus(ClaimStatus status);
	ClaimResponse getClaimById(Long claimId);
	
	
	
}
