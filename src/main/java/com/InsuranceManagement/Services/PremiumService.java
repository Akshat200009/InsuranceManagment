package com.InsuranceManagement.Services;

import java.util.List;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;

public interface PremiumService {

    PremiumResponse recordPremiumPayment(PremiumRequest request);
    
    List<PremiumResponse> getPaymentStatus(String paymentStatus);
    
    List<PremiumResponse> getDuePremiums();
    
    List<PremiumResponse> getPaymentHistory(Long policyId);
    List<PremiumResponse> getOverduePremiums();

}