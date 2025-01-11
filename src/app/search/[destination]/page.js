'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Components
import Map from "../components/Map";
import Loading from '@/app/components/Loading';
import PackageCard from '../components/PackageCard';

const packages = [
    {
        title: "Mountain Adventure",
        startingPrice: 199,
        host: "John's Travel",
        activities: ["Hiking", "Camping", "Photography"],
        images: [
            "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg",
            "https://vikramtravels.in/wp-content/themes/vikramtravels-child/images/bg-image.jpg"
        ]
    },
    {
        title: "Beach Getaway",
        startingPrice: 299,
        host: "Sunny Tours",
        activities: ["Snorkeling", "Boat Ride", "Relaxing"],
        images: [
            "https://vikramtravels.in/wp-content/themes/vikramtravels-child/images/bg-image.jpg",
            "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg"
        ]
    },
    {
        title: "Beach Getaway",
        startingPrice: 299,
        host: "Sunny Tours",
        activities: ["Snorkeling", "Boat Ride", "Relaxing"],
        images: [
            "https://discoveryprimetours.com/wp-content/uploads/2023/05/India-Tour-Package.jpg",
            "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg"
        ]
    },
    {
        title: "Beach Getaway",
        startingPrice: 299,
        host: "Sunny Tours",
        activities: ["Snorkeling", "Boat Ride", "Relaxing"],
        images: [
            "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg",
            "https://blog.irctctourism.com/wp-content/uploads/2020/02/South-India-Tour-Packages.jpg"
        ]
    },
    {
        title: "City Escape",
        startingPrice: 149,
        host: "Urban Adventures",
        activities: ["Sightseeing", "Shopping", "Fine Dining"],
        images: [
            "https://www.indiaeasytrip.com/india-tour-packages/images/package_category/31-12-2022-11-55-48-3-day.jpg",
            "https://www.shikhar.com/blog/wp-content/uploads/2020/01/visit-kashmir-dal-lake_0_0-1024x640.jpg"
        ]
    }
];

const SearchResultsPage = () => {
    const pathname = usePathname().split('/')[2];
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <Loading />;

    return (
        <div className="bg-white mx-0 w-screen">
            <Map searchTerm={pathname} setIsLoading={setIsLoading} />
            <div className="py-10 md:px-10 px-5 bg-background rounded-t-xl w-screen">
                <h1 className="text-4xl font-bold text-text">
                    Travel Packages in <span className='uppercase font-bold'>{pathname}</span>
                </h1>
                <hr className='my-10 border-b border-secondary'/>
                <div className="py-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {packages.map((packageData, index) => (
                        <PackageCard key={index} packageData={packageData} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
