package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.EmployeeRequest;
import com.InsuranceManagement.DTO.EmployeeResponse;

public interface UserService {

    EmployeeResponse addEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}