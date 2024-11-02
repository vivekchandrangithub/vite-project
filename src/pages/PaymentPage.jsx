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

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSuccess) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push({ cart, total, date: new Date() });
      localStorage.setItem('orders', JSON.stringify(orders));
  
      // Clear the cart in localStorage
      localStorage.removeItem('cart');
  
      const timer = setTimeout(() => {
        navigate('/'); // Navigate to home page after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, cart, total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!name || !mobile || !address || !city || !postalCode) {
      setError('Please fill in all delivery details.');
      return;
    }

    try {
      const response = await fetch('https://server-main-5.onrender.com/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100, currency: 'usd' }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement, billing_details: { name } },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Checkout & Payment</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Delivery Address Form */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" required />
          </div>

          {/* Order Summary */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Order Summary</h3>
            {cart && cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.name} x {item.quantity}</p>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <h4 className="mt-4 font-bold">Total: ₹{total}</h4>
          </div>

          {/* Payment Form */}
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <CardElement className="border p-2 rounded" />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition duration-200"
          >
            Pay Now
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-600 mt-4 text-center">Payment successful! Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
