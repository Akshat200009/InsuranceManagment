package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import com.InsuranceManagement.Entities.PaymentStatus;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PremiumRequest {

    @NotNull(message = "Policy Id is required")
    private Long policyId;

    @NotNull(message = "Amount is required")
    @Positive(message="Amount must be greater than zero")
    private Double amount;

    @NotNull(message = "Payment Date is required")
    private LocalDate paymentDate;

    private PaymentStatus paymentStatus;

    public PremiumRequest() {
    }

    public PremiumRequest(Long policyId, Double amount,
                          LocalDate paymentDate, PaymentStatus paymentStatus) {
        this.policyId = policyId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentStatus = paymentStatus;
    }

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
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