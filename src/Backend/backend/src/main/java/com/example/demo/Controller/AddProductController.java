package com.example.demo.Controller;

import com.example.demo.Model.AddProduct;
import com.example.demo.Service.AddProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/add-products")
@CrossOrigin(origins = "http://localhost:3000")
public class AddProductController {

    @Autowired
    private AddProductService addProductService;

    @PostMapping
    public ResponseEntity<AddProduct> createProduct(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") BigDecimal price,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            AddProduct addProduct = new AddProduct();
            addProduct.setName(name);
            addProduct.setCategory(category);
            addProduct.setPrice(price);
            addProduct.setImage(imageFile.getBytes());

            AddProduct createdProduct = addProductService.createProduct(addProduct);
            return ResponseEntity.ok(createdProduct);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/approved")
    public ResponseEntity<List<AddProduct>> getApprovedProducts() {
        List<AddProduct> approvedProducts = addProductService.getApprovedProducts();
        return ResponseEntity.ok(approvedProducts);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<AddProduct>> getPendingProducts() {
        List<AddProduct> pendingProducts = addProductService.getAllProducts(false);
        return ResponseEntity.ok(pendingProducts);
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<Void> approveProduct(@PathVariable Long id) {
        boolean isApproved = addProductService.approveProduct(id);
        if (isApproved) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if product was not found or already approved
        }
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<Void> rejectProduct(@PathVariable Long id) {
        if (addProductService.getProductById(id).isPresent()) {
            addProductService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if product was not found
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        byte[] imageData = addProductService.getImageDataById(id);
        if (imageData != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Adjust the content type if necessary
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if image is not found
        }
    }
}
