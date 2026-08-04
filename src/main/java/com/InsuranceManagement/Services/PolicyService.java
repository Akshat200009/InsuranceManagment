package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.PolicyRenewRequest;
import com.InsuranceManagement.DTO.PolicyRequest;
import com.InsuranceManagement.DTO.PolicyResponse;
import com.InsuranceManagement.Entities.PolicyStatus;

public interface PolicyService {

    PolicyResponse createPolicy(PolicyRequest request);
    
    List<PolicyResponse> getActivePolicies();
    
    PolicyResponse renewPolicy(Long policyId, PolicyRenewRequest request);
    
    PolicyResponse cancelPolicy(Long PolicyId);
    
    List<PolicyResponse> getExpiredPolicies();
    
    List<PolicyResponse> getPoliciesByStatus(PolicyStatus status);

}