import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Make sure to get the correct environment variable
      version: "weekly",
    });

    let map: google.maps.Map | undefined;

    // Load the Google Maps script
    loader.load().then(async () => {
      try {
        // Import the Google Maps Library
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

        // If the user allows location access, get the user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });

              // Initialize the map with the user's current location
              map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: latitude, lng: longitude }, // Set the map center to the user's location
                zoom: 16,
              });

              // Optionally, you can add a marker at the user's location
              new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: "You are here",
              });
            },
            (error) => {
              console.error("Error getting location:", error);
              // You can set a default location in case of error
              map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 }, // Default fallback location
                zoom: 16,
              });
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
          // Set a default location if geolocation is not supported
          map = new Map(document.getElementById("map") as HTMLElement, {
            center: { lat: -34.397, lng: 150.644 }, // Default fallback location
            zoom: 16,
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    }).catch((error) => {
      console.error("Error loading the Google Maps API loader:", error);
    });

    // Cleanup on component unmount
    return () => {
      if (map) {
        map = undefined;
      }
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
