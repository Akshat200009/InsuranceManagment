package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import com.InsuranceManagement.Entities.PolicyStatus;

public class PolicyResponse {

	private Long id;
	private Long customerId;
	private String customerName;
	private String policyType;
	private String policyNumber;
	private Double premiumAmount;
	private LocalDate startDate;
	private LocalDate endDate;
	private PolicyStatus status;

	public PolicyResponse() {
	}

	public PolicyResponse(Long id, Long customerId, String customerName, String policyType,
			String policyNumber, Double premiumAmount, LocalDate startDate, LocalDate endDate, PolicyStatus status) {

		this.id = id;
		this.customerId = customerId;
		this.customerName = customerName;
		this.policyType = policyType;
		this.policyNumber = policyNumber;
		this.premiumAmount = premiumAmount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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

	public PolicyStatus getStatus(){
		return status;
	}

	public void setStatus(PolicyStatus status) {
		this.status = status;
	}
}