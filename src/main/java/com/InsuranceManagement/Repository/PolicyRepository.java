package com.InsuranceManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Entities.PolicyStatus;

import java.time.LocalDate;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
 
	List<Policy> findByStatus(PolicyStatus status);
	
	List<Policy> findByEndDateBefore(LocalDate Date);
	
	List<Policy> findByCustomerId(Long customerId);
	
	Long countByStatus(PolicyStatus status);
	
	boolean existsByPolicyNumber(String policyNumber);
	
	boolean existsByCustomerId(Long customerId);
	
	@Query("""
			SELECT COUNT(p)
			FROM Policy p
			WHERE MONTH(p.startDate) = :month
			AND YEAR(p.startDate) = :year
			""")
			Long countPoliciesByMonth(int month, int year);
	
	List<Policy> findByEndDateBetweenAndStatus(
	        LocalDate startDate,
	        LocalDate endDate,
	        PolicyStatus status
	);
	
	@Query("""
		       SELECT COALESCE(SUM(p.premiumAmount),0)
		       FROM Policy p
		       """)
		Double getTotalPremium();
	
}
