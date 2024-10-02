import React from "react";
import { Navigate } from "react-router-dom";

const AuthUser = ({ children }) => {
  // Check if the user is authenticated
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children (protected component)
  return children;
};

export default AuthUser;
