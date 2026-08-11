package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.CustomerRequest;
import com.InsuranceManagement.DTO.CustomerResponse;
import com.InsuranceManagement.Services.CustomerService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PostMapping
    public ResponseEntity<CustomerResponse> addCustomer(@RequestBody CustomerRequest request) {

        CustomerResponse response = customerService.addCustomer(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers()
    {
    	List<CustomerResponse> customers = customerService.getAllCustomers();
		return ResponseEntity.ok(customers);
    	
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerbyId(@PathVariable  Long id )
    {
    	CustomerResponse response = customerService.getCustomerById(id);
    	return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updatedCustomer(@PathVariable Long id , @RequestBody CustomerRequest request){
    	CustomerResponse customer = customerService.updateCustomer(id, request);
    	return ResponseEntity.ok(customer);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id)
    {
    	customerService.deleteCustomer(id);
    	
    	return ResponseEntity.ok("Customer Deleted Successfully");
    }
    @GetMapping("/search")
    public ResponseEntity<List<CustomerResponse>> searchCustomer (String name)
    {
    	List<CustomerResponse> customer=customerService.searchCustomer(name);
    	
    	return ResponseEntity.ok(customer);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/search/name")
    public ResponseEntity<List<CustomerResponse>> searchCustomerByName(
            @RequestParam String name) 
    {

        List<CustomerResponse> response =
                customerService.searchCustomerByName(name);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/search/email")
    public ResponseEntity<List<CustomerResponse>> searchCustomerByEmail(
            @RequestParam String email)
    {

        List<CustomerResponse> response =
                customerService.searchCustomerByEmail(email);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/pagination")
    public ResponseEntity<Page<CustomerResponse>> getCustomersWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        Page<CustomerResponse> response =
                customerService.getCustomersWithPagination(page, size);

        return ResponseEntity.ok(response);
    }
    

}