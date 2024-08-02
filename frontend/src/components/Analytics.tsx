import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await axios.get('/analytics');
      setAnalytics(response.data);
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <div className="loading">Loading...</div>;

  return (
    <div className="container analytics">
      <h2>Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-item">
          <p><strong>People Inside:</strong> {analytics.peopleInside}</p>
        </div>
        <div className="analytics-item">
          <p><strong>Average Duration:</strong> {analytics.averageDuration} minutes</p>
        </div>
        <div className="analytics-item">
          <p><strong>Peak Entry Times:</strong> {JSON.stringify(analytics.peakEntryTimes)}</p>
        </div>
        <div className="analytics-item">
          <p><strong>Peak Exit Times:</strong> {JSON.stringify(analytics.peakExitTimes)}</p>
        </div>
        <div className="analytics-item">
          <p><strong>Entry Gates:</strong> {JSON.stringify(analytics.entryGates)}</p>
        </div>
        <div className="analytics-item">
          <p><strong>Exit Gates:</strong> {JSON.stringify(analytics.exitGates)}</p>
        </div>
      </div>
      <div className="button-group">
        <button className="home-button" onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
};

export default Analytics;
