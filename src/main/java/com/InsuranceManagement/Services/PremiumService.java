package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.Entities.PaymentStatus;

public interface PremiumService {

    PremiumResponse recordPremiumPayment(PremiumRequest request);
    
    List<PremiumResponse> getPaymentStatus(PaymentStatus paymentStatus);
    
    List<PremiumResponse> getDuePremiums();
    
    List<PremiumResponse> getPaymentHistory(Long policyId);
    List<PremiumResponse> getOverduePremiums();

}