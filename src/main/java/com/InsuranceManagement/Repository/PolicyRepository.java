package com.InsuranceManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Policy;
import java.time.LocalDate;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
 
	List<Policy> findByStatus(String status);
	
	List<Policy> findByEndDateBefore(LocalDate Date);
	
}
