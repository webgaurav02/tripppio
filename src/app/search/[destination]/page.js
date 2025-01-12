'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Components
import Map from "../components/Map";
import Loading from '@/app/components/Loading';
import PackageCard from '../components/PackageCard';

//Assets
import bg_pattern from '../../../../public/bg_pattern.svg'
import Link from 'next/link';

// const packages = [
//     {
//         title: "Mountain Adventure",
//         startingPrice: 199,
//         host: "John's Travel",
//         activities: ["Hiking", "Camping", "Photography"],
//         images: [
//             "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg",
//             "https://vikramtravels.in/wp-content/themes/vikramtravels-child/images/bg-image.jpg"
//         ]
//     },
//     {
//         title: "Beach Getaway",
//         startingPrice: 299,
//         host: "Sunny Tours",
//         activities: ["Snorkeling", "Boat Ride", "Relaxing"],
//         images: [
//             "https://vikramtravels.in/wp-content/themes/vikramtravels-child/images/bg-image.jpg",
//             "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg"
//         ]
//     },
//     {
//         title: "Beach Getaway",
//         startingPrice: 299,
//         host: "Sunny Tours",
//         activities: ["Snorkeling", "Boat Ride", "Relaxing"],
//         images: [
//             "https://discoveryprimetours.com/wp-content/uploads/2023/05/India-Tour-Package.jpg",
//             "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg"
//         ]
//     },
//     {
//         title: "Beach Getaway",
//         startingPrice: 299,
//         host: "Sunny Tours",
//         activities: ["Snorkeling", "Boat Ride", "Relaxing"],
//         images: [
//             "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg",
//             "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg"
//         ]
//     },
//     {
//         title: "City Escape",
//         startingPrice: 149,
//         host: "Urban Adventures",
//         activities: ["Sightseeing", "Shopping", "Fine Dining"],
//         images: [
//             "https://www.indiaeasytrip.com/india-tour-packages/images/package_category/31-12-2022-11-55-48-3-day.jpg",
//             "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg"
//         ]
//     }
// ];



const SearchResultsPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const place_id = usePathname().split('/')[2];
    const [placeData, setPlaceData] = useState();
    const [packages, setPackages] = useState([]);

    const fetchCoordinates = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/google/place-details?place_id=${place_id}`);
            const data = await res.json();
            if (data.result && data.result.geometry) {
                const { lat, lng } = data.result.geometry.location;
                setCoordinates({ lat, lng });
                setPlaceData(data.result);
                setIsLoading(false);

            }
        } catch (error) {
            console.error('Error fetching place details:', error);
            setIsLoading(false);
        }
    };

    const fetchNearby = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/homestay/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}`);
            const data = await res.json();
            if (data.success) {
                setPackages(data.homestays);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching nearby homestays:', error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchCoordinates();
    }, [])

    useEffect(() => {
        if (coordinates) {
            fetchNearby();
        }
    }, [coordinates])



    useEffect(() => {
        console.log(packages)
    }, [packages])


    if (isLoading || !placeData) return <Loading />;

    return (
        <div className="">
            <Map placeData={placeData} />
            <div className=" min-h-[50svh] bg-background rounded-t-[3rem] z-20 w-screen -mt-10 py-10">
                {packages.length !== 0 && <div className="py-10 z-30 pt-20 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:px-60 px-10">
                    {packages.map((packageData, index) => (
                        <PackageCard key={index} packageData={packageData} />
                    ))}
                </div>}
                {packages.length === 0 && <div className='flex min-h-[50svh] justify-center items-center'>
                    <p className='text-text'>No homestays found nearby :(</p>
                </div>}
            </div>
        </div>
    );
};

export default SearchResultsPage;
