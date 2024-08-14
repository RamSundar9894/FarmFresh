import React, { useState, useEffect } from 'react';
import './Styles/AdminDashboard.css';
import AdminSidebar from './AdminSidebar'; // Import the sidebar
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminDashboard = () => {
  return (
    <div className='admin-body'>
      <div className="admin-dashboard-container">
        <AdminSidebar /> {/* Use the sidebar component */}
        <main className="admin-main-content">
          <h1>Admin Dashboard</h1>
          <br></br>
          <br></br>
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
