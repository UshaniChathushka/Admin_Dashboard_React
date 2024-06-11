import axios from 'axios';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import '../style/userscount.css';

// Register chart elements
ChartJS.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

function UsersCount() {
    const [allUsers, setAllUsers] = useState([]);
    const [dailyRegisteredUsers, setDailyRegisteredUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('adminToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                // Fetch all users
                const allUsersResponse = await axios.get('http://192.168.1.4:8000/api/getAllUsers', { headers });
                setAllUsers(allUsersResponse.data.users);

                // Fetch daily registered users
                const dailyRegisteredResponse = await axios.get('http://192.168.1.4:8000/api/daily-user-registrations', { headers });
                setDailyRegisteredUsers(dailyRegisteredResponse.data.dailyRegistrations);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    // Transform data for daily registered users
    const transformDailyRegisteredData = () => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dailyData = Array(7).fill(0); // Array to store daily counts

        // Map data from API to the days of the week
        dailyRegisteredUsers.forEach(reg => {
            const dayIndex = new Date(reg.date).getDay(); // Get day index (0 for Sunday, 6 for Saturday)
            dailyData[dayIndex] = reg.count;
        });

        return {
            labels: dayNames,
            data: dailyData,
        };
    };

    const { labels: dailyRegisteredLabels, data: dailyRegisteredData } = transformDailyRegisteredData();

    // Prepare data for charts
    const barChartData = {
        labels: dailyRegisteredLabels,
        datasets: [
            {
                label: 'Daily Registered Users',
                data: dailyRegisteredData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = {
        labels: dailyRegisteredLabels,
        datasets: [
            {
                label: 'Daily Registered Users',
                data: dailyRegisteredData,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const pieChartData = {
        labels: ['All Users'],
        datasets: [
            {
                data: [allUsers.length],
                backgroundColor: ['rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Daily Registered Users'],
        datasets: [
            {
                data: [dailyRegisteredData.reduce((a, b) => a + b, 0)],
                backgroundColor: ['rgba(255, 206, 86, 0.6)'],
                borderColor: ['rgba(255, 206, 86, 1)'],
            },
        ],
    };

    return (
        <div className="users-count-container">
            <h1 style={{ color: 'white' }}>Users Count</h1>

            {/* Cards in a 2x2 grid layout */}
            <div className="card-container">
                {/* Bar Chart */}
                <div className="card">
                    <h3>Bar Chart - Daily Registered Users</h3>
                    <div className="chart-container">
                        <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Line Chart */}
                <div className="card">
                    <h3>Line Chart - Daily Registered Users</h3>
                    <div className="chart-container">
                        <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="card">
                    <h3>Pie Chart - All Users</h3>
                    <div className="chart-container">
                        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Doughnut Chart */}
                <div className="card">
                    <h3>Doughnut Chart - Daily Registered Users</h3>
                    <div className="chart-container">
                        <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersCount;
