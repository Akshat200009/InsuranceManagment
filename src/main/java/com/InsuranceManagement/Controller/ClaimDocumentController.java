package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.ClaimDocumentResponse;
import com.InsuranceManagement.Services.ClaimDocumentService;

@RestController
@RequestMapping("/api/claim-documents")
public class ClaimDocumentController {

    private final ClaimDocumentService claimDocumentService;

    public ClaimDocumentController(ClaimDocumentService claimDocumentService) {
        this.claimDocumentService = claimDocumentService;
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT,CUSTOMER')")
    @PostMapping("/upload/{claimId}")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long claimId,
            @RequestParam("file") MultipartFile file) {

        String response = claimDocumentService.uploadDocument(claimId, file);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping("/{claimId}")
    public ResponseEntity<List<ClaimDocumentResponse>> getClaimDocuments(
            @PathVariable Long claimId) {

        return ResponseEntity.ok(
                claimDocumentService.getClaimDocuments(claimId)
        );

    }
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT','CUSTOMER')")
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable Long documentId) {

        Resource resource =
                claimDocumentService.downloadDocument(documentId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                resource.getFilename() + "\"")
                .body(resource);

    }
    
}