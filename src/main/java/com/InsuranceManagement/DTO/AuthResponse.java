package com.InsuranceManagement.DTO;

public class AuthResponse {

	private String token;
	private String role;
	private String fullName;
	private String message;
	private Long customerId;

	
	public AuthResponse(
	        String token,
	        String role,
	        String fullName,
	        Long customerId,
	        String message) {

	    this.token = token;
	    this.role = role;
	    this.fullName = fullName;
	    this.customerId = customerId;
	    this.message = message;
	}
	
	//Default Constructor
	public AuthResponse()
	{
		
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
