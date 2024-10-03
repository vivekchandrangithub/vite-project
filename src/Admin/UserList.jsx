import React, { useEffect, useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://server-main-5.onrender.com/usersignup');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = async (userId) => {
    try {
      const response = await fetch(`https://server-main-5.onrender.com/usersignup/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the user');
      }
    
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex bg-gray-200 min-h-screen">
      
      <div className="flex-1 p-8 bg-white"> 
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Mobile: {user.mobile}</p>
                <button
                  onClick={() => removeUser(user._id)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200" 
                >
                  Remove User
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
