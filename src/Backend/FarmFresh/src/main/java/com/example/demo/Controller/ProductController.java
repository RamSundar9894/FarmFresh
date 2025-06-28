package com.example.demo.Controller;

import com.example.demo.Model.Product;
import com.example.demo.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
//@CrossOrigin(origins="http://localhost:3030")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String category) {
        return productService.getAllProducts(category);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product createdProduct = productService.createProduct(product);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Handle exceptions
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productService.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
