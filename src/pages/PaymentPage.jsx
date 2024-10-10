import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q4NypEs0ux6h8BMC0GYUcIFl3CTUMaUpFL1TZwX7dlnd3psuy3RQl5IlIXUxoSeYjs9TiOyBTZhbelKOiGyLYHd00TdTCgK7f');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total } = location.state || {};

  // New state for delivery address details
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Automatically clear the cart and navigate to the home page after successful payment
  useEffect(() => {
    if (isSuccess) {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = storedCart.filter(item => !cart.some(paidItem => paidItem._id === item._id));
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      const timer = setTimeout(() => {
        navigate('/'); // Navigate to home page after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      // Check for missing delivery details
      if (!name || !mobile || !address || !city || !postalCode) {
        setError('Please fill in all delivery details.');
        return;
      }

      const response = await fetch('https://server-main-5.onrender.com/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total * 100, // Convert total to cents
          currency: 'usd',
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name },
        },
      });

      if (error) {
        setError(error.message);
        console.error('Payment error:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setIsSuccess(true); // Payment successful
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      console.error('Error during payment:', err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Checkout & Payment</h2>

        {/* Delivery Address Form */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block font-semibold text-gray-700">Mobile Number</label>
            <input
              id="mobile"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-semibold text-gray-700">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-semibold text-gray-700">City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block font-semibold text-gray-700">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Order Summary</h3>
          {cart && cart.length > 0 ? (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.name} x {item.quantity}</p>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <h4 className="mt-4 font-bold">Total: ₹{total}</h4>
            </div>
          ) : (
            <p>No items in the cart</p>
          )}
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <div className="mb-4">
            <label htmlFor="card" className="block font-semibold text-gray-700">Card Details</label>
            <CardElement id="card" className="p-2 border border-gray-300 rounded" />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {isSuccess && <p className="text-green-500">Payment successful! Redirecting...</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={!stripe}
          >
            Pay ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
