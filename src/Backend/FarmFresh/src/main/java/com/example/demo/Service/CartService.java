package com.example.demo.Service;
import com.example.demo.Model.CartItem;
import com.example.demo.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    // Retrieve cart items with null order_id
    public List<CartItem> getCartItemsWithNullOrderId() {
        return cartItemRepository.findCartItemsWithNullOrderId();
    }

    public CartItem addToCart(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void removeFromCart(Long id) {
        cartItemRepository.deleteById(id);
    }
}
