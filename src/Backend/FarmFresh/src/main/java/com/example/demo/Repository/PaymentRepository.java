package com.example.demo.Repository;

import com.example.demo.Model.Payment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
