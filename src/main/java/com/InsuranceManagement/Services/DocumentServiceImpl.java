package com.InsuranceManagement.Services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.InsuranceManagement.DTO.ClaimResponse;
import com.InsuranceManagement.DTO.DocumentResponse;
import com.InsuranceManagement.Entities.Claim;
import com.InsuranceManagement.Entities.Customer;
import com.InsuranceManagement.Entities.Document;
import com.InsuranceManagement.Entities.DocumentType;
import com.InsuranceManagement.Repository.CustomerRepository;
import com.InsuranceManagement.Repository.DocumentRepository;

@Service
public class DocumentServiceImpl implements DocumentService {

	private final DocumentRepository documentRepository;
	private final CustomerRepository customerRepository;

	public DocumentServiceImpl(DocumentRepository documentRepository, CustomerRepository customerRepository) {

		this.documentRepository = documentRepository;
		this.customerRepository = customerRepository;
	}

	private DocumentResponse convertToResponse(Document docs) {

		DocumentResponse response = new DocumentResponse();

		response.setId(docs.getId());
		response.setCustomerId(docs.getCustomer().getId());
		response.setCustomerName(docs.getCustomer().getName());
		response.setFileName(docs.getFileName());
		response.setFilePath(docs.getFilePath());
		response.setUploadedAt(docs.getUploadedAt());
		response.setDocumentType(docs.getDocumentType());

		return response;
	}

	@Override
	public String uploadIdentityDocument(Long customerId, MultipartFile file) {

		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		try {

			String uploadDirectory = "uploads/documents";

			Files.createDirectories(Paths.get(uploadDirectory));

			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

			Path filePath = Paths.get(uploadDirectory, fileName);

			Files.copy(file.getInputStream(), filePath);

			Document document = new Document();

			document.setCustomer(customer);
			document.setFileName(fileName);
			document.setFilePath(filePath.toString());
			document.setUploadedAt(LocalDateTime.now());
			document.setDocumentType(DocumentType.IDENTITY);

			documentRepository.save(document);

			return "Identity document uploaded successfully.";

		} catch (IOException e) {

			throw new RuntimeException("Failed to upload document.");
		}
	}

	@Override
	public List<DocumentResponse> getDocumentsByCustomer(Long customerId, DocumentType documentType) {

		List<Document> list = documentRepository.findByCustomerId(customerId);

		List<Document> documents = documentRepository.findByCustomerIdAndDocumentType(customerId, documentType);

		return list.stream().map(this::convertToResponse).toList();
	}

	@Override
	public String uploadPolicyDocument(Long customerId, MultipartFile file) {

		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		try {
			String uploadDirectory = "uploads/documents";
			Files.createDirectories(Paths.get(uploadDirectory));
			String Filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			Path FilePath = Paths.get(uploadDirectory, Filename);
			Files.copy(file.getInputStream(), FilePath);

			Document document = new Document();

			document.setCustomer(customer);
			document.setDocumentType(DocumentType.POLICY);
			document.setFileName(Filename);
			document.setFilePath(FilePath.toString());
			document.setUploadedAt(LocalDateTime.now());

			documentRepository.save(document);

			return "Policy document uploaded successfully.";

		} catch (IOException e) {
			throw new RuntimeException("Failed to upload Document");
		}
	}

	@Override
	public Resource downloadDocument(Long documentId) {

		Document document = documentRepository.findById(documentId)
				.orElseThrow(() -> new RuntimeException("Document not found"));

		try {

			Path path = Paths.get(document.getFilePath());

			Resource resource = new UrlResource(path.toUri());

			if (!resource.exists()) {
				throw new RuntimeException("File not found");
			}

			return resource;

		} catch (MalformedURLException e) {

			throw new RuntimeException("Unable to download document");
		}
	}

	@Override
	public List<DocumentResponse> viewUploadedFiles(Long customerId) {
		
		 List<Document> list= documentRepository.findByCustomerId(customerId);
		 
		   return list.stream().map(this::convertToResponse).toList();
		 
	}
}
