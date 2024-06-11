import React, { useEffect, useState } from 'react';
import { FaBars, FaComments, FaRegFileAlt, FaTachometerAlt, FaUserFriends, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { apiGetAdminProfile } from '../api';
import '../style/sidebar.css';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [adminProfilePicture, setAdminProfilePicture] = useState('');
    const imageBaseUrl = 'http://192.168.1.4:8000/admin_picture/admin.jpg';

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await apiGetAdminProfile();
                setAdminProfilePicture(response.data.profile_picture);
            } catch (error) {
                console.error('Failed to fetch admin profile:', error);
            }
        };

        fetchAdminProfile();
    }, []);

    const adminName = 'Chathushka';

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-toggle">
                <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="toggle-icon" />
            </div>
            {isSidebarOpen && (
                <>
                    <div className="admin-profile">
                        <img
                            src={`${imageBaseUrl}${adminProfilePicture}`}
                            alt="Admin Profile"
                            className="profile-picture"
                        />
                        <div className="admin-name">{adminName}</div>
                    </div>

                    <nav className="nav-links">
                        <NavLink to="/dashboard" activeClassName="active-link">
                            <FaTachometerAlt className="nav-icon" />
                            Dashboard
                        </NavLink>

                        <div className="chart-section">
                            <div className="chart-header">Data Visualization</div>
                            <hr className="section-divider" /> {/* Add a horizontal line */}
                            <NavLink to="/userscount" activeClassName="active-link">
                                <FaUsers className="nav-icon" />
                                Users Count
                            </NavLink>
                            <NavLink to="/postscount" activeClassName="active-link">
                                <FaRegFileAlt className="nav-icon" />
                                Posts Count
                            </NavLink>
                        </div>

                        <NavLink to="/posts" activeClassName="active-link">
                            <FaRegFileAlt className="nav-icon" />
                            Posts
                        </NavLink>
                        <NavLink to="/users" activeClassName="active-link">
                            <FaUserFriends className="nav-icon" />
                            Users
                        </NavLink>
                        <NavLink to="/comments" activeClassName="active-link">
                            <FaComments className="nav-icon" />
                            Comments
                        </NavLink>
                    </nav>
                </>
            )}
        </div>
    );
}

export default Sidebar;
