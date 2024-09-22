import React, { useEffect, useState } from 'react';
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
                    <div>
                        <div className='font-bold text-xl'>{restaurant.name}</div>
                        <div className='text-md'>Category: {restaurant.category}</div>
                        <div className='text-md'>Location: {restaurant.place}</div>
                        <div className='text-md'>Description: {restaurant.description}</div>
                        <button>view</button>
                    </div>
                </li>
            ))
        )}
    </ul>
</div>

    );
};

export default RestaurentPage;
