import { NextResponse } from 'next/server';
import connectMongo from "@/lib/mongodb";
import Homestay from "@/models/Homestay";
import Host from "@/models/Host";
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB

export const GET = async (req) => {


  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await connectMongo();

    const pipeline = [
      {
        $match: {
          _id: new ObjectId(id), // Match the Homestay by its _id
        },
      },
      {
        $lookup: {
          from: "hosts", // Assuming the host is stored in a collection called "hosts"
          localField: "host", // Field in Homestay document
          foreignField: "_id", // Field in host document
          as: "hostDetails",
        },
      },
      {
        $unwind: "$hostDetails", // Unwind the host details to make it easier to access
      },
      {
        $addFields: {
          startingPrice: { $min: "$packages.price" },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          host: 1,
          activities: 1,
          location: 1,
          duration: 1,
          images: 1,
          startingPrice: 1,
          includes: 1,
          coordinates: "$location.coordinates", // Make sure the coordinates are in the right format
          hostDetails: {
            name: 1,
            phone: 1,
            email: 1,
          },
          packages: 1,
        },
      },
    ];

    const HomestayData = await Homestay.aggregate(pipeline);
    if (HomestayData.length === 0) {
      return NextResponse.json({ success: false, message: 'Homestay not found' }, { status: 404 });
    }

    // res.status(200).json(HomestayData[0]); // Send the Homestay data
    return NextResponse.json({ success: true, data: HomestayData[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Homestay data:", error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
