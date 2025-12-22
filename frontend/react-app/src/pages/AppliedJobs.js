import React, { useState, useEffect } from 'react';
import { getAppliedJobs } from '../services/api';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getAppliedJobs();
        setApplications(res.data.applications || []);
      } catch (err) {
        setMessage('Failed to load applied jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}><h2>Loading applied jobs...</h2></div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>My Applied Jobs</h1>
      {message && <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>}
      {applications.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No applications yet. Go apply for jobs!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {applications.map(app => (
            <div key={app._id} style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '12px', background: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <h3>{app.jobId.title}</h3>
              <p><strong>Company:</strong> {app.jobId.company}</p>
              <p><strong>Location:</strong> {app.jobId.location}</p>
              <p><strong>Status:</strong> <span style={{ color: 'orange', fontWeight: 'bold' }}>{app.status.toUpperCase()}</span></p>
              <p><strong>Applied on:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/jobs" style={{ padding: '12px 24px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          Back to Jobs
        </a>
      </div>
    </div>
  );
};

export default AppliedJobs;