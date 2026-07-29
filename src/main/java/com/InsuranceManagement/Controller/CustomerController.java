package com.InsuranceManagement.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.CustomerRequest;
import com.InsuranceManagement.DTO.CustomerResponse;
import com.InsuranceManagement.Services.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> addCustomer(@RequestBody CustomerRequest request) {

        CustomerResponse response = customerService.addCustomer(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}