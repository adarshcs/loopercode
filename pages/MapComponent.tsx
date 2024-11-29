import { Loader } from "@googlemaps/js-api-loader";
import React, { SetStateAction, useEffect, useState } from "react";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [trails, setTrails] = useState([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  console.log('Current location: ', userLocation);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

  const fetchTrails = async () => {
    try {
      const response = await fetch('/api/trails');
      const data = await response.json() as SetStateAction<never[]>;
      console.log("Fetched from DB inside fetchTrails:", data); // Ensure data is fetched correctly
      if (Array.isArray(data) && data.length > 0) {
        setTrails(data); // Set trails state if data is valid
      } else {
        console.error("No trails data received or invalid data structure.");
      }
    } catch (error) {
      console.error('Error fetching trails:', error);
    }
  };

  loader.load().then(async () => {
      try {
        const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const home_pin = new PinElement({
          scale: 1.5,
          background: "#FEDA14",
          borderColor: "#FE14AE",
          glyphColor: "#39FF14",
          glyph: '🏠'
        });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });

              // Initialize the map only once
              const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: latitude, lng: longitude },
                zoom: 12,
                mapId: 'GOOGLE_MAP_ID'
              });

              // Set the map instance to the state
              setMap(map);

              const marker = new AdvancedMarkerElement({
                map,
                position: { lat: latitude, lng: longitude },
                title: "You are here",
                content: home_pin.element,
                gmpClickable: true,
              });

              const infoWindow = new InfoWindow();

              marker.addListener('click', () => {
                infoWindow.close();
                infoWindow.setContent(marker.title);
                infoWindow.open(marker.map, marker);
              });

              // Fetch trails after the map has loaded
              fetchTrails();
              // Don't log trails here as it's still updating state asynchronously


            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    }).catch((error) => {
      console.error("Error loading the Google Maps API loader:", error);
    });

    // Cleanup on component unmount
    return () => {
      // any cleanup needed
    };
  }, []); // Empty dependency array ensures effect runs once when the component mounts

  // Log trails state after it has been updated
  useEffect(() => {
    const createMarkers = async () => {
        
        const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        
        console.log("Updated trails:", trails); // This will log the trails when they have been updated
        if (map) {


          const infoWindow = new InfoWindow();

          type trailInfo = {
            id: number,
            name: string,
            latitude: number,
            longitude: number,
            type: string,
            url: string
          }
          const trailsData: trailInfo[] = trails

          // After trails are fetched, add markers for each trail
          trailsData.forEach((trail) => {
            console.log('Adding marker for trail:', trail.name);
            console.log('Location:', trail.latitude, trail.longitude);
            const trailPin = new PinElement({
              scale: 1.5,
              background: "#FEDA14",
              borderColor: "#FE14AE",
              glyphColor: "#39FF14",
              glyph: '🚲'
            });


            const trailMarker = new AdvancedMarkerElement({
              map,
              position: { lat: trail.latitude, lng: trail.longitude },
              title: trail.name,
              content: trailPin.element,
              gmpClickable: true,
            });

            trailMarker.addListener('click', () => {
              infoWindow.close();
              infoWindow.setContent(trailMarker.title);
              infoWindow.open(trailMarker.map, trailMarker);
            });
          });
        }
    }
    createMarkers();
  }, [trails]); // This will run when trails change
  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
