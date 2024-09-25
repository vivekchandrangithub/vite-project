
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Paymentpage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true); 
  };

  const closePopup = () => {
    setIsSuccess(false); 
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Payment Details</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type='text'
        placeholder='Mobile Number'
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type='password'
        placeholder='Card Number'
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type='password'
        placeholder='OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type='submit' 
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  
    {isSuccess && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="popup bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            toast.success("Login successful");
          <h3 className="text-lg font-semibold">Payment Successful!</h3>
          <p className="mb-4">Your Food is on the way.</p>
          <Link to={'/'}
            onClick={closePopup} 
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 m-5"
          >
            Close
          </Link>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Paymentpage;
