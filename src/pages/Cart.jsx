import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosinstance';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: "/carts" });
                console.log(response.data);
                setCartItems(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='bg-[url("https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg")] bg-cover bg-center min-h-screen'>
            <h1 className='text-4xl text-center p-5 font-bold text-white'>Your Cart</h1>
            <p className='text-2xl text-center p-2 font-bold text-white'>Review your selected items below</p>
            <ul className='text-center'>
                {cartItems.length === 0 ? (
                    <li className='text-lg text-white'>Your cart is empty.</li>
                ) : (
                    <ul className='grid grid-cols-1 gap-4 p-5'>
                        {cartItems.map((item, index) => (
                            <li key={item.id || index} className='bg-white bg-opacity-20 p-4 rounded-lg shadow-lg text-white'>
                                <div className='font-bold text-xl'>{item.items}</div>
                                <div className='text-md'>Price: ${item.totalprice}</div>
                                <div className='text-md'>Restaurant: {item.restaurent}</div>
                                <div className='text-md'>Quantity: {item.quantity}</div>
                                <div className='text-md'>Status: {item.status}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    );
};

export default CartPage;
