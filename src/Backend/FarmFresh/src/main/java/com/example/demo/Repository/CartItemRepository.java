package com.example.demo.Repository;

import com.example.demo.Model.CartItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByOrderIdIsNull();
	  @Query("SELECT c FROM CartItem c WHERE c.order.id IS NULL")
	    List<CartItem> findCartItemsWithNullOrderId();
}
