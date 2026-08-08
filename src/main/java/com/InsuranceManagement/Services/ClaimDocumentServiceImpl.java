package com.InsuranceManagement.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.ClaimDocumentResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimDocument;
import com.InsuranceManagement.Repository.ClaimDocumentRepository;
import com.InsuranceManagement.Repository.ClaimRepository;

@Service
public class ClaimDocumentServiceImpl implements ClaimDocumentService {

    private final ClaimDocumentRepository claimDocumentRepository;
    private final ClaimRepository claimRepository;

    public ClaimDocumentServiceImpl(
            ClaimDocumentRepository claimDocumentRepository,
            ClaimRepository claimRepository) {

        this.claimDocumentRepository = claimDocumentRepository;
        this.claimRepository = claimRepository;
    }
    
    private ClaimDocumentResponse convertToResponse(ClaimDocument document) {

        ClaimDocumentResponse response =
                new ClaimDocumentResponse();

        response.setId(document.getId());
        response.setFileName(document.getFileName());
        response.setFileType(document.getFileType());
        response.setUploadDate(document.getUploadDate());

        return response;
    }

    @Override
    public String uploadDocument(Long claimId, MultipartFile file) {

        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        try {

            String uploadDirectory = "uploads/claims";

            Files.createDirectories(Paths.get(uploadDirectory));

            String fileName = System.currentTimeMillis() + "_"
                    + file.getOriginalFilename();

            Path filePath = Paths.get(uploadDirectory, fileName);

            Files.copy(file.getInputStream(), filePath);

            ClaimDocument document = new ClaimDocument();

            document.setClaim(claim);
            document.setFileName(fileName);
            document.setFileType(file.getContentType());
            document.setFilePath(filePath.toString());
            document.setUploadDate(LocalDate.now());

            claimDocumentRepository.save(document);

            return "Document uploaded successfully.";

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload document.");
        }
    }

    @Override
    public List<ClaimDocumentResponse> getClaimDocuments(Long claimId) {

        return claimDocumentRepository
                .findByClaimId(claimId)
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    @Override
    public Resource downloadDocument(Long documentId) {

        ClaimDocument document =
                claimDocumentRepository.findById(documentId)
                        .orElseThrow(() ->
                                new RuntimeException("Document not found"));

        try {

            Path path = Paths.get(document.getFilePath());

            return new UrlResource(path.toUri());

        }

        catch (Exception e) {

            throw new RuntimeException("Unable to download document");

        }

    }
}