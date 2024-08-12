import React, { useState } from 'react';
import axios from 'axios';
import styles from './Styles/AddProductPage.module.scss';
import Navbar from './Navbar';

const AddProductPage = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Handle image file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the price is not empty or null
    if (!price || isNaN(price)) {
      setErrorMessage('Please enter a valid price.');
      return;
    }

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('category', category);
    formData.append('name', name);
    formData.append('price', parseFloat(price)); // Parse the price correctly
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await axios.post('http://localhost:8080/add-products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        // Clear form fields
        setCategory('');
        setName('');
        setPrice('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding product:', error); // Log the error
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
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
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>Price (₹):</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className={styles.input}
              accept="image/*" // Accept only image files
              required
            />
          </div>
          <button type="submit" className={styles.btnSubmit}>Add Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
