package com.InsuranceManagement.DTO;

public class AuthResponse {

	private String token;
	private String message;

	public AuthResponse(String token, String message) {
		super();
		this.token = token;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
