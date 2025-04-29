package com.example.demo.Repository;

import com.example.demo.Model.AddProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddProductRepository extends JpaRepository<AddProduct, Long> {

    List<AddProduct> findAllByApprovalStatus(boolean approvalStatus);

	List<AddProduct> findByApprovalStatusTrue();
}
