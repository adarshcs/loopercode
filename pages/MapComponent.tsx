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
        const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const home_pin = new PinElement({
          scale: 1.5,
          background: "#1438FE",
          borderColor: "#39FF14",
          glyphColor: "#39FF14",
        });

        // If the user allows location access, get the user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });

              // Initialize the map with the user's current location
              const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: {lat: latitude, lng: longitude},
                zoom: 12,
                mapId: 'GOOGLE_MAP_ID'
              });
              
              // Optionally, you can add a marker at the user's location
              const marker = new AdvancedMarkerElement({
                map,
                position: { lat: latitude, lng: longitude },
                title: "You are here",
                content: home_pin.element,
                gmpClickable: true,
              });

              // Create an info window to share between markers.
              const infoWindow = new InfoWindow();

              // Add a click listener for each marker, and set up the info window.
              marker.addListener('click', ({ domEvent, latLng }) => {
                const { target } = domEvent;
                infoWindow.close();
                infoWindow.setContent(marker.title);
                infoWindow.open(marker.map, marker);
              });

            },
            (error) => {
              console.error("Error getting location:", error);
              // You can set a default location in case of error
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
          // Set a default location if geolocation is not supported
          
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
