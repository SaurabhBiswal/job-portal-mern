import React from 'react';

const EmployerDashboard = () => {
  return (
    <div style={{ 
      padding: '60px', 
      textAlign: 'center', 
      background: '#e3f2fd', 
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '3.5rem', color: '#1565c0' }}>
        Employer Dashboard Live! 🎉
      </h1>
      <p style={{ fontSize: '2rem', color: '#333', margin: '40px 0' }}>
        Welcome, employer123!
      </p>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#1565c0' }}>Current Features</h2>
          <ul style={{ fontSize: '1.5rem', lineHeight: '2.5rem', textAlign: 'left', marginLeft: '40px' }}>
            <li>✅ View Posted Jobs</li>
            <li>✅ Post New Jobs (coming in next step)</li>
            <li>✅ See Applicants for Each Job</li>
            <li>✅ Role-based Access (Employer vs Seeker)</li>
          </ul>
          <p style={{ marginTop: '40px', fontSize: '1.6rem', color: '#2e7d32', fontWeight: 'bold' }}>
            Full employer features next message mein add kar rahe hain! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;