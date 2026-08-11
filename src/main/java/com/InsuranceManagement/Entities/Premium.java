package com.InsuranceManagement.Entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "premium_payments")
public class Premium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;
    
    @ManyToOne
    private Customer customer;

	@Column(nullable = false)
    private LocalDate paymentDate;

    @Column(nullable = false)
    private Double amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    public Premium() {
    }

    public Premium(Long id, Policy policy, LocalDate paymentDate,
                   Double amount, PaymentStatus paymentStatus) {
        this.id = id;
        this.policy = policy;
        this.paymentDate = paymentDate;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}