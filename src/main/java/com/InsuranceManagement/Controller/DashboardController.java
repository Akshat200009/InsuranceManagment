package com.InsuranceManagement.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.InsuranceManagement.DTO.DashboardResponse;
import com.InsuranceManagement.Services.DashboardService;

@RequestMapping("/api/dashboard")
@RestController
public class DashboardController {

	
	  private final DashboardService dashService;
	  
	  public DashboardController(DashboardService dashService)
	  {
	  this.dashService=dashService;
	  }
	  @GetMapping
	  public ResponseEntity<DashboardResponse> getDashboard()
	  {
		 DashboardResponse response = dashService.getDashboard();  
		 
		  return ResponseEntity.ok(response);
	  }
}
