package com.InsuranceManagement.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
}