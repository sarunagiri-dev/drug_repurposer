import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface BackendStatus {
  status: string;
  timestamp?: string;
}

interface DbStatus {
  dbConnected: boolean;
  drugCount: number;
}

interface ApiError {
  error: string;
}

function App() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        setLoading(true);
        const [backendRes, dbRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/`),
          axios.get(`${API_BASE_URL}/test-db`)
        ]);
        setBackendStatus(backendRes.data);
        setDbStatus(dbRes.data);
      } catch (error) {
        console.error('Connection test failed:', error);
        setBackendStatus({ status: 'Backend not running' });
        setDbStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  if (loading) {
    return <div className="App">Loading backend connection...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧬 Drug Repurposer - Day 1 Setup</h1>
        <div style={{ margin: '20px 0' }}>
          <h3>Backend Status: {backendStatus?.status}</h3>
          {dbStatus && (
            <div>
              <p>✅ Database Connected</p>
              <p>Drug Count: {dbStatus.drugCount}</p>
            </div>
          )}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Next: Parse Kaggle data → Train ML model
        </div>
      </header>
    </div>
  );
}

export default App;
