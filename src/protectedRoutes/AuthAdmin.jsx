import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken'); 
    const isAdmin = token ? true : false; 

    return isAdmin ? children : <Navigate to="/adminLogin" />;
};

export default AdminRoute;