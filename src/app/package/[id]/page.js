'use client';

// Framer motion
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleMap, Marker } from '@react-google-maps/api';

import bg_pattern from "../../../../public/bg_pattern.svg"
import tourist_placeholder from "../../../../public/images/tourist_placeholder.jpg"
import Loading from "@/app/components/Loading";
import Link from "next/link";

const PackageDetails = () => {
    const pathname = usePathname();
    const packageId = pathname.split('/')[2]; // Extract the package ID from the URL
    const [nearbyAttractions, setNearbyAttractions] = useState([]);
    const [packageData, setPackageData] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();

    const toggleShowMore = () => setShowMore(prev => !prev);

    const fetchAttractions = async () => {
        try {
            const response = await fetch(`/api/google/places?lat=${packageData.location.coordinates[1]}&lng=${packageData.location.coordinates[0]}&radius=50000`);
            const data = await response.json();
            const attractionsWithPhotos = data.results.filter(place => place.photos && place.photos.length > 0);
            setNearbyAttractions(attractionsWithPhotos);
        } catch (error) {
            console.error('Error fetching attractions:', error);
        }
    };

    useEffect(() => {
        const fetchPackageData = async () => {
            const response = await fetch(`/api/homestay/info?id=${packageId}`);
            const data = await response.json();
            setPackageData(data.data);
        };

        fetchPackageData();
    }, [packageId]);

    useEffect(() => {
        if (packageData) {
            fetchAttractions();
        }
    }, [packageData]);

    if (!packageData) return <Loading />;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    const handleBookNow = () => {
        router.push(`/package/${packageId}/book`)
        return null;
    }

    return (
        <div className="relative max-w-screen">
            <div className='mx-auto md:px-40 px-10 py-20 z-30 max-w-screen'>
                <div className="mb-6">
                    {/* <p className="text-xl font-bold">{packageData.hostDetails.name}</p> */}
                    <h1 className="text-5xl font-bold">{packageData.title}</h1>
                    <p className="text-lg text-gray-400">{packageData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Images</h2>
                        {/* <Slider {...settings}>
                            {packageData.images.map((image, index) => (
                                <div key={index} className="flex justify-center">
                                    <Image
                                        src={image || tourist_placeholder}
                                        alt={packageData.title}
                                        width={800}
                                        height={600}
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </Slider> */}
                    </div>

                    <div className="mb-6 md:pl-10">
                        <div className="p-6 rounded-lg shadow-md bg-cards mb-5">
                            <div className='flex md:flex-row flex-col-reverse justify-between gap-5'>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Book This Package</h2>
                                    {/* <p className="text-lg mb-4">
                                        <strong>Location:</strong> {packageData.location.coordinates.join(', ')}
                                    </p> */}
                                    <p className="text-lg mb-4">
                                        <strong>Duration:</strong> {packageData.duration}
                                    </p>
                                </div>
                                <div className='md:text-right '>
                                    <p className="text-xl font-semibold mt-2">Starting at </p>
                                    <p className='text-6xl font-black'>₹{packageData.startingPrice}</p>
                                    <p className="text-sm text-gray-500">{packageData.hostDetails.name}</p>
                                </div>
                            </div>

                            <button onClick={handleBookNow} className="w-full bg-accent mt-3 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
                                Book Now
                            </button>
                        </div>
                        <div>
                            <GoogleMap
                                mapContainerStyle={{ height: '25svh', width: '100%' }}
                                center={{ lat: packageData.location.coordinates[1], lng: packageData.location.coordinates[0] }}
                                zoom={13}
                                options={{
                                    mapTypeId: 'hybrid',
                                    disableDefaultUI: true,
                                }}
                            >
                                <Marker position={{ lat: packageData.location.coordinates[1], lng: packageData.location.coordinates[0] }} />
                            </GoogleMap>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Activities</h2>
                    <div className="inline">
                        {packageData.activities.map((activity, index) => (
                            <span className='bg-accent text-white text-nowrap px-3 py-1 mr-2 rounded-full' key={index}>{activity}</span>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                    <div className={`relative overflow-hidden transition-all duration-300 ${showMore ? "max-h-full" : "max-h-32"}`}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {packageData.includes}
                        </motion.p>
                        {!showMore && (
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
                        )}
                    </div>
                    <button onClick={toggleShowMore} className="mt-4 text-blue-600 hover:underline font-semibold">
                        {showMore ? "View Less" : "View More"}
                    </button>
                </div>

                <div className="mt-10 transition-all duration-500">
                    <h2 className="text-2xl font-semibold mb-4">Nearby Tourist Attractions</h2>
                    <div className={`relative flex gap-5 no-scrollbar overflow-y-hidden overflow-x-scroll transition-all duration-300 `}>
                        {nearbyAttractions && nearbyAttractions.map((place, index) => (
                            <Link href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`} target="_blank" rel="noopener noreferrer" key={index} className="hover:scale-[99%] hover:bg-accent transition-all duration-300 w-[250px] rounded-b-lg shadow-lg bg-cards flex-shrink-0 flex flex-col justify-between">
                                {place.photos && place.photos[0] && (
                                    <div className="rounded-t-lg">
                                        <Image
                                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`}
                                            alt={place.name}
                                            width={300}
                                            height={300}
                                            className=" rounded-t-lg h-40 aspect-square object-cover"
                                        />
                                        <h3 className="text-lg font-bold text-wrap max-w-[250px] px-4 py-2">{place.name}</h3>
                                    </div>
                                )}
                                <div className="p-4">
                                    
                                    <p className="text-sm text-gray-300 max-w-[250px]">{place.vicinity}</p>
                                    <p className="mt-2 text-sm text-gray-300">
                                        Rating: {`${place.rating}/5` || "N/A"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
