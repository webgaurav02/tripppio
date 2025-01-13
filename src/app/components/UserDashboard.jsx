import { useState, useEffect } from 'react';

const UserDashboard = ({ email }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/user/orders?email=${email}`);
                const data = await response.json();
                if (data.success) {
                    const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError('An error occurred while fetching orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [email]);

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Dashboard</h1>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li
                            key={order._id}
                            className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex md:flex-row flex-col justify-between items-center mb-2">
                                <p className="font-semibold text-gray-800">Order ID: {order._id}</p>
                                <p className={`text-sm ${order.status === 'PAID' ? 'text-green-500' : 'text-yellow-500'}`}>
                                    Status: {order.status}
                                </p>
                                 {/* Display QR code if it exists */}
                            {order.qrCode && (
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-600 mb-2">Your QR Code:</p>
                                    <img
                                        src={`${order.qrCode}`}
                                        alt="Order QR Code"
                                        className="mx-auto w-32 h-32 object-contain"
                                    />
                                </div>
                            )}
                            </div>
                            <div className="text-gray-700">
                                <p className="text-lg font-medium">Amount: ₹{order.amount}</p>
                                <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDashboard;
