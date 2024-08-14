import React, { useState } from 'react';
import Navbar from './Navbar';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/700.css'; 
import '@fontsource/open-sans/400.css'; 
import '@fontsource/open-sans/600.css'; 
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setErrorMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }

        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
        }, 3000);
    };
    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.contentContainer}>
                    {successMessage && (
                        <div style={styles.successMessage}>
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div style={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                    <div style={styles.infoContainer}>
                        <h2 style={styles.infoTitle}>About Farmfresh</h2>
                        <p style={styles.infoText}>
                            Welcome to Farmfresh, your go-to source for fresh, organic produce. We take pride in
                            offering a wide variety of fruits, vegetables, dairy, grains, and greens, all sourced
                            from local farms. Our mission is to deliver the highest quality products to your doorstep,
                            ensuring you and your family enjoy the best nature has to offer.
                        </p>
                        <p style={styles.infoText}>
                            Join our community today and experience the freshness of Farmfresh.
                        </p>
                    </div>
                    <div style={styles.formContainer}>
                        <h2 style={styles.title}>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="phone">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={styles.textarea}
                                ></textarea>
                            </div>
                            <button type="submit" style={styles.button}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px',
        marginTop: '47px',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        maxWidth: '1200px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative', // Make sure the success message can be positioned absolutely
    },
    infoContainer: {
        padding: '30px',
        width: '50%',
        backgroundColor: '#ffffff',
        borderRadius: '12px 0 0 12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Open Sans, sans-serif',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    formContainer: {
        padding: '30px',
        width: '50%',
        backgroundColor: '#ffffff',
        borderRadius: '0 12px 12px 0',
        fontFamily: 'Open Sans, sans-serif',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    title: {
        marginBottom: '20px',
        fontSize: '26px',
        color: '#2f4f2f',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: '700',
    },
    infoTitle: {
        marginBottom: '20px',
        fontSize: '26px',
        color: '#2f4f2f',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: '700',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '16px',
        color: '#4a5a4a',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: '400',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #d1e2d1',
        fontSize: '16px',
        color: '#333',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Open Sans, sans-serif',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #d1e2d1',
        fontSize: '16px',
        color: '#333',
        outline: 'none',
        minHeight: '120px',
        resize: 'vertical',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Open Sans, sans-serif',
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        fontFamily: 'Raleway, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
        backgroundColor: '#45a049',
        transform: 'scale(1.02)',
    },
    infoText: {
        fontSize: '16px',
        color: '#4a5a4a',
        lineHeight: '1.6',
        marginBottom: '15px',
    },
    successMessage: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        fontFamily: 'Open Sans, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '10',
    },
    errorMessage: {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        fontFamily: 'Open Sans, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '10',
    },
};
export default ContactUs;