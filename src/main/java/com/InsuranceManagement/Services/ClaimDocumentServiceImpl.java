package com.InsuranceManagement.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.ClaimDocumentResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.ClaimDocument;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.User;
import com.InsuranceManagement.Repository.ClaimDocumentRepository;
import com.InsuranceManagement.Repository.ClaimRepository;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.UserRepository;

@Service
public class ClaimDocumentServiceImpl implements ClaimDocumentService {

    private final ClaimDocumentRepository claimDocumentRepository;
    private final ClaimRepository claimRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public ClaimDocumentServiceImpl(
            ClaimDocumentRepository claimDocumentRepository,
            ClaimRepository claimRepository,
            UserRepository userRepository,CustomerRepository customerRepository) {

        this.claimDocumentRepository = claimDocumentRepository;
        this.claimRepository = claimRepository;
        this.userRepository=userRepository;
        this.customerRepository=customerRepository;
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
    
    private Customer getLoggedInCustomer() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return customerRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));
    }
    private void validateCustomerClaimAccess(Claim claim) {

        String role = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();

        // ADMIN / AGENT can access any claim
        if (role.equals("ROLE_ADMIN") ||
            role.equals("ROLE_AGENT")) {

            return;
        }

        // CUSTOMER can access only own claim
        Customer customer = getLoggedInCustomer();

        Long claimCustomerId =
                claim.getPolicy()
                        .getCustomer()
                        .getId();

        if (!claimCustomerId.equals(customer.getId())) {

            throw new RuntimeException("Access Denied");
        }
    }

    @Override
    public String uploadDocument(
            Long claimId,
            MultipartFile file) {

        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() ->
                        new RuntimeException("Claim not found"));

        // CUSTOMER -> only own claim
        // ADMIN / AGENT -> any claim
        validateCustomerClaimAccess(claim);

        try {

            String uploadDirectory = "uploads/claims";

            Files.createDirectories(
                    Paths.get(uploadDirectory)
            );

            String fileName =
                    System.currentTimeMillis()
                    + "_"
                    + file.getOriginalFilename();

            Path filePath =
                    Paths.get(
                            uploadDirectory,
                            fileName
                    );

            Files.copy(
                    file.getInputStream(),
                    filePath
            );

            ClaimDocument document =
                    new ClaimDocument();

            document.setClaim(claim);
            document.setFileName(fileName);
            document.setFileType(
                    file.getContentType()
            );
            document.setFilePath(
                    filePath.toString()
            );
            document.setUploadDate(
                    LocalDate.now()
            );

            claimDocumentRepository.save(document);

            ClaimDocument saved =
                    claimDocumentRepository.save(document);

            System.out.println("========== DOCUMENT SAVED ==========");
            System.out.println("Document ID: " + saved.getId());
            System.out.println("Claim ID: " + saved.getClaim().getId());
            System.out.println("File: " + saved.getFileName());

            return "Document uploaded successfully.";

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload document."
            );
        }
    }

    @Override
    public List<ClaimDocumentResponse> getClaimDocuments(Long claimId) {

        System.out.println("========== GET DOCUMENTS ==========");
        System.out.println("Claim ID: " + claimId);

        List<ClaimDocument> documents =
                claimDocumentRepository.findByClaimId(claimId);

        System.out.println("Documents found: " + documents.size());

        documents.forEach(document ->
                System.out.println(
                        "Document ID: " + document.getId()
                        + " | Claim ID: " + document.getClaim().getId()
                        + " | File: " + document.getFileName()
                )
        );

        return documents.stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public Resource downloadDocument(Long documentId) {

        ClaimDocument document =
                claimDocumentRepository.findById(documentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Document not found"
                                ));

        // Check ownership
        validateCustomerClaimAccess(
                document.getClaim()
        );

        try {

            Path path =
                    Paths.get(
                            document.getFilePath()
                    );

            return new UrlResource(
                    path.toUri()
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to download document"
            );
        }
    }
}