import Razorpay from 'razorpay';
import connectMongo from '@/lib/mongodb';  // MongoDB connection utility
import Order from '@/models/Order';  // Order model

export async function POST(req) {
    try {
        const { homestayId, packageId, amount, name, email, notes } = await req.json();

        console.log(homestayId, packageId, amount, name, email, notes)

        // Connect to MongoDB
        await connectMongo();

        // Create Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        });

        const receiptId = `receipt_${Date.now()}`;

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: receiptId,
        });

        // Prepare the order data to save to MongoDB
        const newOrder = new Order({
            user: email,
            package: packageId,
            homestay: homestayId,
            amount,
            baseAmt: amount - 48, // assuming convenience + platform fees
            convenienceFee: 24,
            platformFee: 24,
            currency: 'INR',
            status: 'PENDING',
            orderId: order.id,
            notes: { notes },
            name,
            email,
            createdAt: new Date(),
        });

        // Save the order to MongoDB
        await newOrder.save();

        return new Response(JSON.stringify({ success: true, order, amount: amount * 100 }), { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ success: false, error: 'Error creating order' }), { status: 500 });
    }
}
