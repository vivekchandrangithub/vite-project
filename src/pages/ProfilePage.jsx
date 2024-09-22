import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');

      
      const response = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setUser(response.data.user);
    } catch (err) {
      setError('Failed to load user data.');
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };
 useEffect(() => {
    fetchProfileData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      
    </div>
  );
};

export default ProfilePage;
