package com.example.demo.Service;

import com.example.demo.Model.AddProduct;
import com.example.demo.Repository.AddProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddProductService {

    @Autowired
    private AddProductRepository addProductRepository;

    // Create a new product
    public AddProduct createProduct(AddProduct product) {
        return addProductRepository.save(product);
    }

    // Update an existing product
    public AddProduct updateProduct(Long id, AddProduct product) {
        if (addProductRepository.existsById(id)) {
            product.setId(id);
            return addProductRepository.save(product);
        }
        return null;
    }

    // Delete a product by ID
    public void deleteProduct(Long id) {
        addProductRepository.deleteById(id);
    }

    // Retrieve products by approval status
    public List<AddProduct> getAllProducts(boolean approved) {
        return addProductRepository.findAllByApprovalStatus(approved);
    }

    // Retrieve a product by ID
    public Optional<AddProduct> getProductById(Long id) {
        return addProductRepository.findById(id);
    }

    // Approve a product by ID
    public boolean approveProduct(Long id) {
        Optional<AddProduct> optionalProduct = addProductRepository.findById(id);
        if (optionalProduct.isPresent()) {
            AddProduct product = optionalProduct.get();
            if (!product.isApprovalStatus()) { // Only update if not already approved
                product.setApprovalStatus(true);
                addProductRepository.save(product);
                return true;
            }
        }
        return false; // Return false if the product was not found or was already approved
    }

    // Retrieve all approved products
    public List<AddProduct> getApprovedProducts() {
        return addProductRepository.findByApprovalStatusTrue();
    }

    // Retrieve image data by product ID
    public byte[] getImageDataById(Long id) {
        Optional<AddProduct> product = addProductRepository.findById(id);
        return product.map(AddProduct::getImage).orElse(null); // Adjust according to your data structure
    }
}
