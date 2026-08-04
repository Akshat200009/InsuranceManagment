package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.Entities.PaymentStatus;
import com.InsuranceManagement.Services.PremiumService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/premiums")
public class PremiumController {

    private final PremiumService premiumService;

    public PremiumController(PremiumService premiumService) {
        this.premiumService = premiumService;
    }
    @PreAuthorize("hasRole('CUSTOMER')") 
    @PostMapping
    public ResponseEntity<PremiumResponse> recordPremiumPayment(
            @Valid @RequestBody PremiumRequest request) {
    	

        PremiumResponse response =
                premiumService.recordPremiumPayment(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/status/{paymentStatus}")
    public ResponseEntity<List<PremiumResponse>> PaymentStatus(@PathVariable PaymentStatus paymentStatus)
    {
    	List<PremiumResponse> payment= premiumService.getPaymentStatus(paymentStatus);
    	
    	return ResponseEntity.ok(payment);
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/due")
    public ResponseEntity<List<PremiumResponse>> dueDate()
    {
    	List<PremiumResponse> due = premiumService.getDuePremiums();
    	
    	return ResponseEntity.ok(due);
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/history/{policyId}")
    public ResponseEntity<List<PremiumResponse>> getPaymentHistory(
            @PathVariable Long policyId) {

        List<PremiumResponse> response =
                premiumService.getPaymentHistory(policyId);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/overdue")
    public ResponseEntity<List<PremiumResponse>> getOverduePremiums() {

        List<PremiumResponse> response =
                premiumService.getOverduePremiums();

        return ResponseEntity.ok(response);
    }

}