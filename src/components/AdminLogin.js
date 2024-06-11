import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/adminlogin.css'; // Import your CSS styles

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post('http://192.168.1.4:8000/api/admin/login', {
                email,
                password
            });

            // Store token in local storage
            localStorage.setItem('adminToken', response.data.token);

            // Navigate to the dashboard
            navigate('/dashboard');
        } catch (error) {
            // Handle error
            console.error('Failed to login:', error);
            // Display an error message to the user
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default AdminLogin;
