package com.InsuranceManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.InsuranceManagement.Entities.Document;
import com.InsuranceManagement.Entities.DocumentType;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
   
	 List<Document> findByCustomerId(Long customerId);

	    List<Document> findByCustomerIdAndDocumentType(
	            Long customerId,
	            DocumentType documentType);
}
