import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.4:8000/api', // Adjust your base URL accordingly
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define functions for API endpoints
export const apiGetUsers = () => api.get('/admin/getAllUsers');

export const apiGetComments = () => api.get('/comments');
export const apiDeleteUser = (userId) => api.delete(`/admin/users/${userId}`);

// API function for fetching user counts
export const apiGetUserCounts = () => api.get('/admin/userCount');


// apiGetPostCounts function fetches the post counts (if you have an endpoint for this)
export const apiGetPostCounts = () => api.get('/admin/postCount');

export const apiGetDailyUserRegistrations = () => api.get('/daily-user-registrations');
export const apiGetDailyPostCounts = () => api.get('/admin/daily-post-count');
// Fetch all posts
export const apiGetPosts = () => api.get('/admin/getAllPosts');

// Delete a post
export const apiDeletePost = (postId) => api.delete(`/admin/deletePost/${postId}`);

// Fetch all comments
export const apiGetAllComments = () => api.get('/admin/getAllComments');


// Delete a comment
export const apiDeleteComment = (commentId) => api.delete(`/admin/deleteComment/${commentId}`);

// Define function for fetching admin profile
export const apiGetAdminProfile = () => api.get('/admin/profile');
