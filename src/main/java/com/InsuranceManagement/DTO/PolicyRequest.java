package com.InsuranceManagement.DTO;

import java.time.LocalDate;

public class PolicyRequest {

	private Long customerId;
	private String policyType;
	private String policyNumber;
	private Double premiumAmount;
	private LocalDate startDate;
	private LocalDate endDate;
	private String status;

	public PolicyRequest() {
	}

	public PolicyRequest(Long customerId, String policyType, String policyNumber,
			Double premiumAmount, LocalDate startDate, LocalDate endDate, String status) {
		super();
		this.customerId = customerId;
		this.policyType = policyType;
		this.policyNumber = policyNumber;
		this.premiumAmount = premiumAmount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getPolicyType() {
		return policyType;
	}

	public void setPolicyType(String policyType) {
		this.policyType = policyType;
	}

	public String getPolicyNumber() {
		return policyNumber;
	}

	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}