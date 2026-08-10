package com.InsuranceManagement.DTO;

public class PremiumStatisticsResponse {

    private Long paidPremiums;
    private Long pendingPremiums;
    private Long overduePremiums;
    private Double totalCollection;

    public PremiumStatisticsResponse() {
    }

    public PremiumStatisticsResponse(Long paidPremiums,
                                     Long pendingPremiums,
                                     Long overduePremiums,
                                     Double totalCollection) {
        this.paidPremiums = paidPremiums;
        this.pendingPremiums = pendingPremiums;
        this.overduePremiums = overduePremiums;
        this.totalCollection = totalCollection;
    }

    public Long getPaidPremiums() {
        return paidPremiums;
    }

    public void setPaidPremiums(Long paidPremiums) {
        this.paidPremiums = paidPremiums;
    }

    public Long getPendingPremiums() {
        return pendingPremiums;
    }

    public void setPendingPremiums(Long pendingPremiums) {
        this.pendingPremiums = pendingPremiums;
    }

    public Long getOverduePremiums() {
        return overduePremiums;
    }

    public void setOverduePremiums(Long overduePremiums) {
        this.overduePremiums = overduePremiums;
    }

    public Double getTotalCollection() {
        return totalCollection;
    }

    public void setTotalCollection(Double totalCollection) {
        this.totalCollection = totalCollection;
    }
}