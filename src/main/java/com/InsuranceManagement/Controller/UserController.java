package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.EmployeeRequest;
import com.InsuranceManagement.DTO.EmployeeResponse;
import com.InsuranceManagement.Services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ===============================
    // ADD EMPLOYEE
    // ===============================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employees")
    public ResponseEntity<EmployeeResponse> addEmployee(
            @Valid @RequestBody EmployeeRequest request) {

        EmployeeResponse response =
                userService.addEmployee(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    // ===============================
    // GET ALL EMPLOYEES
    // ===============================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {

        return ResponseEntity.ok(
                userService.getAllEmployees()
        );
    }

    // ===============================
    // GET EMPLOYEE BY ID
    // ===============================

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getEmployeeById(id)
        );
    }

    // ===============================
    // UPDATE EMPLOYEE
    // ===============================

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {

        return ResponseEntity.ok(
                userService.updateEmployee(id, request)
        );
    }

    // ===============================
    // DELETE EMPLOYEE
    // ===============================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(
            @PathVariable Long id) {

        userService.deleteEmployee(id);

        return ResponseEntity.ok(
                "Employee deleted successfully"
        );
    }
}