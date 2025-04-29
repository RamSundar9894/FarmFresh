package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "product") // Specify the table name explicitly if desired
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String name;
    private Double price;
    private String image;

    // Default constructor
    public Product() {}

    // Parameterized constructor
    public Product(String category, String name, Double price, String image) {
        this.category = category;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
