import React from 'react';
import { CircleUser } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserHeader = () => {
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
        <Link>
        <ShoppingBag />
        </Link>
        <Link to='/user/profile'>
        <CircleUser />
        </Link>
      </div>
      
    </div>
  );
}

export default UserHeader;
