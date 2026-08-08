package com.InsuranceManagement.Services;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.DashboardResponse;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

	private final PolicyRepository policyRepository;
	private final CustomerRepository customerRepository;
	private final ClaimRepository claimRepository;

	public DashboardServiceImpl(PolicyRepository policyRepository, CustomerRepository customerRepository,
			ClaimRepository claimRepository) {
		this.policyRepository = policyRepository;
		this.claimRepository = claimRepository;
		this.customerRepository = customerRepository;
	}

	@Override
	public DashboardResponse getDashboard() {
		DashboardResponse dashboardResponse = new DashboardResponse();

		dashboardResponse.setCustomerCount(customerRepository.count());
		dashboardResponse.setClaimCount(claimRepository.count());
		dashboardResponse.setPolicyCount(policyRepository.count());
		dashboardResponse.setTotalPremium(policyRepository.getTotalPremium());

		return dashboardResponse;
	}

}
