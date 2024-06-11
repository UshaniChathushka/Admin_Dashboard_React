import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo2.png'; // Import the logo image
import '../style/welcome.css';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <img src={logo} alt="DORA Logo" className="dora-logo" />
            <h1>Welcome to DORA Admin Dashboard</h1>
            <p className="welcome-description">
                Empowering mental health support through innovation. Manage user posts, comments, and more.
            </p>
            <div className="feature-cards">
                <div className="card">
                    <h2>Manage Posts</h2>
                    <p>Review and moderate user posts.</p>
                </div>
                <div className="card">
                    <h2>Manage Comments</h2>
                    <p>Control and respond to user comments.</p>
                </div>
                <div className="card">
                    <h2>Manage Users</h2>
                    <p>Handle user accounts and permissions.</p>
                </div>
            </div>
            <button
                onClick={() => navigate('/admin-login')}
                className="get-started-button"
            >
                Get Started
            </button>
        </div>
    );
}

export default Welcome;
