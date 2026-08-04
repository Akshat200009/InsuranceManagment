package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.DocumentResponse;
import com.InsuranceManagement.Entities.DocumentType;

public interface DocumentService {

    String uploadIdentityDocument(Long customerId, MultipartFile file);
    List<DocumentResponse> getDocumentsByCustomer(Long customerId , DocumentType documentType);
    String uploadPolicyDocument(Long customerId, MultipartFile file);
    Resource downloadDocument(Long documentId);
    List<DocumentResponse> viewUploadedFiles(Long customerId);

}