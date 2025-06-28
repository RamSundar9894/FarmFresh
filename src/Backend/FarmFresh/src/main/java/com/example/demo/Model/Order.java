package com.example.demo.Model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNumber;
    private Double orderTotal;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<CartItem> items;

    // Default constructor
    public Order() {}

    // Parameterized constructor
    public Order(String orderNumber, Double orderTotal, List<CartItem> items) {
        this.orderNumber = orderNumber;
        this.orderTotal = orderTotal;
        this.items = items;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Double getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(Double orderTotal) {
        this.orderTotal = orderTotal;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
