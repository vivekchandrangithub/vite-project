import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';

const FoodDetails = () => {
  const { foodId } = useParams(); 
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axiosInstance.get(`/foods/${foodId}`);
        setFood(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [foodId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-5'>
  <div className='container mx-auto bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-white flex flex-col md:flex-row gap-10'>
    <div className='md:w-1/2'>
      <img
        src={food.image || 'https://i.pinimg.com/564x/6e/10/c7/6e10c7c0c11d6e2a28d6c51c3877774a.jpg'}
        alt={food.name}
        className='w-full h-auto rounded-lg shadow-md max-h-96 object-cover'
      />
    </div>
    <div className='md:w-1/2'>
      <h1 className='text-4xl font-bold mb-3'>{food.name}</h1>
      <h1 className='text-4xl font-bold mb-3'>${food.price}</h1>

      <p className='text-lg font-semibold mb-2'>{food.category} item</p>
      <p className='mb-5'>{food.description}</p>
    </div>
  </div>
</div>

  
  );
};

export default FoodDetails;
