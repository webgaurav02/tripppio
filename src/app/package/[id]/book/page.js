'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useDebugValue } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css'; // Optional, customize or remove this

const BookPackage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const packageId = pathname.split('/')[2]; // Extract the package ID from the URL

    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     console.log(selectedPackage)
    // }, [selectedPackage])

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`/api/homestay/info?id=${packageId}`);
                const data = await response.json();
                setPackages(data.data.packages);
                console.log(data.data.packages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, [packageId]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/auth/signin?booking=${packageId}`);
        }
    }, [status, packageId, router]);

    if (status === 'loading' || loading) return <Loading />;

    const handleProceedToPayment = () => {
        if (selectedPackage) {
            router.push(`/package/${packageId}/order-summary?package=${selectedPackage._id}`);
        } else {
            alert('Please select a package.');
        }
    };

    return (
        <div className="max-w-screen-md min-h-[70svh] mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-6">Book Your Package</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Available Packages</h2>
                {packages.length > 0 ? (
                    <Accordion allowZeroExpanded preExpanded={packages.map((_, index) => `item-${index}`)}>
                        {packages.map((pkg, index) => (
                            <AccordionItem key={`item-${index}`} uuid={`item-${index}`}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className="w-full px-4 py-3 text-text text-3xl font-semibold bg-cards focus:outline-none">
                                        ₹{pkg.price}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="px-4 py-4 flex flex-row gap-3 justify-between items-start text-text bg-cards">
                                    <div>
                                        <p>~ {pkg.details}</p>
                                        <p>~ {pkg.roomType} Room</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPackage(pkg)}
                                        disabled={pkg.avlQuantity <= 0}
                                        className={` px-4 py-2 text-text rounded-lg ${selectedPackage?._id === pkg._id ? 'bg-accent' : 'bg-primary'
                                            } ${pkg.avlQuantity > 0 ? '' : 'bg-black'}`}
                                    >
                                        {pkg.avlQuantity > 0
                                            ? selectedPackage?._id === pkg._id
                                                ? 'Selected'
                                                : 'Select'
                                            : 'Not Available'}
                                    </button>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>

                ) : (
                    <p className="text-gray-500">No packages available at the moment.</p>
                )}
            </div>
            <button
                onClick={handleProceedToPayment}
                disabled={!selectedPackage}
                className={`w-full py-3 text-white rounded-lg font-semibold ${selectedPackage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default BookPackage;
