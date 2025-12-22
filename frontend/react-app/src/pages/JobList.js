import React, { useState, useEffect } from 'react';
import api from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [resumeFiles, setResumeFiles] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data.jobs || res.data || []);
      } catch (err) {
        setMessage('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const resumeFile = resumeFiles[jobId];

    if (!resumeFile) {
      setMessage('Please select a PDF resume!');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', resumeFile);

    try {
      const res = await api.post('/applications/apply', formData);
      setMessage(res.data.message);
      setAppliedJobIds([...appliedJobIds, jobId]);
      setResumeFiles({ ...resumeFiles, [jobId]: null });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Apply failed');
    }

    setTimeout(() => setMessage(''), 4000);
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '100px' }}>Loading jobs...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Available Jobs</h1>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="/applied-jobs" style={{ padding: '12px 24px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>
          View My Applied Jobs
        </a>
      </div>

      {message && <p style={{ textAlign: 'center', color: message.includes('success') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}

      {jobs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No jobs available</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {jobs.map(job => (
            <div key={job._id} style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '12px', background: 'white' }}>
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>

              <div style={{ margin: '20px 0' }}>
                <label><strong>Upload Resume (PDF):</strong></label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFiles({ ...resumeFiles, [job._id]: e.target.files[0] })}
                  style={{ display: 'block', marginTop: '10px' }}
                />
              </div>

              <button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobIds.includes(job._id)}
                style={{ 
                  padding: '12px', 
                  background: appliedJobIds.includes(job._id) ? '#6c757d' : '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  width: '100%' 
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