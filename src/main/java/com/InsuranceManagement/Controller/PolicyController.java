package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.PolicyRenewRequest;
import com.InsuranceManagement.DTO.PolicyRequest;
import com.InsuranceManagement.DTO.PolicyResponse;
import com.InsuranceManagement.Entities.PolicyStatus;
import com.InsuranceManagement.Services.PolicyService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PostMapping
    public ResponseEntity<PolicyResponse> createPolicy(@RequestBody PolicyRequest request) {

        PolicyResponse response = policyService.createPolicy(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/{policyId}")
    public ResponseEntity<PolicyResponse> getPolicyById(
            @PathVariable Long policyId) {

        PolicyResponse response =
                policyService.getPolicyById(policyId);

        return ResponseEntity.ok(response);
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    public ResponseEntity<List<PolicyResponse>> getAllPolicies() {

        List<PolicyResponse> policies = policyService.getAllPolicies();

        return ResponseEntity.ok(policies);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/active")
    public ResponseEntity<List<PolicyResponse>> getActivePolicy()
    {
    	List<PolicyResponse> policies = policyService.getActivePolicies();
    	
    	return ResponseEntity.ok(policies);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{Policyid}/renew")
    public ResponseEntity<PolicyResponse> renewPolicy(@PathVariable Long Policyid, 
    		                 @RequestBody PolicyRenewRequest request)
    {
    	PolicyResponse renew = policyService.renewPolicy(Policyid, request);
    	
    	return ResponseEntity.ok(renew);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{PolicyId}/cancel")
    public ResponseEntity<PolicyResponse> cancelPolicy(@PathVariable Long PolicyId)
    {
    	PolicyResponse cancel = policyService.cancelPolicy(PolicyId);
    	
    	return ResponseEntity.ok(cancel);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/expired")
    public ResponseEntity<List<PolicyResponse>> expiredPoilcy()
    {
    	List<PolicyResponse> expired = policyService.getExpiredPolicies();
    	
    	return ResponseEntity.ok(expired);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/status")
    public ResponseEntity<List<PolicyResponse>> getPolicesByStatus(@RequestParam PolicyStatus status)
    {
    	List<PolicyResponse> list = policyService.getPoliciesByStatus(status);
    	
    	return ResponseEntity.ok(list);
    	
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/expiring")
    public ResponseEntity<List<PolicyResponse>> getExpiringPolicies() {

        return ResponseEntity.ok(
                policyService.getExpiringPolicies()
        );

    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PolicyResponse>> getPoliciesByCustomer(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                policyService.getPoliciesByCustomer(customerId)
        );
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<List<PolicyResponse>> getMyPolicies() {

        return ResponseEntity.ok(policyService.getMyPolicies());
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my/active")
    public ResponseEntity<List<PolicyResponse>> getMyActivePolicies() {

        return ResponseEntity.ok(
                policyService.getMyActivePolicies()
        );
    }

    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my/{policyId}")
    public ResponseEntity<PolicyResponse> getMyPolicy(
            @PathVariable Long policyId) {

        return ResponseEntity.ok(
                policyService.getMyPolicy(policyId)
        );
    }
    
}