package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import com.InsuranceManagement.Entities.PolicyStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PolicyRequest {

	@NotNull(message="Customer Id is required")
	private Long customerId;

	@NotBlank(message="Policy Type is required")
	private String policyType;

	@NotBlank(message="Policy Number is required")
	private String policyNumber;

	@NotNull(message="Premium Amount is required")
	@Positive(message="Premium Amount must be greater than zero")
	private Double premiumAmount;

	@NotNull(message="Start Date is required")
	private LocalDate startDate;

	@NotNull(message="End Date is required")
	private LocalDate endDate;

	@NotNull(message="Policy Status is required")
	private PolicyStatus status;

	public PolicyRequest() {
	}

	public PolicyRequest(Long customerId, String policyType, String policyNumber,
			Double premiumAmount, LocalDate startDate, LocalDate endDate, PolicyStatus status) {
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

	public PolicyStatus getStatus() {
		return status;
	}

	public void setStatus(PolicyStatus status) {
		this.status = status;
	}
}