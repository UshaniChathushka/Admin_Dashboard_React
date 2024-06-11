import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../style/dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('adminToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                // Fetch total user count
                const userResponse = await axios.get('http://192.168.1.4:8000/api/admin/getAllUsers', { headers });
                setUserCount(userResponse.data.users.length);

                // Fetch total post count
                const postCountResponse = await axios.get('http://192.168.1.4:8000/api/admin/postCount', { headers });
                setPostCount(postCountResponse.data.postCount);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Failed to fetch data', err);
            }
        };

        fetchData();
    }, []);

    const userChartData = {
        labels: ['Users'],
        datasets: [
            {
                label: 'Total Users',
                data: [userCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)'],
            },
        ],
    };

    const postChartData = {
        labels: ['Posts'],
        datasets: [
            {
                label: 'Total Posts',
                data: [postCount],
                backgroundColor: ['rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="dashboard-container">
            <h1 style={{ color: 'white' }}>Dashboard</h1>

            {error && <p className="error">{error}</p>}

            <div className="card-container">
                {/* Total Users card */}
                <div className="card">
                    <h3>Total Users</h3>
                    <p>{userCount}</p>
                    <p>Total number of registered users on the platform.</p>
                </div>

                {/* Total Posts card */}
                <div className="card">
                    <h3>Total Posts</h3>
                    <p>{postCount}</p>
                    <p>Total number of posts created on the platform.</p>
                </div>

                {/* Users Bar Chart card */}
                <div className="card">
                    <h3>Users Chart</h3>
                    <div className="chart-container">
                        <Bar data={userChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Posts Bar Chart card */}
                <div className="card">
                    <h3>Posts Chart</h3>
                    <div className="chart-container">
                        <Bar data={postChartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
