import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                username, 
                password
            });
            const data = response.data;

            if (data === "Login successful!") {
                setUser(username);
                return { success: true, message: data };
            } else {
                return { success: false, message: data };
            }
        } catch (error) {
            console.error('Login failed', error);
            return { success: false, message: error.response?.data?.message || 'Failed to connect to the server' };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                username, 
                email,
                password
            });
            const data = response.data;

            if (data === "User registered successfully!") {
                setUser(username); // Set the username or any user data as needed
                return { success: true, message: data };
            } else {
                return { success: false, message: data };
            }
        } catch (error) {
            console.error('Registration failed', error);
            return { success: false, message: error.response?.data?.message || 'Failed to connect to the server' };
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
