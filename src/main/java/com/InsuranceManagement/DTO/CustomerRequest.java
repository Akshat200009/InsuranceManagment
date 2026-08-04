package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CustomerRequest {
	@NotBlank(message="Customer name is required")
    private String name;
	@NotNull(message="Date of birth is required")
    private LocalDate dob;
	@NotBlank(message="Phone number is required")
	@Pattern(regexp="^[0-9]{10}$", message="Phone number must be 10 digits")
    private String phone;
	@NotBlank(message="Address is required")
    private String address;
	@NotBlank(message="Email is required")
	@Email(message="Invalid email")
    private String email;

    public CustomerRequest() {
    }

    public CustomerRequest(String name, LocalDate dob, String phone, String address, String email) {
        this.name = name;
        this.dob = dob;
        this.phone = phone;
        this.address = address;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}