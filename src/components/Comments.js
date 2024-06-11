import React, { useEffect, useState } from 'react';
import { apiDeleteComment, apiGetAllComments } from '../api';
import '../style/comments.css';

function Comments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiGetAllComments();
                setComments(response.data.comments);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
        fetchComments();
    }, []);

    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm('Are you sure you want to delete this comment?');
        if (confirmed) {
            try {
                await apiDeleteComment(commentId);
                setComments(comments.filter(comment => comment.id !== commentId));
                alert('Comment deleted successfully.');
            } catch (error) {
                console.error('Failed to delete comment:', error);
                alert('Failed to delete comment. Please try again.');
            }
        }
    };

    return (
        <div className="comments-container">
            
            <table className="comments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Comment</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.comment}</td>
                            <td>{comment.user ? comment.user.username : 'Unknown User'}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteComment(comment.id)}
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

export default Comments;
