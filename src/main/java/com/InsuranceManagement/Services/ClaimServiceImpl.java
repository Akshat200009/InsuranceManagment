package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.ClaimRequest;
import com.InsuranceManagement.DTO.ClaimResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimStatus;
import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.PolicyRepository;

@Service
public class ClaimServiceImpl implements ClaimService {

	private final ClaimRepository claimRepository;
	private final PolicyRepository policyRepository;

	public ClaimServiceImpl(ClaimRepository claimRepository, PolicyRepository policyRepository) {

		this.claimRepository = claimRepository;
		this.policyRepository = policyRepository;
	}

	private ClaimResponse convertToResponse(Claim claim) {

		ClaimResponse response = new ClaimResponse();

		response.setId(claim.getId());
		response.setPolicyId(claim.getPolicy().getId());
		response.setPolicyNumber(claim.getPolicy().getPolicyNumber());
		response.setClaimAmount(claim.getClaimAmount());
		response.setReason(claim.getReason());
		response.setStatus(claim.getStatus());
		response.setSubmissionDate(claim.getSubmissionDate());

		return response;
	}

	@Override
	public ClaimResponse submitClaim(ClaimRequest request) {
		Policy policy = policyRepository.findById(request.getPolicyId())
				.orElseThrow(() -> new RuntimeException("Policy not found"));
		Claim claim = new Claim();
		claim.setPolicy(policy);
		claim.setClaimAmount(request.getClaimAmount());
		claim.setReason(request.getReason());
		claim.setSubmissionDate(request.getSubmissionDate());
		claim.setStatus(ClaimStatus.PENDING);
		Claim savedClaim = claimRepository.save(claim);
		return convertToResponse(savedClaim);
	}

	@Override
	public List<ClaimResponse> getPendingClaims() {
		List<Claim> claims = claimRepository.findByStatus(ClaimStatus.PENDING);
		return claims.stream().map(this::convertToResponse).toList();
	}

	@Override
	public ClaimResponse approveClaim(Long claimId) {
		Claim claim = claimRepository.findById(claimId)
				.orElseThrow(() -> new RuntimeException("Claim Not Found"));

		claim.setStatus(ClaimStatus.APPROVED);

		Claim status = claimRepository.save(claim);
		return convertToResponse(status);
	}

	@Override
	public ClaimResponse rejectClaim(Long claimId) {
		Claim claim = claimRepository.findById(claimId)
				.orElseThrow(() -> new RuntimeException("Claim Not Found"));
		
		 claim.setStatus(ClaimStatus.REJECTED);
		 
		 Claim updated = claimRepository.save(claim);
		return convertToResponse(updated);
	}

	@Override
	public List<ClaimResponse> getClaimHistory(Long policyId) {
		
		List<Claim> list = claimRepository.findByPolicyId(policyId);
		
		return  list.stream().map(this::convertToResponse).toList();
		  
	}
	@Override
	public List<ClaimResponse> getClaimsByStatus(ClaimStatus status) {

	    List<Claim> claims =
	            claimRepository.findByStatus(status);

	    return claims.stream()
	            .map(this::convertToResponse)
	            .toList();
	}
	@Override
	public ClaimResponse getClaimById(Long claimId) {

	    Claim claim = claimRepository.findById(claimId)
	            .orElseThrow(() -> new RuntimeException("Claim Not Found"));

	    return convertToResponse(claim);
	}
	@Override
	public List<ClaimResponse> getCustomerClaims(Long customerId) {

	    List<Claim> claims =
	            claimRepository.findByPolicyCustomerId(customerId);

	    return claims.stream()
	            .map(this::convertToResponse)
	            .toList();
	}
}