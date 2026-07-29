package com.InsuranceManagement.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public class LoginRequest {
	
	@Email(message = "Invalid Email")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
    

    public LoginRequest(String email,
		 String password) {
		super();
		this.email = email;
		this.password = password;
	}
    public LoginRequest()
    {
    	
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

}
