package com.InsuranceManagement.Entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "claim_documents")
public class ClaimDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "claim_id", nullable = false)
	private Claim claim;

	@Column(nullable = false)
	private String fileName;

	@Column(nullable = false)
	private String fileType;

	@Column(nullable = false)
	private String filePath;

	@Column(nullable = false)
	private LocalDate uploadDate;

	public ClaimDocument() {
	}

	public ClaimDocument(Long id, Claim claim, String fileName, String fileType, String filePath,
			LocalDate uploadDate) {

		this.id = id;
		this.claim = claim;
		this.fileName = fileName;
		this.fileType = fileType;
		this.filePath = filePath;
		this.uploadDate = uploadDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Claim getClaim() {
		return claim;
	}

	public void setClaim(Claim claim) {
		this.claim = claim;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public LocalDate getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(LocalDate uploadDate) {
		this.uploadDate = uploadDate;
	}
}