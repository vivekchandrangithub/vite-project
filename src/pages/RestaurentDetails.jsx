import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';

const SingleRestaurent = () => {
    const { id } = useParams(); // Capture the id from the URL
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: `/restaurents/${id}` });
                setRestaurant(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return restaurant ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          {/* Restaurant Image */}
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="rounded-lg mb-4 w-full h-48 object-cover" 
          />
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{restaurant.name}</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">{restaurant.description}</p>
          <div className="text-lg text-gray-700 mb-4">
            <p><span className="font-semibold">Location:</span> {restaurant.place}</p>
            <p><span className="font-semibold">Category:</span> {restaurant.category}</p>
          </div>
          <div className="flex justify-center">
            <Link 
              to={'/food'} 
              className='bg-orange-400 text-white px-6 py-3 rounded-full hover:bg-orange-500 transition duration-300 shadow-lg'
            >
              Enjoy the Meals
            </Link>
          </div>
        </div>
      </div>
    ) : (
        <div>Restaurant not found.</div>
    );
};

export default SingleRestaurent;