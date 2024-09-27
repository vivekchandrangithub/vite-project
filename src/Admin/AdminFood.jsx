import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosinstance';

const AdminFood = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [newFood, setNewFood] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        isVeg: true,
    });

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: "/foods" });
                console.log(response.data);
                setFoods(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFood((prev) => ({ ...prev, [name]: value }));
    };

    const postFood = async () => {
        try {
            const response = await axiosInstance.post('/foods', newFood);
            setFoods((prev) => [...prev, response.data]);
            togglePopup();
            setNewFood({ name: '', description: '', price: '', image: '', category: '', isVeg: true });
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteFood = async (id) => {
        try {
            await axiosInstance.delete(`/foods/${id}`);
            setFoods((prev) => prev.filter(food => food._id !== id));
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
                Add Food Item
            </button>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-lg font-bold mb-4'>Add Food Item</h2>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='Food Name' 
                            value={newFood.name} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <input 
                            type='text' 
                            name='description' 
                            placeholder='Description' 
                            value={newFood.description} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <input 
                            type='number' 
                            name='price' 
                            placeholder='Price' 
                            value={newFood.price} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <input 
                            type='text' 
                            name='image' 
                            placeholder='Image URL' 
                            value={newFood.image} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2' 
                        />
                        <select 
                            name='category' 
                            value={newFood.category} 
                            onChange={handleChange} 
                            className='border p-2 rounded w-full mb-2'
                        >
                            <option value=''>Select Category</option>
                            <option value='Appetizer'>Appetizer</option>
                            <option value='Main Course'>Main Course</option>
                            <option value='Dessert'>Dessert</option>
                        </select>
                        <label className='block mb-2'>
                            <input 
                                type='checkbox' 
                                name='isVeg' 
                                checked={newFood.isVeg} 
                                onChange={(e) => setNewFood({ ...newFood, isVeg: e.target.checked })} 
                            />
                            Vegetarian
                        </label>
                        <div className='flex justify-end'>
                            <button 
                                onClick={postFood} 
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

            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                {foods.length === 0 ? (
                    <li className='text-lg text-center text-white col-span-4'>No food items available.</li>
                ) : (
                    foods.map((food) => (
                        <li key={food._id} className='bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg text-white flex flex-col justify-between transition-transform transform hover:scale-105 duration-300'>
                            <div className='border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300'>
                                <img src={food.image} alt={food.name} className='rounded-lg w-full h-48 object-cover mb-3' />
                                <div className='font-bold text-xl sm:text-2xl mb-2'>{food.name}</div>
                                <div className='text-md sm:text-lg mb-1'>Category: <span className='text-yellow-300'>{food.category}</span></div>
                                <div className='text-md sm:text-lg mb-1'>Price: <span className='text-yellow-300'>${food.price}</span></div>
                                <div className='text-sm sm:text-md mb-3'>{food.description}</div>
                                <div>Vegetarian: <span className='text-yellow-300'>{food.isVeg ? 'Yes' : 'No'}</span></div>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between mt-4'>
                                <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 mb-2 sm:mb-0'>
                                    Edit Food Item
                                </button>
                                <button 
                                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300'
                                    onClick={() => deleteFood(food._id)}
                                >
                                    Delete Food Item
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default AdminFood;
