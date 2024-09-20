import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
          <Link to={'/cart'} className='hover:text-primary'>My Cart</Link>
        </li>
        <li>
          <Link to={'/about'} className='hover:text-primary'>About</Link>
        </li>
      </ul>

      <button className='btn btn-primary mt-4 sm:mt-0'>Sign Up</button>
    </div>
  );
}

export default Header;
