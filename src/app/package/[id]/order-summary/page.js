'use client';
import Razorpay from 'razorpay';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OrderSummary = () => {
    const [packageDetails, setPackageDetails] = useState(null);
    const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false); // Define the state variable
    const searchParams = useSearchParams();
    const homestayId = usePathname().split('/')[2];
    const packageId = searchParams.get('package');
    const [successful, setSuccessful] = useState(false);

    const { data: session } = useSession(); // Get user session data

    // Load Razorpay script dynamically
    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => setRazorpayScriptLoaded(true); // Update state when the script is loaded
            script.onerror = () => console.error('Razorpay script failed to load');
            document.body.appendChild(script);
        };

        // Load script only once
        if (!window.Razorpay) {
            loadRazorpayScript();
        } else {
            setRazorpayScriptLoaded(true); // Razorpay is already loaded
        }

        return () => {
            // Clean up the script when the component is unmounted
            const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // useEffect(()=>{
    //     console.log(session.user)
    // }, [session])

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`/api/homestay/packageinfo?homestayId=${homestayId}&packageId=${packageId}`);
                const data = await response.json();
                setPackageDetails(data.package);
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };

        if (homestayId && packageId) fetchPackageDetails();
    }, [homestayId, packageId]);

    if (!packageDetails) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <span className="text-lg text-gray-500">Fetching package details...</span>
                </div>
            </div>
        );
    }

    const { price, details, roomType, breakfastIncluded, additionalFeatures, avlQuantity } = packageDetails;


    const handlePayment = async () => {
        if (!session || !session.user) {
            alert('Please log in to complete the payment.');
            return;
        }

        try {
            const response = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    homestayId,
                    packageId,
                    amount: packageDetails.price,
                    name: session.user.name,
                    email: session.user.email,
                    notes: `Payment for package ${packageId}`,
                }),
            });

            const orderData = await response.json();
            if (!orderData.success) {
                console.error('Failed to create order');
                return;
            }

            const options = {
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with Razorpay API Key
                amount: orderData.amount,
                currency: 'INR',
                name: 'Tripppio',
                description: 'Booking Payment',
                order_id: orderData.order.id,
                handler: async (response) => {
                    // Verify payment on the backend
                    const verifyResponse = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyResponse.json();
                    if (verifyData.success) {
                        // alert('Payment successful! Receipt sent to your email.');
                        setSuccessful(true);
                        // Optionally, you can update the order status here or navigate to a success page
                    } else {
                        alert('Payment verification failed.');
                        setSuccessful(false);
                    }
                },
                theme: {
                    color: '#3399cc',
                },
            };

            if (window.Razorpay) {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                console.error('Razorpay script is not loaded');
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    const SuccessMessage = () => (
        <motion.div
            className="flex flex-col justify-center items-center space-y-4 p-6 bg-green-100 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
            <p className="text-lg text-green-600">Your booking has been confirmed. A receipt has been sent to your email.</p>
            <div className="mt-4">
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                    Go to Homepage
                </button>
            </div>
        </motion.div>
    );




    return (
        <div className="min-h-screen bg-bg flex items-center justify-center py-10">
            <div className="bg-cards rounded-lg shadow-lg max-w-4xl w-full mx-4 md:mx-auto p-8 space-y-6">
                {successful ? (
                    <SuccessMessage />
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-text text-center mb-6">Checkout</h1>
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold text-text mb-2">Package Details</h2>
                            <p className="text-text"><strong>Details:</strong> {details}</p>
                            <p className="text-text"><strong>Room Type:</strong> {roomType}</p>
                            <p className="text-text"><strong>Breakfast Included:</strong> {breakfastIncluded ? 'Yes' : 'No'}</p>
                            <p className="text-text"><strong>Available Quantity:</strong> {avlQuantity}</p>
                            <p className="text-text font-semibold"><strong>Price:</strong> ₹{price}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text">Additional Features</h3>
                            <ul className="list-disc pl-5 text-text">
                                {additionalFeatures.map((feature, index) => (
                                    <li key={index} className="mb-1">{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                        >
                            Pay ₹{price}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
