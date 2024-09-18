import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

const HOME = () => {
  return (
    <div className='' >
        
        <main className='min-h-96 flex px-24 gap-10'>
                <div className='flex- 1'>
                    <h1 className='font-bold text-5xl my-5'>Welcome user</h1>
                    <p className='text-2xl font-normal'>welcome to your favarite food spot</p>
                </div>
                <div className='flex-1'>
                    <img  src="https://i.pinimg.com/564x/52/df/c9/52dfc954c8d081dc34dd59cdf5df8b20.jpg" alt="home image" />
               </div> 
        </main>
       
    </div>
  )
}

export default HOME;
