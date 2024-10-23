import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header"; // Assuming you have a Header component
import Footer from "../components/Footer"; // Assuming you have a Footer component

const RootLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admindashboard");

  return (
    <div>
      {/* Only show Header and Footer if it's NOT an admin route */}
      {!isAdminRoute && <Header />}
      <Outlet />
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default RootLayout;
