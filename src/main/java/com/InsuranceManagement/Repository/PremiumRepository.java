package com.InsuranceManagement.Repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.Entities.PaymentStatus;
import com.InsuranceManagement.Entities.Premium;

public interface PremiumRepository extends  JpaRepository<Premium, Long> {
	
	   List<Premium> findByPolicyId(Long policyId);

	   List<Premium> findByPaymentStatus(PaymentStatus paymentStatus);
	   
	   List<Premium> findByPaymentDateBeforeAndPaymentStatus(
		        LocalDate paymentDate,
		        PaymentStatus paymentStatus);
	   
	   @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Premium p")
	   Double getTotalPremiumCollection();

	
}
