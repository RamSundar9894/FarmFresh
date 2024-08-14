import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Styles/CartPage.scss';
const CartPage = () => {
  const { cart, removeFromCart, fetchCart } = useContext(CartContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  const totalPrice = cart.reduce((total, item) => total + item.total, 0);
  const handleRemoveItem = async (cartItemId) => {
    await removeFromCart(cartItemId);
    setSuccessMessage('Item removed from the cart successfully.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  const handleCheckout = () => {
    navigate('/payment');
  };
  return (
    <div>
      <Navbar />
      <div className="container-a">
        <h1>Your Cart</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item__image" />
                <div className="cart-item__details">
                  <h2>{item.product.name}</h2>
                  <p>Price per kg: ₹{item.product.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity} kg</p>
                  <p>Total: ₹{item.total.toFixed(2)}</p>
                </div>
                <button className="btn btn__remove" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
              <button className="btn btn__checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default CartPage;