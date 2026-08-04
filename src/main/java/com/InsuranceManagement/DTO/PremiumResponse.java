package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import com.InsuranceManagement.Entities.PaymentStatus;

public class PremiumResponse {

    private Long id;
    private Long policyId;
    private String policyNumber;
    private Double amount;
    private LocalDate paymentDate;
    private PaymentStatus paymentStatus;

    public PremiumResponse() {
    }

    public PremiumResponse(Long id, Long policyId, String policyNumber,
            Double amount, LocalDate paymentDate, PaymentStatus paymentStatus) {

        this.id = id;
        this.policyId = policyId;
        this.policyNumber = policyNumber;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}