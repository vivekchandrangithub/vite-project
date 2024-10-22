import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosinstance';

const AdminRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        description: '',
        place: '',
        image: '',  // Store base64 image string here
        category: 'veg',
    });

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get("/restaurents");
                setRestaurants(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRestaurant((prev) => ({ ...prev, [name]: value }));
    };

    // Convert the image file to base64 format
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setNewRestaurant((prev) => ({ ...prev, image: reader.result }));
        };
    };

    const postRestaurant = async () => {
        try {
            const response = await axiosInstance.post('/restaurents', newRestaurant);
            setRestaurants((prev) => [...prev, response.data]);
            togglePopup();
            setNewRestaurant({ name: '', description: '', place: '', image: '', category: 'veg' });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='p-5'>
            <button 
                onClick={togglePopup} 
                className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4'
            >
                Add Restaurant
            </button>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-lg font-bold mb-4'>Add Restaurant</h2>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='Restaurant Name' 
                            value={newRestaurant.name} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <input 
                            type='text' 
                            name='description' 
                            placeholder='Description' 
                            value={newRestaurant.description} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <input 
                            type='text' 
                            name='place' 
                            placeholder='Location' 
                            value={newRestaurant.place} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        
                        {/* Image File Input */}
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}  // Call the function to convert to base64
                            className='border p-2 rounded w-full mb-2'
                        />

                        <select 
                            name='category' 
                            value={newRestaurant.category} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-4'
                        >
                            <option value='veg'>Veg</option>
                            <option value='non-veg'>Non-Veg</option>
                        </select>
                        <div className='flex justify-end'>
                            <button 
                                onClick={postRestaurant} 
                                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2'
                            >
                                Submit
                            </button>
                            <button 
                                onClick={togglePopup} 
                                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isOpen && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                    {restaurants.length === 0 ? (
                        <li className='text-lg text-center text-white col-span-4'>No restaurants available.</li>
                    ) : (
                        restaurants.map((restaurant, index) => (
                            <li key={restaurant.id || index} className='bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between transition-transform transform hover:scale-105 duration-300'>
                                <div className='border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300'>
                                    {/* Display base64 image */}
                                    <img src={restaurant.image} alt={restaurant.name} className='rounded-lg w-full h-48 object-cover mb-3' />
                                    <div className='font-bold text-xl sm:text-2xl mb-2'>{restaurant.name}</div>
                                    <div className='text-md sm:text-lg mb-1'>Category: <span className='text-yellow-300'>{restaurant.category}</span></div>
                                    <div className='text-md sm:text-lg mb-1'>Location: <span className='text-yellow-300'>{restaurant.place}</span></div>
                                    <div className='text-sm sm:text-md mb-3'>{restaurant.description}</div>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between mt-4'>
                                   
                                    <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300'>
                                        Delete Restaurant
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default AdminRestaurant;
