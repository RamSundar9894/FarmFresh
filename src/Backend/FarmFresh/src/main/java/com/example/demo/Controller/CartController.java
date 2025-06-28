package com.example.demo.Controller;
import com.example.demo.Model.CartItem;
import com.example.demo.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get only items in the cart that are not associated with any order
    @GetMapping
    public List<CartItem> getCartItemsWithNullOrderId() {
        return cartService.getCartItemsWithNullOrderId();
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartService.addToCart(cartItem);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
}
