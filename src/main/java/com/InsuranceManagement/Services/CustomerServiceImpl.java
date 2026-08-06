package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.InsuranceManagement.DTO.CustomerRequest;
import com.InsuranceManagement.DTO.CustomerResponse;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;
import com.InsuranceManagement.Services.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PolicyRepository policyRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository,PolicyRepository policyRepository) {
        this.customerRepository = customerRepository;
        this.policyRepository=policyRepository;
    }
    
    private Customer convertToEntity(CustomerRequest request) {

        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setDob(request.getDob());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setEmail(request.getEmail());

        return customer;
    }
    
    private CustomerResponse convertToResponse(Customer customer) {

        CustomerResponse response = new CustomerResponse();

        response.setId(customer.getId());
        response.setName(customer.getName());
        response.setDob(customer.getDob());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setEmail(customer.getEmail());

        return response;
    }
    
    

	@Override
	public CustomerResponse addCustomer(CustomerRequest request) {
		 Customer cust = convertToEntity(request);
		 	Customer savedcust = customerRepository.save(cust);
		 	
		return convertToResponse(savedcust);
	}

	@Override
	public List<CustomerResponse> getAllCustomers() {
		List<Customer> customers = customerRepository.findAll(Sort.by("id"));
		return customers.stream().map(this::convertToResponse).toList();
	}

	@Override
	public CustomerResponse getCustomerById(Long id) { 
	   Customer customer = customerRepository.findById(id)
			   .orElseThrow(()-> new RuntimeException("Customer not found wih ID: "+id));
		return convertToResponse(customer);
	}

	@Override
	public CustomerResponse updateCustomer(Long id, CustomerRequest request) {
		 Customer customer = customerRepository.findById(id)
				 .orElseThrow(()-> new RuntimeException("Customer not found with id : "+ id));
		 
		 customer.setName(request.getName());
		 customer.setEmail(request.getEmail());
		 customer.setPhone(request.getPhone());
		 customer.setDob(request.getDob());
		 customer.setAddress(request.getAddress());
		 
		 Customer updatedCustomer = customerRepository.save(customer);
		return convertToResponse(updatedCustomer);
	}

	@Override
	public void deleteCustomer(Long id) {

	    Customer customer = customerRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Customer not found"));

	    if (policyRepository.existsByCustomerId(id)) {

	        throw new RuntimeException(
	                "Customer has active policies. Delete the policies first."
	        );

	    }

	    customerRepository.delete(customer);

	}

	@Override
	public List<CustomerResponse> searchCustomer(@RequestParam String name) {
		
		List<Customer> customers = customerRepository.findByNameContainingIgnoreCase(name);
		
      return customers.stream().map(this::convertToResponse).toList();
	}

	@Override
	public CustomerResponse CustomerHistory(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CustomerResponse> searchCustomerByName(String name) {

	    List<Customer> customers =
	            customerRepository.findByNameContainingIgnoreCase(name);

	    return customers.stream()
	            .map(this::convertToResponse)
	            .toList();
	}

	@Override
	public List<CustomerResponse> searchCustomerByEmail(String email) {

	    List<Customer> customers =
	            customerRepository.findByEmailContainingIgnoreCase(email);

	    return customers.stream()
	            .map(this::convertToResponse)
	            .toList();
	}

	@Override
	public Page<CustomerResponse> getCustomersWithPagination(int page, int size) {

	    Pageable pageable = PageRequest.of(page, size);

	    Page<Customer> customers =
	            customerRepository.findAll(pageable);

	    return customers.map(this::convertToResponse);
	}
}