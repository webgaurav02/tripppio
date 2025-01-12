import { NextResponse } from 'next/server';
import connectMongo from "@/lib/mongodb";
import Homestay from "@/models/Homestay";
import Host from "@/models/Host";

export const GET = async (req) => {
    try {
        await connectMongo();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");

        if (!lat || !lng) {
            return NextResponse.json({ success: false, message: 'Latitude and Longitude are required' }, { status: 400 });
        }

        const radiusInMeters = 200000; // 200 km in meters

        const pipeline = [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "distance",
                    maxDistance: radiusInMeters,
                    spherical: true,
                },
            },
            {
                $lookup: {
                    from: "hosts", // Assuming the host collection is named 'hosts'
                    localField: "host", // Assuming the 'host' field in Homestay references the Host's object id
                    foreignField: "_id",
                    as: "hostDetails"
                },
            },
            {
                $unwind: "$hostDetails"
            },
            {
                $addFields: {
                    startingPrice: { $min: "$packages.price" },
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    startingPrice: 1,
                    "hostDetails.name": 1,
                    activities: 1,
                    images: 1,
                    distance: 1,
                },
            },
            {
                $sort: { distance: 1 }, // Sort by distance from the search location
            },
        ];

        const homestays = await Homestay.aggregate(pipeline);

        return NextResponse.json({ success: true, homestays });
    } catch (error) {
        console.error('Error fetching homestays:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
};
