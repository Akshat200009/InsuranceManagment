package com.InsuranceManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.User;

import java.util.List;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	Optional<Customer>findByEmail(String email); 
	Optional<Customer>findByUser(User user);
	Optional<Customer> findByUserId(Long userId);
	Optional<Customer> findByUserEmail(String email);
	
	List<Customer> findByNameContainingIgnoreCase(String name);
	
	List<Customer> findByEmailContainingIgnoreCase(String email);
	
	
	
	

}
