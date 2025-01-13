import mongoose from 'mongoose';

const { Schema } = mongoose;

// Account Schema
const accountSchema = new Schema(
  {
    id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
    userId: { type: String, required: true, ref: 'User' },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    refresh_token: { type: String, default: null },
    access_token: { type: String, default: null },
    expires_at: { type: Number, default: null },
    token_type: { type: String, default: null },
    scope: { type: String, default: null },
    id_token: { type: String, default: null },
    session_state: { type: String, default: null },
  },
  { timestamps: true }
);

// Composite unique constraint for Account
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;
