import React, { useState, useContext } from 'react';
import './style.css';
import waveImg from './Images/wave.png';
import bgImg from './Images/bg.svg';
import avatarImg from './Images/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            const response = await login(username, password);
            if (response.success) {
                const { role } = response;
                if (username==='AdminUser') {
                    navigate('/admin');
                } else if (role === 'moderator') {
                    navigate('/moderator'); // Add a route for moderators if necessary
                } else {
                    navigate('/');
                }
            } else {
                setErrorMessage(response.message);
            }
        } else {
            setErrorMessage('Please fill in both fields');
        }
    };
    return (
        <div>
            <img className="background-wave" src={waveImg} alt="wave" />
            <div className="main-container">
                <Navbar />
                <div className="image-container">
                    <img src={bgImg} alt="background" />
                </div>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <img src={avatarImg} alt="avatar" />
                        <h2 className="login-title">Welcome</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className={`input-container username-container ${usernameFocus || username ? 'focus' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="input-field">
                                <h5>Username</h5>
                                <input
                                    type="text"
                                    className="text-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                />
                            </div>
                        </div>
                        <div className={`input-container password-container ${passwordFocus || password ? 'focus' : ''}`}>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className="input-field">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    className="text-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                            </div>
                        </div>
                        <input type="submit" className="submit-btn" value="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;