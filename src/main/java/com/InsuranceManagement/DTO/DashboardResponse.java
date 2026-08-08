package com.InsuranceManagement.DTO;

public class DashboardResponse {

    private Long customerCount;
    private Long policyCount;
    private Long claimCount;
    private Double totalPremium;

    public DashboardResponse() {
    }

    public DashboardResponse(Long customerCount,
                             Long policyCount,
                             Long claimCount,
                             Double totalPremium) {

        this.customerCount = customerCount;
        this.policyCount = policyCount;
        this.claimCount = claimCount;
        this.totalPremium = totalPremium;
    }

    public Long getCustomerCount() {
        return customerCount;
    }

    public void setCustomerCount(Long customerCount) {
        this.customerCount = customerCount;
    }

    public Long getPolicyCount() {
        return policyCount;
    }

    public void setPolicyCount(Long policyCount) {
        this.policyCount = policyCount;
    }

    public Long getClaimCount() {
        return claimCount;
    }

    public void setClaimCount(Long claimCount) {
        this.claimCount = claimCount;
    }

    public Double getTotalPremium() {
        return totalPremium;
    }

    public void setTotalPremium(Double totalPremium) {
        this.totalPremium = totalPremium;
    }
}