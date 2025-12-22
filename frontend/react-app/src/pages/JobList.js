import React, { useState, useEffect } from 'react';
import { getJobs, applyJob } from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState([]); // Track applied jobs

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        const jobList = res.data.jobs || res.data || [];
        setJobs(jobList);

        // Optional: Fetch applied jobs to disable buttons (later improve)
      } catch (err) {
        setMessage('Failed to load jobs. Check if backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const res = await applyJob(jobId);
      setMessage(res.data.message || 'Applied successfully!');
      setAppliedJobIds([...appliedJobIds, jobId]); // Disable button
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error applying to job');
    }

    // Clear message after 4 seconds
    setTimeout(() => setMessage(''), 4000);
  };

  if (loading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Jobs</h1>

      {/* View Applied Jobs Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <a
          href="/applied-jobs"
          style={{
            padding: '14px 30px',
            background: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          View My Applied Jobs
        </a>
      </div>

      {/* Message */}
      {message && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: message.includes('success') || message.includes('Applied') ? 'green' : 'red',
            marginBottom: '30px'
          }}
        >
          {message}
        </p>
      )}

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#666' }}>
          No jobs posted yet. Ask an employer to post some jobs! 😊
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                border: '1px solid #ddd',
                padding: '30px',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                textAlign: 'left'
              }}
            >
              <h2 style={{ margin: '0 0 15px 0', color: '#007bff', fontSize: '1.8rem' }}>
                {job.title}
              </h2>
              <p><strong>Company:</strong> {job.company || 'Not specified'}</p>
              <p><strong>Location:</strong> {job.location || 'Remote'}</p>
              <p><strong>Description:</strong> {job.description || 'No description available'}</p>

              <button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobIds.includes(job._id)}
                style={{
                  marginTop: '20px',
                  padding: '12px 30px',
                  background: appliedJobIds.includes(job._id) ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: appliedJobIds.includes(job._id) ? 'not-allowed' : 'pointer'
                }}
              >
                {appliedJobIds.includes(job._id) ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;