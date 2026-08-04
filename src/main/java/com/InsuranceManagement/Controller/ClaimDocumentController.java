package com.InsuranceManagement.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.Services.ClaimDocumentService;

@RestController
@RequestMapping("/api/claim-documents")
public class ClaimDocumentController {

    private final ClaimDocumentService claimDocumentService;

    public ClaimDocumentController(ClaimDocumentService claimDocumentService) {
        this.claimDocumentService = claimDocumentService;
    }

    @PostMapping("/upload/{claimId}")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long claimId,
            @RequestParam("file") MultipartFile file) {

        String response = claimDocumentService.uploadDocument(claimId, file);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}