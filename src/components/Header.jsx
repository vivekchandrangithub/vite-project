import React from 'react';
import { CircleUser, ShoppingBag } from 'lucide-react';
import { axiosInstance } from '../config/axiosinstance';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axiosInstance.get('/logout/userlogout');
      localStorage.removeItem('token');
      toast.success("Logout successful");
      navigate('/login');
    } catch (error) {
      console.log(error, '====error');
      toast.error("Failed to logout");
    }
  };

  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-20 py-5 bg-primary-content">
      {/* Logo */}
      <Link to={'/'}>
        <img
          src="https://i.pinimg.com/564x/0a/c5/ee/0ac5ee256f0eee8c0c5b79cde877f390.jpg"
          alt="Logo"
          className="h-14 w-14 object-contain rounded-full" 
        />
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
        {/* Shopping Cart Icon */}
        

        
        {isLoggedIn ? (
          <>
            {/* Profile Icon (when logged in) */}
            <Link to={'/profile'}>
              <CircleUser className="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-sm sm:text-base px-4 py-2 transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Join Us Button (when not logged in) */}
            <Link to={'/signup'}>
              <button className="btn btn-primary text-sm sm:text-base px-4 py-2 transition-all duration-300">
                Join Us
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
