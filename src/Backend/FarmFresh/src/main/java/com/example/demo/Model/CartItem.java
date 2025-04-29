package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Product product;

    private int quantity;
    private double total;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;


    // Constructors
    public CartItem() {}

    public CartItem(Product product, int quantity, double total) {
        this.product = product;
        this.quantity = quantity;
        this.total = total;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}
