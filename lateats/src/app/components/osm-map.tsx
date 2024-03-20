"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import Link from "next/link";

export default function Map({ restaurants }: { restaurants: Restaurant[] }) {
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
  const position: LatLngTuple = [1.35, 103.82];

  return (
    <div
      className="hidden lg:block fixed lg:static top-0 left-0 lg:inset-0 z-50 w-screen lg:w-full"
      id="map"
    >
      <MapContainer className="h-[88vh]" center={position} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants &&
          restaurants.length > 0 &&
          restaurants.map((restaurant) => (
            <Marker
              key={restaurant._id}
              position={[restaurant.latitude, restaurant.longitude]}
              icon={customIcon}
            ></Marker>
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
