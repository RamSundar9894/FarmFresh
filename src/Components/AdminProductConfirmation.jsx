import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/AdminProductConfirmation.css';
import AdminSidebar from './AdminSidebar';
const AdminProductConfirmation = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const fetchProducts = async () => {
    try {
      const approvedResponse = await axios.get('http://localhost:8080/add-products/approved');
      const pendingResponse = await axios.get('http://localhost:8080/add-products/pending');
      const productsWithImages = await Promise.all(pendingResponse.data.map(async (product) => {
        try {
          const imageResponse = await axios.get(`http://localhost:8080/add-products/image/${product.id}`, { responseType: 'arraybuffer' });
          const base64Image = `data:image/jpeg;base64,${arrayBufferToBase64(imageResponse.data)}`;
          return { ...product, image: base64Image };
        } catch (imageError) {
          console.error('Error fetching image for product ID', product.id, imageError);
          return { ...product, image: null }; // Fallback if image fails
        }
      }));

      setApprovedProducts(approvedResponse.data);
      setPendingProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/add-products/approve/${id}`);
      setSuccessMessage('Product approved successfully!');
      fetchProducts(); 
    } catch (error) {
      console.error('Error approving product ID', id, error);
    }
  };
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/add-products/reject/${id}`);
      setSuccessMessage('Product rejected successfully!'); 
      fetchProducts();
    } catch (error) {
      console.error('Error rejecting product ID', id, error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="admin-product-confirmation">
      <AdminSidebar className="admin-sidebar" />
      <div className="main-content">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <h1>Product Confirmation</h1>
        
        <h2>Pending Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.length > 0 ? (
              pendingProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-image" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.approvalStatus ? 'Approved' : 'Pending'}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(product.id)}
                      disabled={product.approvalStatus} 
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(product.id)}
                      disabled={product.approvalStatus} 
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No pending products available</td>
              </tr>
            )}
          </tbody>
        </table>
        <h2>Approved Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedProducts.length > 0 ? (
              approvedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-image" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.approvalStatus ? 'Approved' : 'Pending'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No approved products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductConfirmation;
