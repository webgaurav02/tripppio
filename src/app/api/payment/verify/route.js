import Razorpay from 'razorpay';
import connectMongo from '@/lib/mongodb';  // MongoDB connection utility
import Order from '@/models/Order';  // Order model
import crypto from 'crypto';  // Node.js crypto module
import QRCode from 'qrcode';  // For generating QR code

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        // Connect to MongoDB
        await connectMongo();

        // Verify the payment
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        });

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // Use crypto to generate the HMAC
        const expectedSignature = crypto
            .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment is valid, generate the QR code
            const qrCodeData = await QRCode.toDataURL(razorpay_order_id);

            // Update the order status and save the QR code as base64
            const order = await Order.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    status: 'PAID',
                    paymentId: razorpay_payment_id,
                    paymentStatus: 'SUCCESS',
                    qrCode: qrCodeData  // Store the base64 QR code in the order
                },
                { new: true }
            );

            // Get the homestay's package details
            const homestayId = order.homestayId;
            const packageId = order.packageId;

            const homestay = await Homestay.findOne({ _id: homestayId });

            // Find the relevant package
            const homestayPackage = homestay.packages.find(pkg => pkg._id.toString() === packageId);

            // Check if the package is available (quantity > 0)
            if (homestayPackage.avlQuantity > 0) {
                // Deduct the quantity by 1
                homestayPackage.avlQuantity -= 1;

                // Save the updated homestay document
                await homestay.save();
            }

            return new Response(JSON.stringify({ success: true, order }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Payment verification failed' }), { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return new Response(JSON.stringify({ success: false, error: 'Error verifying payment' }), { status: 500 });
    }
}
