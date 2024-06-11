import axios from 'axios';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import '../style/postscount.css';

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

function PostCount() {
    const [dailyPostCounts, setDailyPostCounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('adminToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                // Fetch daily post counts
                const response = await axios.get('http://192.168.1.4:8000/api/admin/daily-post-counts', { headers });
                setDailyPostCounts(response.data.dailyPostCounts);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    // Transform data for daily post counts
    const transformDailyPostData = () => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dailyData = Array(7).fill(0); // Array to store daily counts

        // Map data from API to the days of the week
        dailyPostCounts.forEach(postCount => {
            const dayIndex = new Date(postCount.date).getDay(); // Get day index (0 for Sunday, 6 for Saturday)
            dailyData[dayIndex] = postCount.count;
        });

        return {
            labels: dayNames,
            data: dailyData,
        };
    };

    const { labels: dailyPostLabels, data: dailyPostData } = transformDailyPostData();

    // Prepare data for charts
    const barChartData = {
        labels: dailyPostLabels,
        datasets: [
            {
                label: 'Daily Post Counts',
                data: dailyPostData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = {
        labels: dailyPostLabels,
        datasets: [
            {
                label: 'Daily Post Counts',
                data: dailyPostData,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const pieChartData = {
        labels: ['Daily Posts'],
        datasets: [
            {
                data: dailyPostData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 235, 162, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 235, 162, 1)'
                ],
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Daily Post Counts'],
        datasets: [
            {
                data: dailyPostData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 235, 162, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 235, 162, 1)'
                ],
            },
        ],
    };

    return (
        <div className="post-count-container">
            <h1 style={{ color: 'white' }}>Post Counts</h1>

            {/* Cards in a 2x2 grid layout */}
            <div className="card-container">
                {/* Bar Chart */}
                <div className="card">
                    <h3>Bar Chart - Daily Post Counts</h3>
                    <div className="chart-container">
                        <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Line Chart */}
                <div className="card">
                    <h3>Line Chart - Daily Post Counts</h3>
                    <div className="chart-container">
                        <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="card">
                    <h3>Pie Chart - Daily Posts</h3>
                    <div className="chart-container">
                        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Doughnut Chart */}
                <div className="card">
                    <h3>Doughnut Chart - Daily Post Counts</h3>
                    <div class="chart-container">
                        <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCount;
