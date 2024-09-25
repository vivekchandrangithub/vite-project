import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';


const FoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); 
  const navigate = useNavigate();

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

  const addToCart = (food) => {
    const existingFood = cart.find(item => item._id === food._id);
    if (existingFood) {
      alert('You already added this food to your cart.');
    } else {
      setCart([...cart, { ...food, quantity: 1 }]); 
      alert(`${food.name} added to cart successfully!`);
    }
  };

  const handleDeliverNow = (food) => {
    navigate(`/foods/${food._id}`); 
  };

  const proceedToCheckout = () => {
    navigate('/cart', { state: { cart } });
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
                <div className='font-bold text-xl mb-2'>{food.category} item</div>
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
      <button className='bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 m-5' onClick={proceedToCheckout} >Go to Cart</button>
    </div>
  );
};

export default FoodPage;
