import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Styles/CartPage.scss';

const OrderPage = () => {
  const { orders } = useContext(CartContext);

  if (!orders) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container-a">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <>
            {orders.map((order) => (
              <div key={order.id} className="order-box">
                <h2 className="order-number">Order #{order.orderNumber}</h2>
                {order.items.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="cart-item__image" 
                    />
                    <div className="cart-item__details">
                      <h2>{item.product.name}</h2>
                      <p>Price per kg: ₹{item.product.price.toFixed(2)}</p>
                      <p>Quantity: {item.quantity} kg</p>
                      <p>Total: ₹{item.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="order-summary">
                  <h2>Order Total: ₹{order.orderTotal.toFixed(2)}</h2>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
