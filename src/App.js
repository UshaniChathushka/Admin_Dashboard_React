import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './components/AdminLogin';
import Comments from './components/Comments';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import PostsCount from './components/PostsCount';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import UsersCount from './components/UsersCount';
import Welcome from './components/Welcome';

function App() {
    // Mock admin data
    const adminData = {
        adminName: 'Admin',
        adminProfilePicture: '/path-to-admin-picture.jpg', // Update with actual path
    };

    return (
        <div className="app-container">
            <Routes>
                {/* Welcome Page */}
                <Route path="/" element={<Welcome />} />

                {/* Admin Login Page */}
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Dashboard Layout */}
                <Route
                    path="/dashboard"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminProfilePicture} />
                            <div className="main-content">
                                <Dashboard />
                            </div>
                        </div>
                    }
                />

                {/* Users Count Page */}
                <Route
                    path="/userscount"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminProfilePicture} />
                            <div className="main-content">
                                <UsersCount />
                            </div>
                        </div>
                    }
                />

                {/* Posts Count Page */}
                <Route
                    path="/postscount"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminProfilePicture} />
                            <div className="main-content">
                                <PostsCount />
                            </div>
                        </div>
                    }
                />

                {/* Users Page */}
                <Route
                    path="/users"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminProfilePicture} />
                            <div className="main-content">
                                <Users />
                            </div>
                        </div>
                    }
                />

                {/* Posts Page */}
                <Route
                    path="/posts"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminName} />
                            <div className="main-content">
                                <Posts />
                            </div>
                        </div>
                    }
                />

                {/* Comments Page */}
                <Route
                    path="/comments"
                    element={
                        <div className="dashboard-layout">
                            <Sidebar adminName={adminData.adminName} adminProfilePicture={adminData.adminProfilePicture} />
                            <div className="main-content">
                                <Comments />
                            </div>
                        </div>
                    }
                />

                {/* Redirect to dashboard if user is already authenticated */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </div>
    );
}

export default App;
