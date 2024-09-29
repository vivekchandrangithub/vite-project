import React from 'react';
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { axiosInstance } from '../config/axiosinstance';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/logout/userlogout'); // This will call the logout route in the backend
      localStorage.removeItem('token'); // Remove the token from localStorage
      toast.success("Logout successful"); // Notify user of successful logout
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.log(error, '====error');
      toast.error("Failed to logout"); // Notify user of failed logout
    }
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-20 py-5 bg-primary-content">
  {/* Logo */}
  <Link to={'/'} className="mb-4 sm:mb-0">
    <div className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
      Knife point
    </div>
  </Link>

  {/* Navigation Links */}
  <ul className="flex flex-col sm:flex-row gap-3 sm:gap-8 items-center text-lg font-semibold">
    <li>
      <Link to={'/'} className="hover:text-primary transition-colors duration-300">Home</Link>
    </li>
    <li>
      <Link to={'/restaurent'} className="hover:text-primary transition-colors duration-300">Restaurants</Link>
    </li>
    <li>
      <Link to={'/about'} className="hover:text-primary transition-colors duration-300">About</Link>
    </li>
  </ul>

  {/* Cart and User Actions */}
  <div className="flex gap-6 sm:gap-10 mt-4 sm:mt-0 items-center">
    <Link to={'/cart'}>
      <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
    </Link>
    <Link to="/signup">
      <CircleUser className="w-6 h-6 sm:w-8 sm:h-8" />
    </Link>
    {isLoggedIn && (
      <button 
        onClick={handleLogout} 
        className="btn btn-secondary text-sm sm:text-base px-4 py-2 transition-all duration-300"
      >
        Logout
      </button>
    )}
  </div>
</div>
  );
}

export default Header;
