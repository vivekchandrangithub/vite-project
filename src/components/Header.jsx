import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between items-center w-full px-20 py-10 h-24 bg-primary-content '>
      <Link to={'/'}>
          <div className='font-bold text-3xl '>
            logo
           </div>
      </Link>
        
        <ul className='flex gap-10 items-center font-semibold'>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/restaurent'}>Restaurents</Link>
        </ul>

        <button className='btn btn-primary'>join us</button>
    </div>
  )
}

export default Header
