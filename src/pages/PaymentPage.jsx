import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q4NypEs0ux6h8BMC0GYUcIFl3CTUMaUpFL1TZwX7dlnd3psuy3RQl5IlIXUxoSeYjs9TiOyBTZhbelKOiGyLYHd00TdTCgK7f');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
          amount: 5000, // Amount in cents
          currency: 'usd',
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');
      
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
        console.error('Payment error:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setIsSuccess(true); // Payment successful
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      console.error('Error during payment:', err.message);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Payment Details</h2>
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
              <button onClick={handleClose} className="text-gray-500 absolute top-4 right-4">X</button>
              <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
              <p className="mt-4 text-gray-600">Food is on the way.</p>
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
