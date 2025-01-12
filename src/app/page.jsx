'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import hero_img from "../../public/images/hero_img.jpg"

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // Define the scope of suggestions
      componentRestrictions: { country: "in" },
    },
    debounce: 300,
  });

  useEffect(()=> {
    console.log(data)
  }, [data])

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log(`Searching for destination: ${searchTerm}`);
      router.push(`/search/${searchTerm}`)
    }
  }

  const handleSelect = ({ description, place_id }) => () => {
    setValue(description, false);
    setSearchTerm(place_id);
    clearSuggestions();
  };

  const testimonials = [
    {
      name: 'Taylor Ballam',
      role: 'Travel Enthusiast',
      quote: '"This platform made planning our trip effortless and enjoyable!"',
      image: 'https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg',
    },
    {
      name: 'Esther Howard',
      role: 'Host Partner',
      quote: '"Managing my homestay and travel packages has never been easier!"',
      image: 'https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg',
    },
  ];

  const popularDestinations = [
    {
      city: 'Meghalaya',
      country: 'India',
      image: 'https://ychef.files.bbci.co.uk/1280x720/p0gjrxd9.jpg',
    },
    {
      city: 'Leh',
      country: 'Ladakh, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/leh/mmt/destination/m_leh-landscape_l_400_640.jpg',
    },
    {
      city: 'Manali',
      country: 'Himachal Pradesh, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/destination/m_Landscape_l_400_640.jpg',
    },
    {
      city: 'Pondicherry',
      country: 'India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/pondicherry/mmt/destination/m_destination-pondicherry-landscape_l_400_640.jpg',
    },
    {
      city: 'Goa',
      country: 'India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/goa/mmt/destination/m_destination-goa-landscape_l_400_640.jpg',
    },
    {
      city: 'Havelock Island',
      country: 'Andamans, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/havelock/mmt/destination/m_destination_havelock_landscape_l_400_640.jpg',
    },
    {
      city: 'Gokarna',
      country: 'Karnataka, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/gokarna/mmt/destination/m_destination_gokarna_landscape_l_400_640.jpg',
    },
    {
      city: 'Srinagar',
      country: 'India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/srinagar/mmt/destination/m_landscape_l_400_640.jpg',
    },
    {
      city: 'Alleppy',
      country: 'Kerala, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/alleppey/mmt/destination/m_destination-alleppey-landscape_l_400_640.jpg',
    },
    {
      city: 'Ooty',
      country: 'Tamil Nadu, India',
      image: 'https://hblimg.mmtcdn.com/content/hubble/img/ooty/mmt/destination/m_Ooty_activity_mountains_l_368_613.jpg',
    },
  ];

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="relative px-10 w-full h-[70vh] flex items-center justify-center bg-gray-900 text-white">
        <Image
          src={hero_img}
          alt="Explore the world with us"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-70"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">Streamline Your Travel Plans</h1>
          <p className="mt-4 text-lg">Discover homestays and curated travel packages tailored just for you.</p>
          <form onSubmit={handleSearch} className="relative mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search for a destination..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              className="w-full max-w-md text-black px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:scale-105das transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-r-full font-semibold hover:bg-blue-700"
            >
              Search
            </button>
            {status === "OK" && (
              <ul className="absolute left-0 top-10 w-full mt-2 bg-background bg-opacity-80 text-text rounded shadow-xl z-50">
                {data.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-900"
                    onClick={handleSelect(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-background">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="flex overflow-x-auto scrollbar-hide">
          {popularDestinations.map((destination, index) => (
            <div
              key={index}
              className="mx-5 relative min-w-[250px] h-96 rounded-lg overflow-hidden shadow-[rgba(0, 0, 0, 0.9)_0px_4px_12px] group"
            >
              <Image
                src={destination.image}
                alt={`${destination.city}, ${destination.country}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-end p-4 text-white">
                <h3 className="text-lg font-bold">{destination.city}</h3>
                <p className="text-sm">{destination.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-background">
        <h2 className="text-3xl text-text font-bold text-center mb-8">What Our Users Say</h2>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
            className="text-gray-500 hover:text-gray-900 mx-4"
          >
            &larr;
          </button>
          <div className="max-w-md text-center bg-cards py-20 px-10 rounded-lg">
            <Image
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
            <p className="mt-4 italic">{testimonials[currentTestimonial].quote}</p>
            <h4 className="mt-2 font-bold">{testimonials[currentTestimonial].name}</h4>
            <span className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</span>
          </div>
          <button
            onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
            className="text-gray-500 hover:text-gray-900 mx-4"
          >
            &rarr;
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start Planning Your Next Adventure</h2>
        <p className="mb-8">Whether you're booking a homestay or curating travel experiences, we've got you covered.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded">Join Now</button>
      </section>
    </main>
  );
}
