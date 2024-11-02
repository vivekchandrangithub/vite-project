import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to hold user details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      // If no token is found, redirect to login page
      if (!token) {
        toast.error('Please login to access the profile page');
        navigate('/login'); // Redirect to login
        return;
      }

      try {
        // Make a request to fetch the user's profile data
        const response = await axiosInstance.get('/usersignup/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user); // Set the user data in state
        } else {
          toast.error(response.data.message || 'Unable to fetch profile');
          navigate('/login'); // Redirect to login if fetch fails
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Error fetching profile. Please login again.');
        navigate('/login'); // Redirect if there's an error
      }
    };

    fetchUserProfile(); // Fetch user data when the component mounts
  }, [navigate]);

  // If user data is not loaded yet
  if (!user) {
    return <p className="text-center">Loading profile...</p>;
  }

  // Render the user's profile details
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-gray-400" size={80} /> {/* User Icon */}
          <h2 className="text-3xl font-bold text-gray-700 text-center mt-4">User Profile</h2>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-gray-600"><strong className="text-lg">Name:</strong> {user.name}</p>
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-600"><strong className="text-lg">Email:</strong> {user.email}</p>
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-600"><strong className="text-lg">Mobile:</strong> {user.mobile}</p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
            onClick={() => {
              localStorage.removeItem('token');
              toast.success('Logged out successfully');
              navigate('/login');
            }}
          >
            Logout
          </button>
          <button
            className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
            onClick={() => navigate('/myorders')}
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
