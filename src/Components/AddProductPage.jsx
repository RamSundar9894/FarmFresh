import React, { useState } from 'react';
import axios from 'axios';
import styles from './Styles/AddProductPage.module.scss';

const AddProductPage = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = {
        category,
        name,
        price: parseFloat(price),
        image,
      };

      await axios.post('http://localhost:8080/products', product);

      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      // Clear form fields
      setCategory('');
      setName('');
      setPrice('');
      setImage('');
    } catch (error) {
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Product</h1>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Price (₹):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.btnSubmit}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
