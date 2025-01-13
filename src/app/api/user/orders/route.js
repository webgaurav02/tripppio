// src/api/orders.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order'; // Assuming you have an Order model
import User from '@/models/User'; // Assuming you have a User model

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email'); // Fetch the email from the query params

        // Connect to MongoDB
        await connectMongo();

        // Fetch the orders for this user
        const orders = await Order.find({ user: email });

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
