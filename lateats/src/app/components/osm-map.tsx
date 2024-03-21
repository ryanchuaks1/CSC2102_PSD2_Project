"use client";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { error } from "console";
import { captureRejectionSymbol } from "events";

export default function Map(
  { currPosition, 
    isParentLoading,
    searchQuery
   } : { 
    currPosition: [number, number] | null,
    isParentLoading: boolean,
    searchQuery: string
  }) {

  //Store Restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [loading, setLoading] = useState(true);
  const [deniedPermission, setDeniedPermission] = useState(false);

  //IF current Location is not null get the nearby data
  async function fetchNearbyData(longitude: number, latitude: number) {
    try {
      console.log("My location: " + longitude + ", " + latitude);
      const res = await fetch('http://localhost:5000/shops/nearby', {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longitude, latitude }),
      });
    
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const data = await res.json();
      const body = data.body;
      console.log("Nearby Restaurants:\n" + JSON.stringify(body, null, 2));
      setRestaurants(body);

    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }

  //ELSE: Get all Shops
  async function fetchAllShops() {
    try {
      const res = await fetch('http://localhost:5000/shops/index', {
        mode: 'cors',
      });
    
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const data = await res.json();
      const body = data.body;
      //console.log("Get All Shops from Server:\n" + JSON.stringify(body, null, 2));
      setRestaurants(body);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }
  //ENDIF - If statement in use effect
  //        |
  //        |
  //       \ /  
  //        v

  async function getShops() {
    //Update Statueses
    if (!isParentLoading && currPosition != null) {
      console.log("Fetching Nearby Data");
      setLoading(false);
    }
    else if (!isParentLoading && currPosition == null) {
      setDeniedPermission(true);
      setLoading(false);
    }

    //Fetch Nearby Data
    if (currPosition) {
      fetchNearbyData(currPosition[1], currPosition[0]); // [latitude, longitude]
    } else {
      fetchAllShops(); // Default coordinates
    }
  }


  //If SearchQuery != null get the search data
  async function fetchSearchShops(query : string) {
    try {
      const res = await fetch(`http://localhost:5000/shops/search?q=${encodeURIComponent(query)}`, {
      mode: 'cors',
    });
    
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const data = await res.json();
      const body = data.body;
      //console.log("Get Search Shops from Server:\n" + JSON.stringify(body, null, 2));
      setRestaurants(body);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }

  useEffect(() => {
    getShops();
  }, [isParentLoading]);

  useEffect(() => {
    if(searchQuery !== "") {
      setLoading(true);
      fetchSearchShops(searchQuery);
      setLoading(false);
    }
    else
    {
      setLoading(true);
      getShops();
    }
  }, [searchQuery]);

  const openMap = () => {
    const map = document.getElementById("map");
    console.log(map);
    if (map) {
      map.classList.toggle("hidden");
    }
  };

  const customIcon = new L.Icon({
    iconUrl: "/pin.svg",
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Adjust the anchor point of the icon
    popupAnchor: [0, -32], // Adjust the anchor point of the popup
  });
  //const position: LatLngTuple = [1.35, 103.82];

  const userIcon = new L.Icon({
    iconUrl: "/user-pin.svg",
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Adjust the anchor point of the icon
    popupAnchor: [0, -32], // Adjust the anchor point of the popup
  });

  if(loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div role="status">
            <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        <div className="text-2xl font-semibold text-primary">Getting Your Location...</div>
      </div>
    );
  }
  else {
    return (
      <div
        className="hidden lg:block fixed lg:static top-0 left-0 lg:inset-0 z-50 w-screen lg:w-full"
        id="map"
      >
        <MapContainer className="h-[88vh]" center={currPosition || [1.35, 103.82]} zoom={ deniedPermission ? 12 : 30}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currPosition && (
            <Marker
              position={currPosition}
              icon={userIcon}
            >
              <Popup>
                You Are Here
              </Popup>
            </Marker>
          )}
          {restaurants &&
            restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <Marker
                key={restaurant._id}
                position={[restaurant.latitude, restaurant.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <a href={`/shop/${restaurant._id}`}>
                    <div className="text-lg font-semibold">{restaurant.name}</div>
                  </a>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
        <div className="bg-white px-4 shadow-inner shaodw-lg h-[12vh] flex justify-center p-4 lg:hidden">
          <button
            onClick={openMap}
            className="p-4 m-auto text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md text-center w-full"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

}
