import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';


const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { cart, total } = location.state || {}; 

  const handleProceedToPayment = () => {
    if (cart && cart.length > 0) {
      navigate('/payment', { state: { cart, total } }); 
    } else {
      alert('No items in the cart!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Delivery details submitted!');
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
    {/* Delivery Information Form */}
    <form className="flex-1 p-4 bg-gray-50 rounded-lg mr-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
      <div className="space-y-4">
        <input 
          type='text' 
          placeholder='First Name' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='Last Name' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='email' 
          placeholder='Email' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='Street' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='City' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='State' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='Zip-Code' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='Country' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <input 
          type='text' 
          placeholder='Phone Number' 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Details
        </button>
      </div>
    </form>
    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p>{item.name} x {item.quantity}</p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      {cart && cart.length > 0 && (
        <h3 className="mt-4 text-xl font-bold">Total: ₹{total}</h3>
      )}
      <Link to={'/payment'}
        type="button" 
        onClick={handleProceedToPayment} 
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
      >
        PROCEED TO PAYMENT
      </Link>
    </div>
  </div>
  
  );
};

export default PlaceOrder;