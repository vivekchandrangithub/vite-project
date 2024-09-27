import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token or any authentication data from localStorage
        localStorage.removeItem('token'); // Adjust the key according to your implementation
        // Navigate to the signup page
        navigate('/signup');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
            <nav className="bg-white shadow rounded-lg p-4 mb-6">
                <ul className="flex space-x-4">
                    <li>
                        <Link 
                            to="userlist" 
                            className="text-gray-600 hover:text-blue-500 font-semibold transition-colors duration-200"
                        >
                            User List
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="adminRestaurent" 
                            className="text-gray-600 hover:text-blue-500 font-semibold transition-colors duration-200"
                        >
                            Admin Restaurant
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="adminFood" 
                            className="text-gray-600 hover:text-blue-500 font-semibold transition-colors duration-200"
                        >
                            Admin Food
                        </Link>
                    </li>
                    <li>
                        <button 
                            onClick={handleLogout} 
                            className="text-red-600 hover:text-red-500 font-semibold transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default AdminDashboard;
