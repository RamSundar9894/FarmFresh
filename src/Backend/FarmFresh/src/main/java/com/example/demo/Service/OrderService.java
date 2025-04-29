package com.example.demo.Service;

import com.example.demo.Model.CartItem;
import com.example.demo.Model.Order;
import com.example.demo.Repository.CartItemRepository;
import com.example.demo.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class OrderService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder() {
        // Retrieve cart items with null order_id
        List<CartItem> cartItems = cartItemRepository.findByOrderIdIsNull();

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty or no items without order_id");
        }

        // Calculate the order total
        double orderTotal = cartItems.stream().mapToDouble(CartItem::getTotal).sum();
        String orderNumber = UUID.randomUUID().toString(); // Generate a unique order number

        // Create a new Order
        Order order = new Order(orderNumber, orderTotal, cartItems);

        // Save the Order, which should also persist the CartItems with the new order_id
        Order savedOrder = orderRepository.save(order);

        // Update each CartItem with the new Order
        for (CartItem item : cartItems) {
            item.setOrder(savedOrder);
            cartItemRepository.save(item);
        }

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
