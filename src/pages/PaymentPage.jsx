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
  const { cart, total } = location.state || {}; // Get cart and total from state

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/'); // Navigate to home page after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);

  try {
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
        billing_details: {
          name,
        },
      },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message); // Show error toast
      console.error('Payment error:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setIsSuccess(true); // Payment successful
      toast.success('Payment successful!'); // Show success toast
    }
  } catch (err) {
    setError(`Payment failed: ${err.message}`);
    toast.error(`Payment failed: ${err.message}`); // Show error toast
    console.error('Error during payment:', err.message);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Payment Details</h2>
        
        {/* Order Summary Section */}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="border rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            {stripe ? 'Submit Payment' : 'Loading...'}
          </button>
        </form>

        {isSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm text-center">
              <h3 className="text-xl font-semibold text-green-600">Payment of ₹{total} Successful!</h3>
              <p className="mt-4 text-gray-600">Redirecting to the home page in 3 seconds...</p>
            </div>
          </div>
        )}

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
