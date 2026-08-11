package com.InsuranceManagement.Services;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.DashboardResponse;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.DocumentRepository;
import com.InsuranceManagement.Repository.PolicyRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

	private final PolicyRepository policyRepository;
	private final CustomerRepository customerRepository;
	private final ClaimRepository claimRepository;
	private final DocumentRepository documentRepository;

	public DashboardServiceImpl(PolicyRepository policyRepository, CustomerRepository customerRepository,
			ClaimRepository claimRepository, DocumentRepository documentRepository) {
		this.policyRepository = policyRepository;
		this.claimRepository = claimRepository;
		this.customerRepository = customerRepository;
		this.documentRepository = documentRepository;
	}

	@Override
	public DashboardResponse getDashboard(String email, String role) {

		DashboardResponse response = new DashboardResponse();

		// =========================
		// ADMIN
		// =========================

		if ("ADMIN".equals(role)) {

			response.setCustomerCount(customerRepository.count());

			response.setPolicyCount(policyRepository.count());

			response.setClaimCount(claimRepository.count());

			response.setTotalPremium(policyRepository.getTotalPremium());

			response.setDocumentCount(documentRepository.count());

			return response;
		}

		// =========================
		// CUSTOMER
		// =========================

		if ("CUSTOMER".equals(role)) {

			Customer customer = customerRepository.findByUserEmail(email)
					.orElseThrow(() -> new RuntimeException("Customer profile not found"));

			Long customerId = customer.getId();

			response.setCustomerCount(0L);

			response.setPolicyCount(policyRepository.countByCustomerId(customerId));

			response.setClaimCount(claimRepository.countByPolicyCustomerId(customerId));

			response.setTotalPremium(policyRepository.getTotalPremiumByCustomerId(customerId));

			response.setDocumentCount(documentRepository.countByCustomerId(customerId));

			return response;
		}

		// =========================
		// AGENT
		// =========================

		if ("AGENT".equals(role)) {

			response.setCustomerCount(customerRepository.count());

			response.setPolicyCount(policyRepository.count());

			response.setClaimCount(claimRepository.count());

			response.setTotalPremium(policyRepository.getTotalPremium());

			response.setDocumentCount(documentRepository.count());

			return response;
		}

		throw new RuntimeException("Unsupported dashboard role");
	}
}
