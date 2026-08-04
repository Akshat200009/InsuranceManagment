package com.InsuranceManagement.DTO;

public class ReportResponse {

    private String reportName;

    private Long totalCount;

    public ReportResponse() {
    }

    public ReportResponse(String reportName, Long totalCount) {
        this.reportName = reportName;
        this.totalCount = totalCount;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public Long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Long totalCount) {
        this.totalCount = totalCount;
    }
}