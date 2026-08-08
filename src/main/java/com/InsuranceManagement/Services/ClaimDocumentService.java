package com.InsuranceManagement.Services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.ClaimDocumentResponse;


public interface ClaimDocumentService {

    String uploadDocument(Long claimId ,MultipartFile file);
    
    List<ClaimDocumentResponse> getClaimDocuments(Long claimId);

    Resource downloadDocument(Long documentId);

}