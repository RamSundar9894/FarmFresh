// ProductsPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './CartContext';
import './Styles/ProductsPage.scss';
import Footer from './Footer';
import Navbar from './Navbar';

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const ProductsPage = () => {
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'All';
  const [products, setProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [buyingProduct, setBuyingProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch products from Product entity
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch approved products from AddProduct entity and their images
    const fetchApprovedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/add-products/approved');
        const productsWithImages = await Promise.all(response.data.map(async product => {
          try {
            const imageResponse = await axios.get(`http://localhost:8080/add-products/image/${product.id}`, { responseType: 'arraybuffer' });
            const base64Image = `data:image/jpeg;base64,${arrayBufferToBase64(imageResponse.data)}`;
            return { ...product, image: base64Image };
          } catch (imageError) {
            console.error('Error fetching image for product ID', product.id, imageError);
            return { ...product, image: null }; // Fallback if image fails
          }
        }));
        setApprovedProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching approved products:', error);
      }
    };

    fetchProducts();
    fetchApprovedProducts();
  }, []);

  useEffect(() => {
    // Combine and filter products based on category
    const allProducts = [...products, ...approvedProducts];
    const filtered = category === 'All'
      ? allProducts
      : allProducts.filter(product => product.category === category);

    setFilteredProducts(filtered);
  }, [products, approvedProducts, category]);

  const handleBuyNow = (productId) => {
    setBuyingProduct(productId);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleConfirm = async () => {
    const product = filteredProducts.find(p => p.id === buyingProduct);
    if (product) {
      console.log('Adding to cart:', { product, quantity }); // Log product and quantity
      try {
        await addToCart(product, quantity);
        setSuccessMessage(`${product.name} added to the cart successfully.`);
        setBuyingProduct(null);
        setQuantity(1);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      console.error('Product not found:', buyingProduct);
    }
  };

  return (
    <div>
      <div className="container">
        <Navbar />
        <section className="products w-120">
          <div className="products-header">
            <h1 className="products__title">Our Products</h1>
            <Link to="/add-product" className="btn btn__add-product">Add New Product</Link>
          </div>
          <p className="products__description">
            Explore our wide range of fresh farm products. Select a category to see more products.
          </p>
          <div className="products__categories">
            <Link to="/products" className="btn btn__category">All</Link>
            <Link to="/products?category=Fruits" className="btn btn__category">Fruits</Link>
            <Link to="/products?category=Vegetables" className="btn btn__category">Vegetables</Link>
            <Link to="/products?category=Grains" className="btn btn__category">Grains</Link>
            <Link to="/products?category=Greens" className="btn btn__category">Greens</Link>
            <Link to="/products?category=Dairy" className="btn btn__category">Dairy</Link>
          </div>
          <div className="products__list">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-item" data-type={product.category}>
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <p>No image available</p>
                )}
                <h2>{product.name}</h2>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
                {buyingProduct === product.id ? (
                  <div className="buy-counter-container">
                    <div className="buy-counter">
                      <button className="btn btn__minus" onClick={handleDecrease}>-</button>
                      <span className="quantity">{quantity} kg</span>
                      <button className="btn btn__plus" onClick={handleIncrease}>+</button>
                    </div>
                    <button className="btn btn__confirm" onClick={handleConfirm}>Confirm</button>
                  </div>
                ) : (
                  <button className="btn btn__buy-now" onClick={() => handleBuyNow(product.id)}>Buy</button>
                )}
              </div>
            ))}
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
