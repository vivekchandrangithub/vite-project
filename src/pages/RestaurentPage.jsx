import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/axiosinstance';

const RestaurentPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: "/restaurents" });
                setRestaurants(response.data);
                setFilteredRestaurants(response.data); // Initialize with all restaurants
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    // Function to handle search filtering
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (!term) {
            setFilteredRestaurants(restaurants); // If no search term, show all
        } else {
            const filtered = restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredRestaurants(filtered);
        }
    };

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen p-5">
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Restaurants..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mb-5"
            />
            <h1 className="text-4xl text-center p-5 font-bold text-white">
                Welcome to Our Restaurants Collection
            </h1>
            <p className="text-2xl text-center p-2 font-semibold text-gray-300">
                Please enjoy your food from your favorite restaurant
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                {filteredRestaurants.length === 0 ? (
                    <li className="text-lg text-center text-white col-span-4">
                        No restaurants available.
                    </li>
                ) : (
                    filteredRestaurants.map((restaurant, index) => (
                        <li
                            key={restaurant.id || index}
                            className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:bg-opacity-50"
                        >
                            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                {/* Restaurant Image */}
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <div className="font-bold text-xl mb-2">{restaurant.name}</div>
                                    <div className="text-md mb-1">Category: {restaurant.category}</div>
                                    <div className="text-md mb-1">Location: {restaurant.place}</div>
                                    <Link
                                        to={`/singlerestaurent/${restaurant._id}`}
                                        className="block bg-orange-500 text-white text-center px-4 py-2 mt-3 rounded hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        View Restaurant
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default RestaurentPage;
