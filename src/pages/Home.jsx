import React from 'react'
import RestaurentPage from './RestaurentPage';
import FoodPage from './FoodPage';


const HOME = () => {
  return (
    <div className='bg-[url("https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg")] bg-cover bg-center min-h-screen'>
    <main className='min-h-96 flex px-24 gap-10'>
        <div className='flex-1'>
            <h1 className='font-bold text-5xl my-5 text-white'>Welcome user</h1>
            <p className='text-2xl font-bold text-white '>Welcome to your favorite food spot</p>
          <RestaurentPage />
          <FoodPage />
        </div>
    </main>
</div>
  )
}

export default HOME;
