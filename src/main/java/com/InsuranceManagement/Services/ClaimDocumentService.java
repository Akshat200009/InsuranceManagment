package com.InsuranceManagement.Services;

import org.springframework.web.multipart.MultipartFile;

public interface ClaimDocumentService {

    String uploadDocument(Long claimId ,MultipartFile file);

}