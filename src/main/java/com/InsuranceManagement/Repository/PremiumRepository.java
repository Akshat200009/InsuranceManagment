package com.InsuranceManagement.Repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.Entities.Premium;

public interface PremiumRepository extends  JpaRepository<Premium, Long> {
	
	   List<Premium> findByPolicyId(Long policyId);

	   List<Premium> findByPaymentStatus(String paymentStatus);
	   
	   List<Premium> findByPaymentDateBeforeAndPaymentStatus(
		        LocalDate paymentDate,
		        String paymentStatus);

	
}
