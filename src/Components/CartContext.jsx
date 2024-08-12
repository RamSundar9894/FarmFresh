import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const addToCart = async (product, quantity) => {
    try {
      const total = product.price * quantity;
      const cartItem = { product, quantity, total };
      await axios.post('http://localhost:8080/cart', cartItem);
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${cartItemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      // Place order
      await axios.post('http://localhost:8080/orders');

      // Refresh cart and orders
      fetchCart(); // Optional: Refresh cart if needed
      fetchOrders();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, placeOrder, orders,fetchCart,fetchOrders }}>
      {children}
    </CartContext.Provider>
  );
};