package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.Services.PremiumService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/premiums")
public class PremiumController {

    private final PremiumService premiumService;

    public PremiumController(PremiumService premiumService) {
        this.premiumService = premiumService;
    }

    @PostMapping
    public ResponseEntity<PremiumResponse> recordPremiumPayment(
            @Valid @RequestBody PremiumRequest request) {

        PremiumResponse response =
                premiumService.recordPremiumPayment(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/status/{paymentStatus}")
    public ResponseEntity<List<PremiumResponse>> PaymentStatus(@PathVariable String paymentStatus)
    {
    	List<PremiumResponse> payment= premiumService.getPaymentStatus(paymentStatus);
    	
    	return ResponseEntity.ok(payment);
    }
    @GetMapping("/due")
    public ResponseEntity<List<PremiumResponse>> dueDate()
    {
    	List<PremiumResponse> due = premiumService.getDuePremiums();
    	
    	return ResponseEntity.ok(due);
    }
    @GetMapping("/history/{policyId}")
    public ResponseEntity<List<PremiumResponse>> getPaymentHistory(
            @PathVariable Long policyId) {

        List<PremiumResponse> response =
                premiumService.getPaymentHistory(policyId);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/overdue")
    public ResponseEntity<List<PremiumResponse>> getOverduePremiums() {

        List<PremiumResponse> response =
                premiumService.getOverduePremiums();

        return ResponseEntity.ok(response);
    }

}