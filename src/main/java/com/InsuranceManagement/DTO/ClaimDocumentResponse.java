package com.InsuranceManagement.DTO;

import java.time.LocalDate;

public class ClaimDocumentResponse {

    private Long id;
    private String fileName;
    private String fileType;
    private LocalDate uploadDate;

    public ClaimDocumentResponse() {
    }

    public ClaimDocumentResponse(Long id, String fileName,
                                 String fileType,
                                 LocalDate uploadDate) {

        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.uploadDate = uploadDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

}