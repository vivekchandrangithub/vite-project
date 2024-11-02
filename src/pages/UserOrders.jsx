import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://server-main-5.onrender.com/carts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data); // Log the full response
        setOrders(data);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message); // Display error toast
      });
  }, []);

  // Function to remove all items from an order
  const removeAllItems = (orderId) => {
    if (window.confirm('Are you sure you want to remove all items from this order?')) {
      const token = localStorage.getItem('token');

      fetch(`https://server-main-5.onrender.com/carts/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to remove items');
          }
          // Update orders to remove the entire order locally
          setOrders((prevOrders) =>
            prevOrders.filter(order => order._id !== orderId)
          );
          toast.success('All items removed successfully!'); // Display success toast
        })
        .catch((error) => {
          setError(error.message);
          toast.error(error.message); // Display error toast
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found</p>
      ) : (
        orders.map((order) => (
          <article key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold">Order from: {order.restaurent}</h3>
            <p className="text-gray-700">Status: {order.status}</p>
            <p className="text-gray-700">Total Price: ₹{order.totalprice}</p>
            <h4 className="text-lg font-medium mt-4">Items:</h4>
            {Array.isArray(order.items) && order.items.length > 0 ? (
              order.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <img 
                      src={item.image || 'default-image.png'} // Default image if not available
                      alt={item.name || 'Food Item'} 
                      className="w-16 h-16 object-cover rounded mr-4" 
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm">Price: ₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No items found in this order</p>
            )}
            <button 
              onClick={() => removeAllItems(order._id)} 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Remove All Items
            </button>
          </article>
        ))
      )}
    </div>
  );
};

export default UserOrderPage;
