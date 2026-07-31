package com.InsuranceManagement.Controller;

import java.util.List;

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
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers()
    {
    	List<CustomerResponse> customers = customerService.getAllCustomers();
		return ResponseEntity.ok(customers);
    	
    }
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerbyId(@PathVariable  Long id )
    {
    	CustomerResponse response = customerService.getCustomerById(id);
    	return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updatedCustomer(@PathVariable Long id , @RequestBody CustomerRequest request){
    	CustomerResponse customer = customerService.updateCustomer(id, request);
    	return ResponseEntity.ok(customer);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id)
    {
    	customerService.deleteCustomer(id);
    	
    	return ResponseEntity.ok("Customer Deleted Successfully");
    }

}