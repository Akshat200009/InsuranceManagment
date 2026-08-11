package com.InsuranceManagement.Services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.DTO.PremiumStatisticsResponse;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.PaymentStatus;
import com.InsuranceManagement.Entities.Policy;
import com.InsuranceManagement.Entities.Premium;
import com.InsuranceManagement.Entities.User;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.PolicyRepository;
import com.InsuranceManagement.Repository.PremiumRepository;
import com.InsuranceManagement.Repository.UserRepository;

@Service
public class PremiumServiceImpl implements PremiumService {

	private final PremiumRepository premiumRepository;
	private final PolicyRepository policyRepository;
	private final UserRepository userRepository;
	private final CustomerRepository customerRepository;

	public PremiumServiceImpl(PremiumRepository premiumRepository, PolicyRepository policyRepository,
			UserRepository userRepository, CustomerRepository customerRepository) {

		this.premiumRepository = premiumRepository;
		this.policyRepository = policyRepository;
		this.customerRepository=customerRepository;
		this.userRepository=userRepository;
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
	
	private Customer getLoggedInCustomer() {

	    String email = SecurityContextHolder
	            .getContext()
	            .getAuthentication()
	            .getName();

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    return customerRepository.findByUser(user)
	            .orElseThrow(() -> new RuntimeException("Customer not found"));
	}

	@Override
	public PremiumResponse recordPremiumPayment(PremiumRequest request) {

	    Policy policy = policyRepository.findById(request.getPolicyId())
	            .orElseThrow(() ->
	                    new RuntimeException("Policy not found"));

	    Premium premium = new Premium();

	    premium.setPolicy(policy);

	    premium.setCustomer(policy.getCustomer());

	    premium.setAmount(request.getAmount());

	    premium.setPaymentDate(request.getPaymentDate());

	    premium.setPaymentStatus(request.getPaymentStatus());

	    Premium savedPremium = premiumRepository.save(premium);

	    return convertToResponse(savedPremium);
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

	@Override
	public List<PremiumResponse> getMyPremiums() {

	    Customer customer = getLoggedInCustomer();

	    return premiumRepository
	            .findByCustomerId(customer.getId())
	            .stream()
	            .map(this::convertToResponse)
	            .toList();
	}

	@Override
	public PremiumResponse getMyPremiumById(Long premiumId) {

	    Customer customer = getLoggedInCustomer();

	    Premium premium = premiumRepository.findById(premiumId)
	            .orElseThrow(() -> new RuntimeException("Premium not found"));

	    if (!premium.getCustomer().getId().equals(customer.getId())) {
	        throw new RuntimeException("Access Denied");
	    }

	    return convertToResponse(premium);
	}

	@Override
	public PremiumResponse payPremium(Long premiumId) {

	    Customer customer = getLoggedInCustomer();

	    Premium premium = premiumRepository.findById(premiumId)
	            .orElseThrow(() ->
	                    new RuntimeException("Premium not found"));

	    // Verify premium belongs to logged-in customer
	    if (!premium.getCustomer()
	            .getId()
	            .equals(customer.getId())) {

	        throw new RuntimeException("Access Denied");
	    }

	    // Already paid
	    if (premium.getPaymentStatus() == PaymentStatus.PAID) {
	        throw new RuntimeException("Premium is already paid");
	    }

	    premium.setPaymentStatus(PaymentStatus.PAID);
	    premium.setPaymentDate(LocalDate.now());

	    Premium savedPremium =
	            premiumRepository.save(premium);

	    return convertToResponse(savedPremium);
	}

}