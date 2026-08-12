package com.InsuranceManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimStatus;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByPolicyId(Long policyId);

    List<Claim> findByStatus(ClaimStatus status);
    
    Long countByStatus(ClaimStatus status);
    
    List<Claim> findByPolicyCustomerId(Long customerId);
    
    Long countByPolicyCustomerId(Long customerId);
    
    List<Claim> findByAssignedAgentId(Long agentId);


}
