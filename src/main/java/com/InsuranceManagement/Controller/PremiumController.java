package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.InsuranceManagement.DTO.PremiumRequest;
import com.InsuranceManagement.DTO.PremiumResponse;
import com.InsuranceManagement.DTO.PremiumStatisticsResponse;
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
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')") 
    @PostMapping
    public ResponseEntity<PremiumResponse> recordPremiumPayment(
            @Valid @RequestBody PremiumRequest request) {
    	

        PremiumResponse response =
                premiumService.recordPremiumPayment(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/status/{paymentStatus}")
    public ResponseEntity<List<PremiumResponse>> PaymentStatus(@PathVariable PaymentStatus paymentStatus)
    {
    	List<PremiumResponse> payment= premiumService.getPaymentStatus(paymentStatus);
    	
    	return ResponseEntity.ok(payment);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/due")
    public ResponseEntity<List<PremiumResponse>> dueDate()
    {
    	List<PremiumResponse> due = premiumService.getDuePremiums();
    	
    	return ResponseEntity.ok(due);
    }
    
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/history/{policyId}")
    public ResponseEntity<List<PremiumResponse>> getPaymentHistory(
            @PathVariable Long policyId) {

        List<PremiumResponse> response =
                premiumService.getPaymentHistory(policyId);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/overdue")
    public ResponseEntity<List<PremiumResponse>> getOverduePremiums() {

        List<PremiumResponse> response =
                premiumService.getOverduePremiums();

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping
    public ResponseEntity<List<PremiumResponse>> getAllPremiums() {

        List<PremiumResponse> premiums = premiumService.getAllPremiums();

        return ResponseEntity.ok(premiums);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/{id}")
    public ResponseEntity<PremiumResponse> getPremiumById(
            @PathVariable Long id) {

        PremiumResponse premium = premiumService.getPremiumById(id);

        return ResponseEntity.ok(premium);
    }
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/statistics")
    public ResponseEntity<PremiumStatisticsResponse> getStatistics() {

        return ResponseEntity.ok(

                premiumService.getPremiumStatistics()

        );

    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<List<PremiumResponse>> getMyPremiums() {

        return ResponseEntity.ok(
                premiumService.getMyPremiums()
        );
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my/{id}")
    public ResponseEntity<PremiumResponse> getMyPremiumById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                premiumService.getMyPremiumById(id)
        );
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/my/{id}/pay")
    public ResponseEntity<PremiumResponse> payPremium(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                premiumService.payPremium(id)
        );
    }

}