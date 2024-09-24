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
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg p-8 max-w-2xl text-center">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">{restaurant.name}</h1>
              <p className="text-lg text-gray-700 mb-4">{restaurant.description}</p>
              <p className="text-lg text-gray-700 mb-4"><span className="font-semibold">Location:</span> {restaurant.place}</p>
              <p className="text-lg text-gray-700 mb-4"><span className="font-semibold">Category:</span> {restaurant.category}</p>
              <Link to={'/food'} className='bg-orange-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>enjoy the meals</Link>
          </div>
      </div>
    ) : (
        <div>Restaurant not found.</div>
    );
};

export default SingleRestaurent;
