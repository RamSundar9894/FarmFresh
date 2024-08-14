import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Logo from './Images/LOGO.png';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import './Styles/Navbar.css';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isActive = (path) => location.pathname === path ? 'active' : '';
  const hideCart = location.pathname === '/login' || location.pathname === '/signup';
  const renderAuthButtons = () => {
    if (location.pathname === '/login') {
      return <Link to="/signup" className="btn btn__signup">Sign Up</Link>;
    } else if (location.pathname === '/signup') {
      return user ? (
        <>
          <span className="btn username">{user}</span>
          <button className="btn btn__logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login" className="btn btn__login">Login</Link>
      );
    } else {
      return user ? (
        <>
          <span className="btn username">{user}</span>
          <button className="btn btn__logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn__login">Login</Link>
          <Link to="/signup" className="btn btn__signup">Sign Up</Link>
        </>
      );
    }
  };
  const cartItems = Array.isArray(cart) ? cart : [];
  return (
    <header>
      <nav className="header__nav w-120">
        <div className="header__logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="header__nav__content">
          <ul className="header__menu">
            <li className="menu__item">
              <Link to="/" className={`menu__link ${isActive('/')}`}>Home</Link>
            </li>
            <li className="menu__item">
              <Link to="/products" className={`menu__link ${isActive('/products')}`}>Products</Link>
            </li>
            <li className="menu__item">
              <Link to="/order" className={`menu__link ${isActive('/order')}`}>Order</Link>
            </li>
            <li className="menu__item">
              <Link to="/contact" className={`menu__link ${isActive('/contact')}`}>Contact</Link>
            </li>
          </ul>
          <div className="header__auth">
            {renderAuthButtons()}
            {!hideCart && (
              <Link to="/cart" className="header__cart">
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;