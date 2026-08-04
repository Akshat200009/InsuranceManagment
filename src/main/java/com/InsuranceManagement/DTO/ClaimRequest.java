package com.InsuranceManagement.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ClaimRequest {

	@NotNull(message = "Policy Id is required")
	private Long policyId;

	@NotNull(message = "Claim Amount is required")
	@Positive(message="Claim Amount must be greater than zero")
	private Double claimAmount;

	@NotBlank(message = "Reason is required")
	private String reason;

	@NotNull(message = "Submission Date is required")
	private LocalDate submissionDate;

	public ClaimRequest() {
	}

	public ClaimRequest(Long policyId, Double claimAmount, String reason, LocalDate submissionDate) {

		this.policyId = policyId;
		this.claimAmount = claimAmount;
		this.reason = reason;
		this.submissionDate = submissionDate;
	}

	public Long getPolicyId() {
		return policyId;
	}

	public void setPolicyId(Long policyId) {
		this.policyId = policyId;
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

	public LocalDate getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDate submissionDate) {
		this.submissionDate = submissionDate;
	}
}