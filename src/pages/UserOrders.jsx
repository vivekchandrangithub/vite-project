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
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data);
        setOrders(data);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  }, []);

  const removeAllItems = (orderId) => {
    if (window.confirm('Are you sure you want to clear your order history?')) {
      const token = localStorage.getItem('token');

      fetch(`https://server-main-5.onrender.com/carts/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to clear order history');
          }
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          toast.success('Order history cleared successfully!');
        })
        .catch((error) => {
          setError(error.message);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found</p>
      ) : (
        orders.map((order) => (
          <article
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl mx-auto"
          >
            <h4 className="text-lg font-medium mb-4 text-center">Order Items</h4>
            {Array.isArray(order.items) && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 border-b last:border-b-0"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image || 'default-image.png'}
                      alt={item.name || 'Food Item'}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No items found in this order</p>
            )}
            {/* Total Expense */}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">Total Expense:</span>
              <span className="font-semibold text-xl text-green-600">
                ₹
                {order.items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
            {/* Clear Order History Button */}
            <button
              onClick={() => removeAllItems(order._id)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 w-full"
            >
              Clear My Order History
            </button>
          </article>
        ))
      )}
    </div>
  );
};

export default UserOrderPage;
