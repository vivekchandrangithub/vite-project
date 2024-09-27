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
    <div className="">
    <h1 className="text-4xl text-center p-5 font-bold text-white">Welcome to Our Foods Collection</h1>
    <p className="text-2xl text-center p-2 font-bold text-white">Please enjoy your food from your favorite restaurant</p>
    
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {foods.length === 0 ? (
        <li className="text-lg text-center text-white col-span-4">No foods available.</li>
      ) : (
        foods.map((food, index) => (
          <li key={food.id || index} className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between transition-transform transform hover:scale-105">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={food.image} alt={food.name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="p-4">
                <div className="font-bold text-xl mb-1">{food.name}</div>
                <div className="font-bold text-xl mb-2">{food.category} item</div>
                <div className="text-md mb-1 font-bold">${food.price}</div>
                
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="bg-orange-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
                    onClick={() => addToCart(food)}
                  >
                    Add to my cart
                  </button>
                  <button 
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
                    onClick={() => handleDeliverNow(food)} 
                  >
                    Deliver now!
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  
    <button className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 m-5 w-full sm:w-auto" onClick={proceedToCheckout}>
      Go to Cart
    </button>
  </div>
  
  );
};

export default FoodPage;
