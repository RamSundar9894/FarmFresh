import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Farmfresh Admin</h2>
      </div>  
      <nav className="admin-sidebar-nav">
        <ul>
          <li onClick={() => navigate("/admin")}><i><FaTachometerAlt /></i> Dashboard</li>
          <li onClick={() => navigate("/adminusers")}><i className="fas fa-users"></i> Users</li>
          <li onClick={() => navigate("/adminproducts")}><i className="fas fa-box"></i> Products</li>
          <li onClick={() => navigate("/admin/add-product-confirmation")}><i className="fas fa-plus-circle"></i> Product Status</li>
        </ul>
      </nav>
      <div className="admin-logout">
        <Link to='/login'> <i className="fas fa-sign-out-alt"></i> Logout</Link>
      </div>
    </aside>
  );
};
export default AdminSidebar;
