package com.InsuranceManagement.Services;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.ClaimStatisticsResponse;
import com.InsuranceManagement.DTO.ReportResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimStatus;
import com.InsuranceManagement.Entities.PolicyStatus;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;
import com.InsuranceManagement.Repository.PremiumRepository;

@Service
public class ReportServiceImpl implements ReportService {

	private final PolicyRepository policyRepository;
	private final ClaimRepository claimRepository;
	private final PremiumRepository premiumRepository;
	private final CustomerRepository customerRepository;

	public ReportServiceImpl(PolicyRepository policyRepository, ClaimRepository claimRepository,PremiumRepository premiumRepository, CustomerRepository customerRepository) {
		this.policyRepository = policyRepository;
		this.claimRepository = claimRepository;
		this.premiumRepository=premiumRepository;
		 this.customerRepository = customerRepository;
	}

	@Override
	public ReportResponse getActivePoliciesReport() {

		Long activePolicies = policyRepository.countByStatus(PolicyStatus.ACTIVE);

		return new ReportResponse("Active Policies", activePolicies);
	}

	@Override
	public ReportResponse getExpiredPoliciesReport() {
		Long expiredPolicies = policyRepository.countByStatus(PolicyStatus.EXPIRED);
		return new ReportResponse("Expired Policies", expiredPolicies);
	}

	@Override
	public ClaimStatisticsResponse getClaimStatistics() {
		Long claimstatus = claimRepository.countByStatus(ClaimStatus.APPROVED);
		Long claimstatus1 = claimRepository.countByStatus(ClaimStatus.PENDING);
		Long claimstatus2 = claimRepository.countByStatus(ClaimStatus.REJECTED);
		return new ClaimStatisticsResponse(
				claimstatus,
				claimstatus1,
				claimstatus2
	);
}

	@Override
	public ReportResponse getPremiumCollectionReport() {

	    Double totalCollection =
	            premiumRepository.getTotalPremiumCollection();

	    return new ReportResponse(
	            "Premium Collection",
	            totalCollection.longValue()
	    );
	}

	@Override
	public ReportResponse getCustomerGrowthReport() {

	    Long totalCustomers = customerRepository.count();

	    return new ReportResponse(
	            "Customer Growth",
	            totalCustomers
	    );
	}

	@Override
	public ReportResponse getMonthlyBusinessReport() {

	    LocalDate today = LocalDate.now();

	    Long monthlyPolicies =
	            policyRepository.countPoliciesByMonth(
	                    today.getMonthValue(),
	                    today.getYear());

	    return new ReportResponse(
	            "Monthly Business Report",
	            monthlyPolicies
	    );
	}

}