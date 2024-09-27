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
    <div className='flex flex-col sm:flex-row justify-between items-center w-full px-5 sm:px-20 py-5 h-auto bg-primary-content'>
      <Link to={'/'}>
        <div className='font-bold text-3xl'>
          Logo
        </div>
      </Link>

      <ul className='flex flex-col sm:flex-row gap-5 sm:gap-10 items-center font-semibold'>
        <li>
          <Link to={'/'} className='hover:text-primary'>Home</Link>
        </li>
        <li>
          <Link to={'/restaurent'} className='hover:text-primary'>Restaurants</Link>
        </li>
        <li>
          <Link to={'/about'} className='hover:text-primary'>About</Link>
        </li>
      </ul>
      <div className='flex gap-14'>
        <Link to={'/cart'}>
          <ShoppingBag />
        </Link>
        <Link to='/signup'>
          <CircleUser />
        </Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        )}
      </div>
    </div>
  );
}

export default Header;
