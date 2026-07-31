package com.InsuranceManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Customer;
import java.util.List;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	Optional<Customer>findByEmail(String email); 
	
	List<Customer> findByNameContainingIgnoreCase(String name);

}
