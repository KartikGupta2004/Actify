import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MyJobPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); // New state for filter
  const authToken = localStorage.getItem('authToken');
  const profile = localStorage.getItem("Profile") === "true" || false;
  const navigate = useNavigate();
  const statusColors = {
    Applied: '#FFA500', // Orange for Pending
    Working: '#4CAF50', // Green for Accepted
    NotSelected: '#FF0000', // Red for Rejected
  };

  useEffect(() => {
    if (!authToken) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    const fetchFreelancerId = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/freelancer/view_profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAppliedJobs(response.data.data.appliedJobs);
      } catch (err) {
        // console.error('Error fetching freelancer ID:', err);
        setError('Create Profile to apply and see jobs');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        await fetchFreelancerId();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if(profile){
        fetchData();
    } else{
      setError('Create Profile to apply and see jobs')
    }
  }, []);

  const getStatusLabel = (status) => {
    if (status === 'Working') return { label: 'Accepted', color: statusColors.Working };
    if (status === 'Not Selected') return { label: 'Rejected', color: statusColors.NotSelected };
    return { label: 'Pending', color: statusColors.Applied };
  };

  const handleFilterChange = () => {
    // Toggle filter between All, Accepted, and Rejected
    setSelectedFilter((prevFilter) => {
      if (prevFilter === 'All') return 'Accepted';
      if (prevFilter === 'Accepted') return 'Rejected';
      return 'All';
    });
  };

  const filteredJobs = appliedJobs.filter((job) => {
    if (selectedFilter === 'Accepted') return job.status === 'Working';
    if (selectedFilter === 'Rejected') return job.status === 'Not Selected';
    return true; // Show all jobs if filter is 'All'
  });

  return (
    <div style={{ fontSize: '18px', padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
      <div className='flex items-center mb-5'>
        <button
          onClick={handleFilterChange}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Filter: {selectedFilter}
        </button>
        <div className='ml-32'>
          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
        </div>
      </div>
      {loading ? <div className="flex justify-center items-center mx-auto"><Loader /></div> : (filteredJobs.length > 0 ? (
        <div>
          <h2 style={{ textAlign: 'center', color: '#333' }}>My Applied Jobs</h2>
          {filteredJobs.map((job) => {
            const statusInfo = getStatusLabel(job.status); // Determine status label and color

            return (
              <div
                key={job.jobId}
                style={{
                  backgroundColor: '#fff',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 style={{ marginBottom: '10px', color: '#007BFF' }}>{job.title}</h3>
                <p style={{ marginBottom: '5px', color: '#555' }}>{job.description}</p>

                <p
                  style={{
                    color: '#fff',
                    backgroundColor: statusInfo.color,
                    padding: '5px 10px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginTop: '10px',
                  }}
                >
                  {statusInfo.label}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && !error && filteredJobs.length ===0 && <p className='flex justify-center text-[#555]'>No applied jobs available.</p>
      ))}
      {error === 'Create Profile to apply and see jobs' ? <div className='flex justify-center'>
      <button onClick={()=>{navigate('/createProfile')}} type="submit" className="bg-green-700 text-white border-none px-3 py-2 cursor-pointer text-sm mt-4 hover:bg-[#555]">Create Profile</button>
      </div> : <p></p>}
    </div>
  );
};

export default MyJobPage;
