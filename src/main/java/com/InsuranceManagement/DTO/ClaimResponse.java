package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import com.InsuranceManagement.Entities.ClaimStatus;

public class ClaimResponse {

	private Long id;
	private Long policyId;
	private String policyNumber;
	private Double claimAmount;
	private String reason;
	private ClaimStatus status;
	private LocalDate submissionDate;
	private Long assignedAgentId;
	private String assignedAgentName;

	public ClaimResponse() {
	}

	

	public ClaimResponse(Long id, Long policyId, String policyNumber, Double claimAmount, String reason,
			ClaimStatus status, LocalDate submissionDate, Long assignedAgentId, String assignedAgentName) {
		super();
		this.id = id;
		this.policyId = policyId;
		this.policyNumber = policyNumber;
		this.claimAmount = claimAmount;
		this.reason = reason;
		this.status = status;
		this.submissionDate = submissionDate;
		this.assignedAgentId = assignedAgentId;
		this.assignedAgentName = assignedAgentName;
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

	public Double getClaimAmount() {
		return claimAmount;
	}

	public void setClaimAmount(Double claimAmount) {
		this.claimAmount = claimAmount;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public ClaimStatus getStatus() {
		return status;
	}

	public void setStatus(ClaimStatus status) {
		this.status = status;
	}

	public LocalDate getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDate submissionDate) {
		this.submissionDate = submissionDate;
	}

	public Long getAssignedAgentId() {
		return assignedAgentId;
	}

	public void setAssignedAgentId(Long assignedAgentId) {
		this.assignedAgentId = assignedAgentId;
	}

	public String getAssignedAgentName() {
		return assignedAgentName;
	}

	public void setAssignedAgentName(String assignedAgentName) {
		this.assignedAgentName = assignedAgentName;
	}
	
}