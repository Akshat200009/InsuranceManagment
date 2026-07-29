package com.InsuranceManagement.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.CustomerRequest;
import com.InsuranceManagement.DTO.CustomerResponse;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Services.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomerResponse getCustomerById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomerResponse updateCustomer(Long id, CustomerRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteCustomer(Long id) {
		// TODO Auto-generated method stub
		
	}
}