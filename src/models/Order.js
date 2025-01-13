import mongoose from 'mongoose';
import { type } from 'os';

const orderSchema = new mongoose.Schema({
    user: { type: String },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    homestay: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestay' },
    amount: Number,
    baseAmt: Number,
    convenienceFee: Number,
    platformFee: Number,
    currency: String,
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    orderId: String,
    notes: {
        notes: String,
    },
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
    qrCode: { type: String },
    scanned: { type: Boolean, default: false}
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
