package com.InsuranceManagement.Services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.DTO.PremiumStatisticsResponse;
import com.InsuranceManagement.Entities.PaymentStatus;
import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Entities.Premium;
import com.InsuranceManagement.Repository.PolicyRepository;
import com.InsuranceManagement.Repository.PremiumRepository;

@Service
public class PremiumServiceImpl implements PremiumService {

	private final PremiumRepository premiumRepository;
	private final PolicyRepository policyRepository;

	public PremiumServiceImpl(PremiumRepository premiumRepository, PolicyRepository policyRepository) {

		this.premiumRepository = premiumRepository;
		this.policyRepository = policyRepository;
	}

	private PremiumResponse convertToResponse(Premium premium) {

		PremiumResponse response = new PremiumResponse();

		response.setId(premium.getId());
		response.setPolicyId(premium.getPolicy().getId());
		response.setPolicyNumber(premium.getPolicy().getPolicyNumber());
		response.setAmount(premium.getAmount());
		response.setPaymentDate(premium.getPaymentDate());
		response.setPaymentStatus(premium.getPaymentStatus());

		return response;
	}

	@Override
	public PremiumResponse recordPremiumPayment(PremiumRequest request) {

		Policy policy = policyRepository.findById(request.getPolicyId())
				.orElseThrow(() -> new RuntimeException("Policy not found"));

		Premium premium = new Premium();

		premium.setPolicy(policy);
		premium.setAmount(request.getAmount());
		premium.setPaymentDate(request.getPaymentDate());
		premium.setPaymentStatus(request.getPaymentStatus());

		Premium savePremium = premiumRepository.save(premium);

		return convertToResponse(savePremium);
	}

	@Override
	public List<PremiumResponse> getPaymentStatus(PaymentStatus paymentStatus) {

		List<Premium> status = premiumRepository.findByPaymentStatus(paymentStatus);

		return status.stream().map(this::convertToResponse).toList();
	}

	@Override
	public List<PremiumResponse> getDuePremiums() {
		List<Premium> premiums = premiumRepository.findByPaymentDateBeforeAndPaymentStatus(LocalDate.now(),
				PaymentStatus.PENDING);
		return premiums.stream().map(this::convertToResponse).toList();
	}

	@Override
	public List<PremiumResponse> getPaymentHistory(Long policyId) {

		List<Premium> premiums = premiumRepository.findByPolicyId(policyId);
		return premiums.stream().map(this::convertToResponse).toList();
	}

	@Override
	public List<PremiumResponse> getOverduePremiums() {

		List<Premium> premiums = premiumRepository.findByPaymentDateBeforeAndPaymentStatus(LocalDate.now(),
				PaymentStatus.PENDING);
		return premiums.stream().map(this::convertToResponse).toList();
	}

	@Override
	public List<PremiumResponse> getAllPremiums() {

		List<Premium> premiums = premiumRepository.findAll();

		return premiums.stream().map(this::convertToResponse).toList();
	}

	@Override
	public PremiumResponse getPremiumById(Long id) {

		Premium premium = premiumRepository.findById(id).orElseThrow(() -> new RuntimeException("Premium not found"));

		return convertToResponse(premium);
	}

	@Override
	public PremiumStatisticsResponse getPremiumStatistics() {

		PremiumStatisticsResponse response = new PremiumStatisticsResponse();

		response.setPaidPremiums(

				premiumRepository.countByPaymentStatus(PaymentStatus.PAID)

		);

		response.setPendingPremiums(

				premiumRepository.countByPaymentStatus(PaymentStatus.PENDING)

		);

		response.setOverduePremiums(

				premiumRepository.countOverduePremiums()

		);

		response.setTotalCollection(

				premiumRepository.getTotalPremiumCollection()

		);

		return response;

	}

}