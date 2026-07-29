package com.InsuranceManagement.DTO;

import com.InsuranceManagement.Entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;


	@NotBlank(message = "Phone number is required")
    private String phone;

    private Role role;

    public RegisterRequest( String fullName,
    		String email,  String password,
    		String phone, Role role) {
    	super();
    	this.fullName = fullName;
    	this.email = email;
    	this.password = password;
    	this.phone = phone;
    	this.role = role;
    }
    //Default Constructor
    public RegisterRequest()
    {
    	
    }
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}