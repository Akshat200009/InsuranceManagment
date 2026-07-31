package com.InsuranceManagement.DTO;

import java.time.LocalDate;

public class PolicyRenewRequest {

    private Double premiumAmount;
    private LocalDate startDate;
    private LocalDate endDate;

    public PolicyRenewRequest() {
    }

    public PolicyRenewRequest(Double premiumAmount, LocalDate startDate, LocalDate endDate) {
        this.premiumAmount = premiumAmount;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Double getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(Double premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}