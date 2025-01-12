import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const place_id = searchParams.get('place_id');

    if (!place_id) {
        return NextResponse.json({ error: 'Missing place_id' }, { status: 400 });
    }

    try {
        const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

        const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${googleMapsApiKey}`;
        const response = await fetch(googleApiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch place details from Google API');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Google Places data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
