import React from 'react'
import RestaurentPage from './RestaurentPage';


const HOME = () => {
  return (
    <div className='bg-[url("https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg")] bg-cover bg-center min-h-screen'>
  <main className='flex flex-col sm:flex-row px-4 sm:px-10 md:px-16 lg:px-24 gap-5 sm:gap-10 py-10'>
    <div className='flex-1'>
      <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl my-3 sm:my-5 text-white'>
        Welcome to Knife Point
      </h1>
      <p className='text-lg sm:text-xl lg:text-2xl font-bold text-white'>
        Here is your favorite food spot
      </p>
      <RestaurentPage />
    </div>
  </main>
</div>

  )
}

export default HOME;
