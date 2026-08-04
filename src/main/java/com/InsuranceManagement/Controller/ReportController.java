package com.InsuranceManagement.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.InsuranceManagement.DTO.ClaimStatisticsResponse;
import com.InsuranceManagement.DTO.ReportResponse;
import com.InsuranceManagement.Services.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/active-policies")
    public ResponseEntity<ReportResponse> getActivePoliciesReport() {

        ReportResponse response =
                reportService.getActivePoliciesReport();

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/expired-policies")
    public ResponseEntity<ReportResponse> getExpiredPoliciesReport() {

        ReportResponse response =
                reportService.getExpiredPoliciesReport();

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/claim-statistics")
    public ResponseEntity<ClaimStatisticsResponse> getClaimStats()
    {
    	ClaimStatisticsResponse response = reportService.getClaimStatistics();
    	return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/premium-collection")
    public ResponseEntity<ReportResponse> getPremiumCollectionReport(){

        ReportResponse response =
                reportService.getPremiumCollectionReport();

        return ResponseEntity.ok(response);
   }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/customer-growth")
    public ResponseEntity<ReportResponse> getCustomerGrowthReport() {

        ReportResponse response =
                reportService.getCustomerGrowthReport();

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/monthly-business")
    public ResponseEntity<ReportResponse> getMonthlyBusinessReport() {

        ReportResponse response =
                reportService.getMonthlyBusinessReport();

        return ResponseEntity.ok(response);
    }

}