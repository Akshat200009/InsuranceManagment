package com.InsuranceManagement.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Role;
import com.InsuranceManagement.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	boolean existsByPhone(String phone);
	
	 List<User> findByRole(Role role);
	 
	 Optional<User> findByIdAndRole(Long id, Role role);

}
