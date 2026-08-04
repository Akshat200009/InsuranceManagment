package com.InsuranceManagement.Services;

import com.InsuranceManagement.DTO.ClaimStatisticsResponse;
import com.InsuranceManagement.DTO.ReportResponse;

public interface ReportService {

    ReportResponse getActivePoliciesReport(); 
    ReportResponse getExpiredPoliciesReport();
    ClaimStatisticsResponse getClaimStatistics();
    ReportResponse getPremiumCollectionReport();
    ReportResponse getCustomerGrowthReport();
    ReportResponse getMonthlyBusinessReport();
    

}