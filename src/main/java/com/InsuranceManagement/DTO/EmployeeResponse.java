package com.InsuranceManagement.DTO;

import com.InsuranceManagement.Entities.Role;

public class EmployeeResponse {

    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private Role role;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long id, String fullname,
                            String email, String phone,
                            Role role) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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