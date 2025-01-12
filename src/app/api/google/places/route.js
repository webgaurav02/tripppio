// src/api/google/places.js
import fetch from 'node-fetch';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=natural_feature&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error fetching Google Places API:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
}
