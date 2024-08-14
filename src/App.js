import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home';
import ProductsPage from './Components/ProductsPage';
import CartPage from './Components/CartPage';
import LoginPage from './Components/Login';
import SignupPage from './Components/Signup';
import PaymentPage from './Components/Payment'; 
import OrderPage from './Components/Order'; 
import ContactUs from './Components/ContactUs';
import AddProductPage from './Components/AddProductPage';
import AdminDashboard from './Components/AdminDashboard';
import AdminOwner from './Components/AdminProducts';
import AdminUsers from './Components/AdminUsers';
import { AuthProvider } from './Components/AuthContext';
import { CartProvider } from './Components/CartContext';
import AdminAddProductConfirmation from './Components/AdminProductConfirmation';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/adminproducts" element={<AdminOwner />} />
            <Route path="/adminusers" element={<AdminUsers />} />
            <Route path="/admin/add-product-confirmation" element={<AdminAddProductConfirmation />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;