package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.PolicyRenewRequest;
import com.InsuranceManagement.DTO.PolicyRequest;
import com.InsuranceManagement.DTO.PolicyResponse;
import com.InsuranceManagement.Services.PolicyService;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping
    public ResponseEntity<PolicyResponse> createPolicy(@RequestBody PolicyRequest request) {

        PolicyResponse response = policyService.createPolicy(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<PolicyResponse>> getActivePolicy()
    {
    	List<PolicyResponse> policies = policyService.getActivePolicies();
    	
    	return ResponseEntity.ok(policies);
    }
    @PutMapping("/{Policyid}/renew")
    public ResponseEntity<PolicyResponse> renewPolicy(@PathVariable Long Policyid, 
    		                 @RequestBody PolicyRenewRequest request)
    {
    	PolicyResponse renew = policyService.renewPolicy(Policyid, request);
    	
    	return ResponseEntity.ok(renew);
    }
    @PutMapping("/{PolicyId}/cancel")
    public ResponseEntity<PolicyResponse> cancelPolicy(@PathVariable Long PolicyId)
    {
    	PolicyResponse cancel = policyService.cancelPolicy(PolicyId);
    	
    	return ResponseEntity.ok(cancel);
    }
    @GetMapping("/expired")
    public ResponseEntity<List<PolicyResponse>> expiredPoilcy()
    {
    	List<PolicyResponse> expired = policyService.getExpiredPolicies();
    	
    	return ResponseEntity.ok(expired);
    }
    
    
    
    
}