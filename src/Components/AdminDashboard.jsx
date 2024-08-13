import React, { useState, useEffect } from 'react';
import './Styles/AdminDashboard.css';
import AdminSidebar from './AdminSidebar'; // Import the sidebar
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    // Simulate the ticker effect
    let productsCount = 0;
    let categoriesCount = 0;
    let usersCount = 0;

    const productsInterval = setInterval(() => {
      if (productsCount < 100) {
        productsCount += 1;
        setProducts(productsCount);
      } else {
        clearInterval(productsInterval);
      }
    }, 10);

    const categoriesInterval = setInterval(() => {
      if (categoriesCount < 5) {
        categoriesCount += 1;
        setCategories(categoriesCount);
      } else {
        clearInterval(categoriesInterval);
      }
    }, 30);

    const usersInterval = setInterval(() => {
      if (usersCount < 150) {
        usersCount += 1;
        setUsers(usersCount);
      } else {
        clearInterval(usersInterval);
      }
    }, 20);

    return () => {
      clearInterval(productsInterval);
      clearInterval(categoriesInterval);
      clearInterval(usersInterval);
    };
  }, []);

  return (
    <div className='admin-body'>
      <div className="admin-dashboard-container">
        <AdminSidebar /> {/* Use the sidebar component */}
        <main className="admin-main-content">
          <h1>Admin Dashboard</h1>
          <br></br>
          <br></br>
          {/* <br></br> */}
          <div className="admin-stats-container">
            <div className="admin-stats-card">
              <h3>{users}+ Users</h3>
              <p>Total number of registered users.</p>
            </div>
            <div className="admin-stats-card">
              <h3>{products}+ Products</h3>
              <p>Total number of available products.</p>
            </div>
            <div className="admin-stats-card">
              <h3>{categories}+ Categories</h3>
              <p>Total number of product categories.</p>
            </div>
          </div>
          <div className="admin-recent-activities">
            <h3>Recent Activities</h3>
            <div className="admin-activity-card">
              <i className="fas fa-user-plus"></i>
              <p>New User added: Jane Doe</p>
            </div>
            <div className="admin-activity-card">
              <i className="fas fa-box"></i>
              <p>New Product added: Fresh Apples</p>
            </div>
            <div className="admin-activity-card">
              <i className="fas fa-tags"></i>
              <p>New Category created: Dairy Products</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
