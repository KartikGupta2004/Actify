import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyJobPage = () => {
  const [job, setJob] = useState([]); // Changed from 'job' to 'jobs' as it's an array
  const [jobs, setJobs] = useState([]); // Changed from 'job' to 'jobs' as it's an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    const fetchFreelancerId = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/freelancer/view_profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.data._id;
      } catch (err) {
        console.error('Error fetching freelancer ID:', err);
        throw new Error('Failed to fetch freelancer ID. Please try again.');
      }
    };

    const fetchJobDetails = async (id) => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/freelancejobs/my_jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJob(response.data); // Assuming response.data is an array of jobs
      } catch (err) {
        console.error('Error fetching job details:', err);
        throw new Error('Failed to fetch job details. Please try again.');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const id = await fetchFreelancerId();
        setFreelancerId(id);
        await fetchJobDetails(id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(job)
  return (
    <div style={{ fontSize: '18px', padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9' }}>
      {loading && <p style={{ textAlign: 'center', color: '#555' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {job.length > 0 ? (
        <div>
          <h2 style={{ textAlign: 'center', color: '#333' }}>Job Details</h2>
          {job.map((jobs) => (
            <div
              key={jobs._id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ marginBottom: '10px', color: '#007BFF' }}>{jobs.role}</h3>
              <p style={{ marginBottom: '5px', color: '#555' }}>{jobs.job_description}</p>
              {/* Add more fields from job details here */}
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p style={{ textAlign: 'center', color: '#555' }}>No job details available.</p>
      )}
    </div>
  );
};

export default MyJobPage;
