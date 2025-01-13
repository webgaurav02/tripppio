import connectMongo from '@/lib/mongodb';
import Homestay from '@/models/Homestay';

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const homestayId = searchParams.get('homestayId');
    const packageId = searchParams.get('packageId');

    if (!homestayId || !packageId) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
    }

    await connectMongo();

    // Fetch the homestay and find the selected package
    const homestay = await Homestay.findById(homestayId).lean();
    if (!homestay) {
      return new Response(JSON.stringify({ error: 'Homestay not found' }), { status: 404 });
    }

    const selectedPackage = homestay.packages.find(
      (pkg) => pkg._id.toString() === packageId
    );

    if (!selectedPackage) {
      return new Response(JSON.stringify({ error: 'Package not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ package: selectedPackage }), { status: 200 });
  } catch (error) {
    console.error('Error fetching package details:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
