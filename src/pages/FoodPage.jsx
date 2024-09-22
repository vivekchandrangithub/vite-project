import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosinstance';


const FoodPage = () => {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchFoods = async()=>{
      try{
        const response = await axiosInstance({method:"GET",url:"/foods"});
        console.log(response.data);
        setFoods(response.data);
      }catch(er){
        setError(err.message);
      } finally{
        setLoading(false);
      }
    };

    fetchFoods();
  },[]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-4xl text-center p-5 font-bold text-white'>Welcome to our foods Collection</h1>
    <p className='text-2xl text-center p-2 font-bold text-white'>Please enjoy your food from your favorite restaurant</p>
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
        {foods.length === 0 ? (
            <li className='text-lg text-center text-white col-span-4'>No foods available.</li>
        ) : (
            foods.map((foods, index) => (
                <li key={foods.id || index} className='bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between'>
                    <div>
                        <div className='font-bold text-xl'>{foods.name}</div>
                        <div className='text-md'>Category: {foods.category}</div>
                        <div className='text-md'>Location: {foods.place}</div>
                        <div className='text-md'>Description: {foods.description}</div>
                    </div>
                </li>
            ))
        )}
    </ul>
    </div>
  );
};

export default FoodPage
