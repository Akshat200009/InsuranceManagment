package com.InsuranceManagement.Controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.DocumentResponse;
import com.InsuranceManagement.Entities.DocumentType;
import com.InsuranceManagement.Services.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping("/upload/{customerId}")
    public ResponseEntity<String> uploadIdentityDocument(
            @PathVariable Long customerId,
            @RequestParam("file") MultipartFile file) {

        String response = documentService.uploadIdentityDocument(customerId, file);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/customer/{customerId}/{documentType}")
    public ResponseEntity<List<DocumentResponse>> viewDocs(@PathVariable Long customerId,
    		@PathVariable DocumentType documentType)
    {
    	List<DocumentResponse> list = documentService.getDocumentsByCustomer(customerId,documentType);
    	
    	return ResponseEntity.ok(list);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping("/upload/policy/{customerId}")
    public ResponseEntity<String> uploadDocument(@PathVariable Long customerId ,
    		@RequestParam ("file") MultipartFile file)
    {
    	String upload = documentService.uploadPolicyDocument(customerId, file);
    	return new ResponseEntity<>(upload ,HttpStatus.OK);
    	
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable Long documentId) {

        Resource resource = documentService.downloadDocument(documentId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<DocumentResponse>> viewUploadedFiles(@PathVariable Long customerId)
    {
    	List<DocumentResponse> list = documentService.viewUploadedFiles(customerId);
    	
    	return ResponseEntity.ok(list);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','AGENT')")
    @GetMapping
    public ResponseEntity<List<DocumentResponse>> getAllDocuments() {

        return ResponseEntity.ok(
                documentService.getAllDocuments()
        );
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<List<DocumentResponse>> getMyDocuments() {

        return ResponseEntity.ok(
                documentService.getMyDocuments()
        );
    }

}