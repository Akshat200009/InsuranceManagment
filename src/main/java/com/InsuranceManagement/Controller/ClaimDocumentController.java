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
import org.springframework.http.MediaType;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/claim-documents")
public class ClaimDocumentController {

    private final ClaimDocumentService claimDocumentService;

    public ClaimDocumentController(
            ClaimDocumentService claimDocumentService) {

        this.claimDocumentService = claimDocumentService;
    }


    // =====================================================
    // UPLOAD DOCUMENT
    // CUSTOMER + ADMIN + AGENT
    // =====================================================

    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @PostMapping("/upload/{claimId}")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long claimId,
            @RequestParam("file") MultipartFile file) {

        String response =
                claimDocumentService.uploadDocument(
                        claimId,
                        file
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }


    // =====================================================
    // GET CLAIM DOCUMENTS
    // CUSTOMER + ADMIN + AGENT
    // =====================================================

    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @GetMapping("/{claimId}")
    public ResponseEntity<List<ClaimDocumentResponse>> getClaimDocuments(
            @PathVariable Long claimId) {

        return ResponseEntity.ok(
                claimDocumentService.getClaimDocuments(claimId)
        );
    }


    // =====================================================
    // DOWNLOAD DOCUMENT
    // CUSTOMER + ADMIN + AGENT
    // =====================================================

    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable Long documentId) {

        Resource resource =
                claimDocumentService.downloadDocument(documentId);

        try {

            Path path = Paths.get(resource.getURI());

            String contentType =
                    Files.probeContentType(path);

            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" +
                                    resource.getFilename() +
                                    "\""
                    )
                    .body(resource);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}