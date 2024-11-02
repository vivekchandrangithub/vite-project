import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (foodItem) => {
    setCart(cart.filter(item => item._id !== foodItem._id));
  };

  const handleQuantityChange = (foodItem, newQuantity) => {
    setCart(cart.map(item =>
      item._id === foodItem._id
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = async () => {
    if (cart.length > 0) {
      try {
        const cartDetails = cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        const total = calculateTotal();

        console.log('Cart Details:', cartDetails); // Debug log

        const response = await fetch('http://localhost:3000/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ items: cartDetails, totalPrice: total })
        });

        if (response.ok) {
          navigate('/payment', { state: { cart, total } });
        } else {
          const errorData = await response.json();
          alert(`Checkout failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert('No items in the cart! Redirecting to food selection page.');
      navigate('/all-food');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-5 max-w-3xl mx-auto">
        <div className="cart-items space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-300 py-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-700">Price: ₹{item.price}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="mt-2 p-1 border border-gray-300 rounded w-16 text-center"
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))} 
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-gray-900">Subtotal: ₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items in the cart</p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-total mt-5 border-t border-gray-300 pt-4">
            <h3 className="text-xl font-bold text-right text-gray-800">Total: ₹{calculateTotal()}</h3>
          </div>
        )}
        <button
          type="button"
          onClick={handleProceedToCheckout}
          className="mt-5 w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition duration-200"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
