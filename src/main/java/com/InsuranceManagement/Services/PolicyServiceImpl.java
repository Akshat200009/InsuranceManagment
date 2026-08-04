package com.InsuranceManagement.Services;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.PolicyRenewRequest;
import com.InsuranceManagement.DTO.PolicyRequest;
import com.InsuranceManagement.DTO.PolicyResponse;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Entities.PolicyStatus;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;

@Service
public class PolicyServiceImpl implements PolicyService {

	private final PolicyRepository policyRepository;
	private final CustomerRepository customerRepository;
	
	 public PolicyServiceImpl(PolicyRepository policyRepository, CustomerRepository customerRepository)
	 {
		this.policyRepository=policyRepository;
		this.customerRepository=customerRepository;
		
	 }
	 
	 private PolicyResponse convertToResponse(Policy policy) {

		    PolicyResponse response = new PolicyResponse();

		    response.setId(policy.getId());
		    response.setCustomerId(policy.getCustomer().getId());
		    response.setCustomerName(policy.getCustomer().getName());
		    response.setPolicyType(policy.getPolicyType());
		    response.setPolicyNumber(policy.getPolicyNumber());
		    response.setPremiumAmount(policy.getPremiumAmount());
		    response.setStartDate(policy.getStartDate());
		    response.setEndDate(policy.getEndDate());
		    response.setStatus(policy.getStatus());

		    return response;
		}
	 
	@Override
	public PolicyResponse createPolicy(PolicyRequest request) {
		
		   Customer customer = customerRepository.findById(request.getCustomerId())
				   .orElseThrow(()-> new RuntimeException("Customer Not Found of id"));
		   
		   Policy policy = new Policy();
		   
		   policy.setCustomer(customer);
		   policy.setPolicyNumber(request.getPolicyNumber());
		   policy.setPolicyType(request.getPolicyType());
		   policy.setPremiumAmount(request.getPremiumAmount());
		   policy.setStartDate(request.getStartDate());
		   policy.setEndDate(request.getEndDate());
		   policy.setStatus(request.getStatus());
		   
		    Policy createPolicy = policyRepository.save(policy);
		   
		return convertToResponse(createPolicy);
	}

	@Override
	public List<PolicyResponse> getActivePolicies() {
		List<Policy> policies = policyRepository.findByStatus(PolicyStatus.ACTIVE);
		return policies.stream().map(this::convertToResponse).toList();
		 
	}

	@Override
	public PolicyResponse renewPolicy(Long policyId, PolicyRenewRequest request) {
		 Policy policy = policyRepository.findById(policyId)
				 .orElseThrow(()-> new RuntimeException("Policy Not Found"));
		 
		 policy.setPremiumAmount(request.getPremiumAmount());
		 policy.setStartDate(request.getStartDate());
		 policy.setEndDate(request.getEndDate());
		
		Policy renew = policyRepository.save(policy); 
		
		return convertToResponse(renew);
	}

	@Override
	public PolicyResponse cancelPolicy(Long PolicyId) {
		 Policy policy = policyRepository.findById(PolicyId)
				 .orElseThrow(()-> new RuntimeException("Policy Not Found"));
		 
		 policy.setStatus(PolicyStatus.CANCELLED);
		 
		 Policy cancel = policyRepository.save(policy);
		 
		return convertToResponse(cancel);
	}

	@Override
	public List<PolicyResponse> getExpiredPolicies() {
		
		List<Policy> policy = policyRepository.findByEndDateBefore(LocalDate.now());
		
		return policy.stream().map(this::convertToResponse).toList();
	}

	@Override
	public List<PolicyResponse> getPoliciesByStatus(PolicyStatus status) {

	    List<Policy> policies =
	            policyRepository.findByStatus(status);

	    return policies.stream()
	            .map(this::convertToResponse)
	            .toList();
	}

}
