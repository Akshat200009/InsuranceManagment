package com.InsuranceManagement.DTO;

import java.time.LocalDateTime;

import com.InsuranceManagement.Entities.DocumentStatus;
import com.InsuranceManagement.Entities.DocumentType;

public class DocumentResponse {

    private Long id;
    private Long customerId;
    private String customerName;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
    private DocumentType documentType;
    private DocumentStatus status;

   

	public DocumentResponse() {
    }

	public DocumentResponse(Long id, Long customerId, String customerName, String fileName, String filePath,
			LocalDateTime uploadedAt, DocumentType documentType, DocumentStatus status) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.customerName = customerName;
		this.fileName = fileName;
		this.filePath = filePath;
		this.uploadedAt = uploadedAt;
		this.documentType = documentType;
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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
    public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public DocumentStatus getStatus() {
		return status;
	}

	public void setStatus(DocumentStatus status) {
		this.status = status;
	}

}