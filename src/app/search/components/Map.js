'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Loading from '@/app/components/Loading';
import { useParams, usePathname } from 'next/navigation';

const SearchResultsPage = ({ placeData }) => {

    const [coordinates, setCoordinates] = useState(placeData.geometry.location);

    return (
        <div className="mx-0 relative">

            <div className='h-full w-full flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-65 z-10'>
                {placeData && <h1 className="text-4xl  text-center font-bold text-white">
                    Travel Packages in <span className='uppercase font-bold'>{placeData.address_components[0].long_name}</span>
                </h1>}
            </div>

            {coordinates && (
                <GoogleMap
                    mapContainerStyle={{ height: '20rem', width: '100svw', padding: '0' }}
                    center={coordinates}
                    zoom={13}
                    options={{
                        mapTypeId: 'hybrid', // Hybrid view combines satellite and labels
                        disableDefaultUI: true,
                    }}
                >
                    <Marker position={coordinates} />
                </GoogleMap>
            )}
        </div>
    );
};

export default SearchResultsPage;
