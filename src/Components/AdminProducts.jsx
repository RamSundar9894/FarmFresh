import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/AdminProducts.css';
import AdminSidebar from './AdminSidebar'; // Import the sidebar
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setSuccessMessage('Failed to fetch products.'); // Set error message
    } finally {
      setIsLoading(false); // Ensure loading state is set to false
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      setSuccessMessage('Product deleted successfully!'); // Set success message
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      setSuccessMessage('Failed to delete product.'); // Set error message
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='admin-body'>
      <div className="admin-dashboard-container">
        <AdminSidebar /> {/* Use the sidebar component */}
        <main className="admin-main-content">
          <h1>Admin Products</h1>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="products-table">
            {isLoading ? (
              <p>Loading products...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <button onClick={() => deleteProduct(product.id)}>
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;
