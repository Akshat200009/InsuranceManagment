package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.CustomerRequest;
import com.InsuranceManagement.DTO.CustomerResponse;

public interface CustomerService {

	CustomerResponse addCustomer(CustomerRequest request);

	List<CustomerResponse> getAllCustomers();

	CustomerResponse getCustomerById(Long id);

	CustomerResponse updateCustomer(Long id, CustomerRequest request);

	void deleteCustomer(Long id);

	List<CustomerResponse> searchCustomer(String name);

	CustomerResponse CustomerHistory(Long id);

}