import React, { useEffect, useState } from 'react';
import { apiDeletePost, apiGetPosts } from '../api'; // Adjust the path to your API file if needed
import '../style/posts.css'; // Adjust the path to your CSS file if needed

function Posts() {
    // State to hold all posts
    const [posts, setPosts] = useState([]);

    // Fetch all posts when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts from the API
                const response = await apiGetPosts();

                // Sort posts in ascending order by ID
                const sortedPosts = response.data.posts.sort((a, b) => a.id - b.id);

                // Set sorted posts to state
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        // Fetch posts when the component mounts
        fetchPosts();
    }, []);

    // Function to handle post deletion
    const handleDeletePost = async (postId) => {
        // Confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');

        if (isConfirmed) {
            try {
                // Delete post using the API
                await apiDeletePost(postId);

                // Remove post from state by filtering it out
                setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));

                // Optionally, display success message
                alert('Post deleted successfully.');
            } catch (error) {
                console.error('Failed to delete post:', error);
                // Optionally, display error message
                alert('Failed to delete post. Please try again.');
            }
        }
    };

     // Define the base URL for images stored in the backend
     const imageBaseUrl = 'http://192.168.1.4:8000/posts/'; // Adjust the base URL as needed

    // Render the component
    return (
        <div className="posts-container">
            {/* Render posts in a table */}
            <table className="posts-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>
                                {/* Display image if exists */}
                                {post.photo && (
                                    <img
                                        src={`${imageBaseUrl}${post.photo}`}
                                        alt={post.title}
                                        className="post-photo"
                                    />
                                )}
                            </td>
                            <td>
                                {/* Delete button for the post */}
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Posts;
