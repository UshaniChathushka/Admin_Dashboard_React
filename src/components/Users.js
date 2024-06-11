import React, { useEffect, useState } from 'react';
import { apiDeleteUser, apiGetUsers } from '../api';
import '../style/users.css';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiGetUsers();
                setUsers(response.data.users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        // Display a confirmation popup
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');

        // If the user confirms the action
        if (isConfirmed) {
            try {
                // Call the API to delete the user
                await apiDeleteUser(userId);

                // Remove the deleted user from the state
                setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
                
                // Optionally, display a success message or notification
                alert('User deleted successfully.');
            } catch (error) {
                console.error('Failed to delete user:', error);
                // Optionally, display an error message or notification
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    return (
        <div className="users-container">
            <h2>Users</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Birthday</th>
                        <th>Bio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.fullname}</td>
                            <td>{user.username}</td>
                            <td>{user.birthday}</td>
                            <td>{user.bio}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;