import mongoose from 'mongoose';

const { Schema } = mongoose;

// VerificationToken Schema
const verificationTokenSchema = new Schema(
  {
    identifier: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: false }
);

// Composite primary key for VerificationToken
verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationToken = mongoose.models.VerificationToken || mongoose.model('VerificationToken', verificationTokenSchema);

export default VerificationToken;
