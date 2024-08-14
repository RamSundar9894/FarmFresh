import React, { useState } from 'react';
const Counter = ({ initialQuantity, onQuantityChange, showCounter }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const increaseQuantity = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };
  const decreaseQuantity = () => {
    setQuantity(prev => {
      if (prev > 0) {
        const newQuantity = prev - 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      }
      return prev;
    });
  };
  if (!showCounter) return null;
  return (
    <div className="counter">
      <button onClick={decreaseQuantity}>-</button>
      <span>{quantity}</span>
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
};
export default Counter;