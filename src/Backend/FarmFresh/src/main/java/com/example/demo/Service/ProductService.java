package com.example.demo.Service;

import com.example.demo.Model.Product;
import com.example.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Fetch all products, optionally filtered by category
    public List<Product> getAllProducts(String category) {
        if (category == null || category.equals("All")) {
            return productRepository.findAll();
        } else {
            return productRepository.findByCategory(category);
        }
    }

    // Fetch a single product by its ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Create a new product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    public Product updateProduct(Long id, Product product) {
        if (!productRepository.existsById(id)) {
            return null;  // Return null if the product doesn't exist
        }
        product.setId(id);  // Ensure the product has the correct ID before updating
        return productRepository.save(product);
    }

    // Delete a product by ID
    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
    }

    // Check if a product exists by its ID
    public boolean exists(Long id) {
        return productRepository.existsById(id);
    }
}
