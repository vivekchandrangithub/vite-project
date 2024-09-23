import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';

const RestaurentPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: "/restaurents" });
                console.log(response.data);
                setRestaurants(response.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
    <h1 className='text-4xl text-center p-5 font-bold text-white'>Welcome to our Restaurants Collection</h1>
    <p className='text-2xl text-center p-2 font-bold text-white'>Please enjoy your food from your favorite restaurant</p>
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
        {restaurants.length === 0 ? (
            <li className='text-lg text-center text-white col-span-4'>No restaurants available.</li>
        ) : (
            restaurants.map((restaurant, index) => (
                <li key={restaurant.id || index} className='bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between'>
                    <div className='border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <div className='font-bold text-xl mb-2'>{restaurant.name}</div>
                        <div className='text-md mb-1'>Category: {restaurant.category}</div>
                        <div className='text-md mb-1'>Location: {restaurant.place}</div>
                        <div className='text-md mb-2'>Description: {restaurant.description}</div>
                        <Link to={`/singlerestaurent/${restaurant.id}`} className='bg-orange-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>view</Link>
                    </div>
                </li>
            ))
        )}
    </ul>
</div>

    );
};

export default RestaurentPage;
