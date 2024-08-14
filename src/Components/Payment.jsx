import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Styles/Payment.css';
const Payment = () => {
  const [cardData, setCardData] = useState({
    cvc: '',
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: ''
  });
  const [focused, setFocused] = useState('');
  const [phone, setPhone] = useState('');
  const [upi, setUpi] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleFocusChange = (e) => {
    setFocused(e.target.name);
  };
  const validateForm = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!cardData.name) newErrors.name = 'Name on card is required';
    if (!cardData.number) newErrors.number = 'Card number is required';
    if (!cardData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!cardData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!cardData.cvc) newErrors.cvc = 'CVC is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if(!upi) newErrors.upi = 'UPI ID is required';
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (cardData.number && !cardNumberPattern.test(cardData.number)) {
      newErrors.number = 'Card number format is invalid';
    }
    const expiryMonthPattern = /^(0[1-9]|1[0-2])$/;
    const expiryYearPattern = /^\d{2}$/;
    if (cardData.expiryMonth && !expiryMonthPattern.test(cardData.expiryMonth)) {
      newErrors.expiryMonth = 'Expiry month format should be MM';
    }
    if (cardData.expiryYear && !expiryYearPattern.test(cardData.expiryYear)) {
      newErrors.expiryYear = 'Expiry year format should be YY';
    }
    if (cardData.cvc && (cardData.cvc.length < 3 || cardData.cvc.length > 4)) {
      newErrors.cvc = 'CVV should be 3 or 4 digits';
    }
    if (upi && !upi.includes('@')) {
      newErrors.upi = 'UPI ID must contain "@"';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage('Order placed successfully!');
      await submitPayment();
    }
  };
  const submitPayment = async () => {
    try {
      const orderResponse = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        setErrors(errorData.errors || { general: 'Failed to place order' });
        return;
      }
      const paymentResponse = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cardData.name,
          number: cardData.number,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          cvc: cardData.cvc,
          phone: phone,
          upi: upi
        }),
      });
      if (paymentResponse.ok) {
        setSuccessMessage('Order placed and payment processed successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const errorData = await paymentResponse.json();
        setErrors(errorData.errors || { general: 'Failed to process payment' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={validateForm}>
        <div className="form-row">
          <div className="form-column">
            <h3 className="section-title">Billing Address</h3>
            <div className="input-group">
              <label>Full Name :</label>
              <input
                type="text"
                placeholder="Rakesh"
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.name && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.name}</div>}
            </div>
            <div className="input-group">
              <label>Email :</label>
              <input type="email" placeholder="example@example.com" required />
            </div>
            <div className="input-group">
              <label>Address :</label>
              <input type="text" placeholder="house number - Street - Locality" required />
            </div>
            <div className="input-group">
              <label>City :</label>
              <input type="text" placeholder="Coimbatore" required />
            </div>
            <div className="flex-container">
              <div className="flex-item">
                <div className="input-group">
                  <label>State :</label>
                  <input type="text" placeholder="Tamil Nadu" required />
                </div>
              </div>
              <div className="flex-item">
                <div className="input-group">
                  <label>Zip Code :</label>
                  <input type="text" placeholder="123 456" required />
                </div>
              </div>
            </div>
            <div className="input-group">
              <label>Phone :</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                inputStyle={{ width: '100%' }}
              />
              {errors.phone && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.phone}</div>}
            </div>
          </div>
          <div className="form-column">
            <h3 className="section-title">Payment</h3>
            <div className="input-group">
              <label>Cards Accepted :</label>
              <div className="card-icons">
                <FontAwesomeIcon icon={faCcVisa} color="#1a1f71" />
                <FontAwesomeIcon icon={faCcMastercard} color="#eb001b" />
                <FontAwesomeIcon icon={faCcAmex} color="#007bc1" />
                <FontAwesomeIcon icon={faCcPaypal} color="#003087" />
              </div>
            </div>
            <div className="input-group">
              <label>Name on Card :</label>
              <input
                type="text"
                placeholder="Rakesh"
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.name && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.name}</div>}
            </div>
            <div className="input-group">
              <label>Credit Card Number :</label>
              <input
                type="text"
                placeholder="1111-2222-3333-4444"
                name="number"
                value={cardData.number}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
                maxLength="19"
              />
              {errors.number && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.number}</div>}
            </div>
            <div className="input-group">
              <label>Exp Month :</label>
              <input
                type="text"
                placeholder="01"
                name="expiryMonth"
                value={cardData.expiryMonth}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.expiryMonth && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.expiryMonth}</div>}
            </div>
            <div className="input-group">
              <div className="flex-container">
                <div className="flex-item">
                  <label>Exp Year :</label>
                  <input
                    type="text"
                    placeholder="25"
                    name="expiryYear"
                    value={cardData.expiryYear}
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                    required
                  />
                  {errors.expiryYear && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.expiryYear}</div>}
                </div>
                <div className="flex-item">
                  <label>CVV :</label>
                  <input
                    type="text"
                    placeholder="123"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                    required
                    maxLength="4"
                  />
                  {errors.cvc && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.cvc}</div>}
                </div>
              </div>
            </div>
            <div className="input-group">
              <label>UPI ID :</label>
              <input
                type="text"
                placeholder="example@upi"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                required
              />
              {errors.upi && <div className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {errors.upi}</div>}
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Place Order</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Payment;
