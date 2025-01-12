import mongoose from "mongoose";

// Package schema for each homestay package
const PackageSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    details: { type: String, required: true },
    roomType: { type: String, required: true },
    breakfastIncluded: { type: Boolean, default: false },
    additionalFeatures: { type: [String], default: [] },
    avlQuantity: { type: Number, required: true, default: 0 },
});

// Homestay schema with geolocation
const HomestaySchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    host: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Host',  // Reference to the Host model
        required: true 
    },
    location: {
        type: { type: String, default: 'Point' }, // GeoJSON type
        coordinates: { type: [Number], required: true } // [lng, lat] format
    },
    activities: { type: [String], default: [] },
    // location: { type: String, required: true },
    duration: { type: String, required: true },
    images: { type: [String], default: [] },
    includes: { type: String, required: true },
    packages: { type: [PackageSchema], default: [] },
});

// Create a geospatial index on coordinates
HomestaySchema.index({ location: "2dsphere" });

const Homestay = mongoose.models.Homestay || mongoose.model("Homestay", HomestaySchema);

export default Homestay;
