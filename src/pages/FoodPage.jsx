import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { axiosInstance } from '../config/axiosinstance';

const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance({ method: 'GET', url: '/foods' });
        setFoods(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // Add to cart function
  const addToCart = async (food) => {
    try {
      // Assuming you have the userId from context or auth
      const userId = ':userId';  // Replace with actual user ID
      
      // Send the POST request to add the food to the cart
      const response = await axiosInstance.post('/carts', { userId, foodId: food._id });
      
      // If added successfully, show a success message
      alert(`${food.name} added to cart successfully!`);
    } catch (err) {
      if (err.response && err.response.data.message === 'You already added this food to your cart.') {
        // If the food is already in the cart, show an alert
        alert('You already added this food to your cart.');
      } else {
        // Handle other errors
        console.error('Error adding to cart:', err.message);
        alert('Failed to add to cart. Please try again.');
      }
    }
  };

  // Deliver Now logic: Navigates to the food details page
  const handleDeliverNow = (food) => {
    navigate(`/foods/${food._id}`); 
  };

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
          foods.map((food, index) => (
            <li key={food.id || index} className='bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between'>
              <div className='border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='font-bold text-xl'>{food.name}</div>
                <div className='font-bold text-xl mb-2'> {food.category} item</div>
                <div className='text-md mb-1 font-bold'>${food.price}</div>
                
                <div className='flex gap-3'>
                  <button
                    className='bg-orange-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                    onClick={() => addToCart(food)}
                  >
                    Add to my cart
                  </button>
                  <button 
                    className='bg-red-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                    onClick={() => handleDeliverNow(food)} 
                  >
                    Deliver now!
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FoodPage;
