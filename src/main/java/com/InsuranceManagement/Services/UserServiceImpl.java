package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.EmployeeRequest;
import com.InsuranceManagement.DTO.EmployeeResponse;
import com.InsuranceManagement.Entities.Role;
import com.InsuranceManagement.Entities.User;
import com.InsuranceManagement.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	public final UserRepository userRepository;
	public final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	private EmployeeResponse convertToResponse(User user) {
		EmployeeResponse response = new EmployeeResponse();

		response.setId(user.getId());
		response.setFullname(user.getFullname());
		response.setEmail(user.getEmail());
		response.setPhone(user.getPhone());
		response.setRole(user.getRole());

		return response;

	}

	@Override
	public EmployeeResponse addEmployee(EmployeeRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		if (userRepository.existsByPhone(request.getPhone())) {
			throw new RuntimeException("Phone already exists");
		}

		User user = new User();

		user.setFullname(request.getFullname());
		user.setEmail(request.getEmail());
		user.setPhone(request.getPhone());

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		// Employee = AGENT
		user.setRole(Role.AGENT);

		User savedUser = userRepository.save(user);

		return convertToResponse(savedUser);
	}

	@Override
	public List<EmployeeResponse> getAllEmployees() {

		return userRepository.findByRole(Role.AGENT).stream().map(this::convertToResponse).toList();
	}

	@Override
	public EmployeeResponse getEmployeeById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee Not Found"));
		if (user.getRole() != Role.AGENT) {
			throw new RuntimeException("Employee Not Found");
		}
		return convertToResponse(user);
	}

	@Override
	public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee Not Found"));
		if (user.getRole() != Role.AGENT) {
			throw new RuntimeException("Employee Not Found");
		}
//		if (user.getEmail().equals(request.getEmail())) {
//			throw new RuntimeException("Email Already Exists");
//		}
//		if (user.getPhone().equals(request.getPhone())) {
//			throw new RuntimeException("Phone Number Already Exists");
//		}

		user.setFullname(request.getFullname());
		user.setPhone(request.getPhone());
		user.setEmail(request.getEmail());

		if (request.getPassword() != null && !request.getPassword().isBlank()) {
			passwordEncoder.encode(request.getPassword());
		}
		user.setRole(Role.AGENT);
		User updatedUser = userRepository.save(user);

		return convertToResponse(updatedUser);
	}

	@Override
	public void deleteEmployee(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee Not Found"));
		if (user.getRole() != Role.AGENT) {
			throw new RuntimeException("Employee Not Found");
		}
		userRepository.delete(user);
	}

}
