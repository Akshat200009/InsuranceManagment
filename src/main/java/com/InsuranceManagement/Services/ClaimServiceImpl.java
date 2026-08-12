package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.ClaimRequest;
import com.InsuranceManagement.DTO.ClaimResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimStatus;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Entities.Role;
import com.InsuranceManagement.Entities.User;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;
import com.InsuranceManagement.Repository.UserRepository;

@Service
public class ClaimServiceImpl implements ClaimService {

	private final ClaimRepository claimRepository;
	private final PolicyRepository policyRepository;
	private final UserRepository userRepository;
	private final CustomerRepository customerRepository;

	public ClaimServiceImpl(ClaimRepository claimRepository, PolicyRepository policyRepository
			    ,UserRepository userRepository,CustomerRepository customerRepository) {

		this.claimRepository = claimRepository;
		this.policyRepository = policyRepository;
		this.customerRepository=customerRepository;
		this.userRepository=userRepository;
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
		if (claim.getAssignedAgent() != null) {

		    response.setAssignedAgentId(
		            claim.getAssignedAgent().getId()
		    );

		    response.setAssignedAgentName(
		            claim.getAssignedAgent().getFullname()
		    );
		}

		return response;
	}
	
	private Customer getLoggedInCustomer() {

	    String email = SecurityContextHolder
	            .getContext()
	            .getAuthentication()
	            .getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    return customerRepository.findByUser(user)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));
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

	@Override
	public List<ClaimResponse> getMyClaims() {

	    Customer customer = getLoggedInCustomer();

	    List<Claim> claims =
	            claimRepository.findByPolicyCustomerId(customer.getId());

	    return claims.stream()
	            .map(this::convertToResponse)
	            .toList();
	}

	@Override
	public ClaimResponse getMyClaimById(Long claimId) {

	    Customer customer = getLoggedInCustomer();

	    Claim claim = claimRepository.findById(claimId)
	            .orElseThrow(() ->
	                    new RuntimeException("Claim Not Found"));

	    Long claimCustomerId =
	            claim.getPolicy()
	                    .getCustomer()
	                    .getId();

	    if (!claimCustomerId.equals(customer.getId())) {

	        throw new RuntimeException("Access Denied");

	    }

	    return convertToResponse(claim);
	}

	@Override
	public ClaimResponse assignClaim(Long claimId, Long agentId) {

	    Claim claim = claimRepository.findById(claimId)
	            .orElseThrow(() ->
	                    new RuntimeException("Claim Not Found"));

	    if (claim.getStatus() != ClaimStatus.PENDING) {

	        throw new RuntimeException(
	                "Only pending claims can be assigned"
	        );
	    }

	    User agent = userRepository
	            .findByIdAndRole(agentId, Role.AGENT)
	            .orElseThrow(() ->
	                    new RuntimeException("Agent not found"));

	    claim.setAssignedAgent(agent);

	    Claim updatedClaim =
	            claimRepository.save(claim);

	    return convertToResponse(updatedClaim);
	}

	@Override
	public List<ClaimResponse> getMyAssignedClaims() {

	    String email = SecurityContextHolder
	            .getContext()
	            .getAuthentication()
	            .getName();

	    User agent = userRepository
	            .findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("User not found"));

	    List<Claim> claims =
	            claimRepository.findByAssignedAgentId(agent.getId());

	    return claims.stream()
	            .map(this::convertToResponse)
	            .toList();
	}
}