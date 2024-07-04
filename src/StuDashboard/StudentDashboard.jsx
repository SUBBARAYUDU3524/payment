import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { StudentProfileContext } from '../StudentProfileController';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/profile', {
          headers: {
            'y-auth-token': localStorage.getItem('studenttoken'),
          }
        });
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  console.log(profile);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#4A90E2" loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-green-400 p-4 rounded-2xl">
      <div className="card w-full max-w-6xl shadow-lg bg-white">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold text-black">Student Dashboard</h2>
          {profile && (
            <div className="mb-4 text-black">
              <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Email:</strong> {profile.email}</div>
                <div><strong>Phone:</strong> {profile.phone}</div>
                <div><strong>Course:</strong> {profile.courseName}</div>
                <div><strong>Admission No:</strong> {profile.admissionNo}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
