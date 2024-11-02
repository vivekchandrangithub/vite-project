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
      localStorage.removeItem('cart');

      const timer = setTimeout(() => {
        navigate('/');
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
      const response = await fetch('http://localhost:3000/payments/create-payment-intent', {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl">
        {/* Delivery Address Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Delivery Address</h2>
          <form>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              required
              className="w-full mb-4 p-2 border rounded"
            />
          </form>
        </div>

        {/* Payment Details Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <CardElement className="border p-2 rounded mb-4" />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              {cart && cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p>{item.name} x {item.quantity}</p>
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                ))
              ) : (
                <p>No items in the cart</p>
              )}
              <h4 className="mt-4 font-bold">Total: ₹{total}</h4>
            </div>

            <button
              type="submit"
              disabled={!stripe}
              className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition duration-200"
            >
              Pay Now
            </button>
          </form>
          {isSuccess && <p className="text-green-600 mt-4 text-center">Payment successful! Redirecting...</p>}
        </div>
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
