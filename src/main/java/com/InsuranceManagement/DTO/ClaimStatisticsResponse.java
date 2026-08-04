package com.InsuranceManagement.DTO;

public class ClaimStatisticsResponse {

    private Long approvedClaims;
    private Long pendingClaims;
    private Long rejectedClaims;

    public ClaimStatisticsResponse() {
    }

    public ClaimStatisticsResponse(Long approvedClaims,
                                   Long pendingClaims,
                                   Long rejectedClaims) {
        this.approvedClaims = approvedClaims;
        this.pendingClaims = pendingClaims;
        this.rejectedClaims = rejectedClaims;
    }

    public Long getApprovedClaims() {
        return approvedClaims;
    }

    public void setApprovedClaims(Long approvedClaims) {
        this.approvedClaims = approvedClaims;
    }

    public Long getPendingClaims() {
        return pendingClaims;
    }

    public void setPendingClaims(Long pendingClaims) {
        this.pendingClaims = pendingClaims;
    }

    public Long getRejectedClaims() {
        return rejectedClaims;
    }

    public void setRejectedClaims(Long rejectedClaims) {
        this.rejectedClaims = rejectedClaims;
    }
}