import React, { useState } from 'react';
import './WebAnalytics.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialData = [
  { date: 'Sat', sessions: 7 },
  { date: 'Sun', sessions: 14 },
  { date: 'Mon', sessions: 5 },
  { date: 'Tue', sessions: 8 },
  { date: 'Wed', sessions: 8 },
  { date: 'Thu', sessions: 9 },
  { date: 'Fri', sessions: 7 },
];

export default function WebAnalytics() {
  const [analytics, setAnalytics] = useState({
    sessions: 7,
    buyClicks: 0,
    transactions: 0,
    revenue: 0,
    data: initialData,
  });

  const handleExport = () => {
    const input = document.getElementById('chart');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('WebAnalyticsReport.pdf');
    });
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    if (selectedFilter === 'Last 30 Days') {
      setAnalytics((prevState) => ({
        ...prevState,
        data: [
          { date: 'Week 1', sessions: 20 },
          { date: 'Week 2', sessions: 35 },
          { date: 'Week 3', sessions: 30 },
          { date: 'Week 4', sessions: 25 },
        ],
      }));
    } else if (selectedFilter === 'This Month') {
      setAnalytics((prevState) => ({
        ...prevState,
        data: [
          { date: '1st', sessions: 10 },
          { date: '10th', sessions: 15 },
          { date: '20th', sessions: 20 },
          { date: '30th', sessions: 12 },
        ],
      }));
    } else {
      setAnalytics((prevState) => ({
        ...prevState,
        data: initialData,
      }));
    }
  };

  return (
    <div className="analytics-wrapper dark-theme">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>
            Analyze your sales and traffic to know your brand’s growth{' '}
            <a href="#">Learn how →</a>
          </p>
        </div>
      </div>

      {/* Filter & Export */}
      <div className="analytics-controls">
        <select onChange={handleFilterChange}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
        <button className="btn export-btn" onClick={handleExport}>
          Export as PDF
        </button>
      </div>

      {/* Stats Cards */}
      <div className="analytics-cards">
        <div className="card">
          <h4>Website sessions</h4>
          <h2>{analytics.sessions}</h2>
          <p className="down">↓ 30% down compared to last 7 days</p>
        </div>
        <div className="card">
          <h4>Buy Now Clicks</h4>
          <h2>{analytics.buyClicks}</h2>
          <p className="up">↑ 0% up compared to last 7 days</p>
        </div>
        <div className="card">
          <h4>Transactions</h4>
          <h2>{analytics.transactions}</h2>
          <p className="up">↑ 0% up compared to last 7 days</p>
        </div>
        <div className="card">
          <h4>Revenue</h4>
          <h2>{analytics.revenue}</h2>
          <p className="up">↑ 0% up compared to last 7 days</p>
        </div>
      </div>

      {/* Website Sessions Overview */}
      <div className="analytics-chart" id="chart">
        <h3 className="graph-title">Website Sessions Overview</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={analytics.data}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="date" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#00ffe0"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Engagement + Quick Actions */}
      <div className="engagement-actions-container">
        {/* User Engagement */}
        <div className="user-engagement">
          <h3>User Engagement</h3>
          <div className="engagement-container">
            <div className="bar-graph">
              {[40, 80, 30, 90, 50, 70, 60].map((height, index) => (
                <div
                  key={index}
                  className="chart-bar"
                  style={{ height: `${height}%` }}
                >
                  {height}
                </div>
              ))}
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="btn action-btn">💰 View Transactions</button>
          <button className="btn action-btn">📄 Generate Reports</button>
        </div>
      </div>
    </div>
  );
}
