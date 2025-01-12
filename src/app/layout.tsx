"use client";

import { SessionProvider } from "next-auth/react";
import { LoadScript, useLoadScript } from "@react-google-maps/api";

import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string;

if (!googleMapsApiKey) {
  throw new Error(
    "Google Maps API key is not defined. Please set NEXT_PUBLIC_GOOGLE_MAPS_KEY in your environment variables."
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries: ["places"], // Ensure the "places" library is loaded
  });

  return (
    <html lang="en">
      <body
        className={`font-inter flex flex-col antialiased text-text bg-background`}
      >
        <SessionProvider>
          {isLoaded ? (
            <>
              <Navbar />
              <div className="pt-10 w-screen">{children}</div>
              <Footer />
            </>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <Loading />
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
