import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Function to handle removing a food item from the cart
  const handleRemoveFromCart = (foodItem) => {
    const newCart = cart.filter(item => item._id !== foodItem._id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Update cart in localStorage
  };

  // Function to handle quantity changes
  const handleQuantityChange = (foodItem, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to less than 1
    const newCart = cart.map(item =>
      item._id === foodItem._id ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Update cart in localStorage
  };

  // Calculate total price for the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Checkout button handler
  const handleCheckout = () => {
    // Navigate to the order page and pass the cart and total as state
    navigate('/payment', { state: { cart, total: calculateTotal() } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md m-5">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Your Cart</h2>
      <div className="space-y-4">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 rounded mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md p-1 w-16 text-center"
                    />
                    <span className="ml-2 text-gray-600">Subtotal: ₹{item.price * (item.quantity || 1)}</span>
                  </div>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => handleRemoveFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items in the cart</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">Total: ₹{calculateTotal()}</h3>
          <button
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
