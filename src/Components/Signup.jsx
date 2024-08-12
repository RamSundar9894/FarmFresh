import React, { useState, useContext } from 'react';
import './style.css';
import waveImg from './Images/wave.png';
import bgImg from './Images/bg.svg';
import avatarImg from './Images/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [apiMessage, setApiMessage] = useState('');

    // Validation function
    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@gmail\.com$/.test(formData.email)) {
            newErrors.email = 'Email must end with @gmail.com';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle input focus
    const handleFocus = (e) => {
        const parent = e.target.closest('.input-container');
        if (parent) parent.classList.add('focus');
    };

    // Handle input blur
    const handleBlur = (e) => {
        const parent = e.target.closest('.input-container');
        if (parent && !e.target.value) {
            parent.classList.remove('focus');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setApiMessage(''); // Clear API message if there are validation errors
        } else {
            try {
                const response = await axios.post('http://localhost:8080/users/signup', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                const message = response.data;
                if (message === "User registered successfully!") {
                    login(formData.username); // Automatically log in the user after signup
                    navigate('/login');
                } else {
                    setApiMessage(message);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setApiMessage(error.response.data);
                } else {
                    console.error('API request failed:', error);
                    setApiMessage('Failed to connect to the server');
                }
            }
        }
    };

    return (
        <div>
            <Navbar />
            <img className="background-wave" src={waveImg} alt="wave" />
            <div className="main-container">
                <div className="image-container">
                    <img src={bgImg} alt="background" />
                </div>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <img src={avatarImg} alt="avatar" />
                        <h2 className="login-title">Sign Up</h2>
                        {apiMessage && <div className="error-message">{apiMessage}</div>}
                        <div className={`input-container username-container ${errors.username ? 'error' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="input-field">
                                <h5>Username</h5>
                                <input
                                    type="text"
                                    name="username"
                                    className="text-input"
                                    value={formData.username}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {errors.username && <small>{errors.username}</small>}
                            </div>
                        </div>
                        <div className={`input-container email-container ${errors.email ? 'error' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="input-field">
                                <h5>Email</h5>
                                <input
                                    type="email"
                                    name="email"
                                    className="text-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {errors.email && <small>{errors.email}</small>}
                            </div>
                        </div>
                        <div className={`input-container password-container ${errors.password ? 'error' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className="input-field">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    name="password"
                                    className="text-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {errors.password && <small>{errors.password}</small>}
                            </div>
                        </div>
                        <div className={`input-container confirm-password-container ${errors.confirmPassword ? 'error' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className="input-field">
                                <h5>Confirm Password</h5>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="text-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
                            </div>
                        </div>
                        <input type="submit" className="submit-btn" value="Sign Up" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
