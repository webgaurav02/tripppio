'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loading from '@/app/components/Loading';

const SearchResultsPage = ({ searchTerm }) => {

    const [coordinates, setCoordinates] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false)

    // useEffect(() => {
    //     const fetchCoordinates = async () => {
    //         // const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json`);
    //         const res = await fetch(`https://nominatim.openstreetmap.org/search?q=shillong&format=json`);
    //         const data = await res.json();
    //         console.log(data)
    //         if (data[0]) {
    //             setCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
    //         }
    //     };

    //     if (searchTerm) fetchCoordinates();
    // }, []);



    const fetchCoordinates = async () => {
        setIsLoading(true);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`);
        const data = await res.json();
        setIsLoading(false);
        // console.log(data)
        if (data[0]) {
            setCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        }
        
    };

    useEffect(() => {
        fetchCoordinates();
    }, [])

    useEffect(() => {
        console.log(coordinates);
    }, [coordinates])

    if(isLoading) return <Loading />

    return (
        <div className="mx-0 relative">

            <div className='h-full w-full absolute top-0 left-0 bg-black bg-opacity-30 z-10'></div>

            {coordinates && (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ height: '15rem', width: '100svw', padding: '0' }}
                        center={coordinates}
                        zoom={13}
                        options={{
                            mapTypeId: 'hybrid', // Hybrid view combines satellite and labels
                            disableDefaultUI: true,
                        }}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
};

export default SearchResultsPage;
