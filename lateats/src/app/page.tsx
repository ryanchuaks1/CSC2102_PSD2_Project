import { useEffect, useState } from "react";
import ListSection from "./components/list-section";
import MobileFooter from "./components/mobile-footer";
import MobileHeader from "./components/mobile-header";
import RowSection from "./components/row-section";
import SearchBar from "./components/searchbar";
import WebHeader from "./components/web-header";
import dynamic from 'next/dynamic';

export default function Home() {
  const Map = dynamic(() => import('./components/osm-map'), {
    ssr: false,
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="hidden lg:block">
        <WebHeader />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div className="mx-8 -mt-5 lg:max-w-80">
        <SearchBar />
      </div>
      <div className="lg:flex">
        <div className="lg:w-96 lg:overflow-y-scroll lg:h-[88vh] -mt-7 pt-7">
          <ListSection header="Near you"/>
          <ListSection header="Popular"/>
          <RowSection header="Highest Rated" />
        </div>
        <div className="lg:flex-grow lg:block lg:-mt-7">
          <Map restaurants={sampleRestaurants} />
        </div>
      </div>
      <div className="sticky bottom-0 w-full lg:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}

const sampleRestaurants = [
  {
    _id: "1",
    name: "Food Haven",
    street: "123 Main Street",
    longitude: 103.827432,
    latitude: 1.359817,
    cuisine: "Italian",
    closingtime: "21:30",
    discounttime: "20:00",
    discount: 10,
    rating: 4.5,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "2",
    name: "Spice Paradise",
    street: "456 Oak Avenue",
    longitude: 103.822345,
    latitude: 1.364219,
    cuisine: "Indian",
    closingtime: "22:00",
    discounttime: "20:30",
    discount: 15,
    rating: 4.2,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "3",
    name: "Sushi Delight",
    street: "789 Elm Road",
    longitude: 103.817123,
    latitude: 1.349632,
    cuisine: "Japanese",
    closingtime: "20:45",
    discounttime: "19:30",
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "4",
    name: "Burger Bliss",
    street: "321 Maple Lane",
    longitude: 103.832567,
    latitude: 1.369481,
    cuisine: "American",
    closingtime: "21:00",
    discounttime: "19:45",
    discount: 8,
    rating: 4.0,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "5",
    name: "Mango Tango",
    street: "555 Pine Street",
    longitude: 103.81789,
    latitude: 1.355782,
    cuisine: "Asian Fusion",
    closingtime: "22:30",
    discounttime: "21:00",
    discount: 18,
    rating: 4.8,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "6",
    name: "Taco Delight",
    street: "876 Cedar Avenue",
    longitude: 103.842123,
    latitude: 1.362943,
    cuisine: "Mexican",
    closingtime: "20:15",
    discounttime: "19:00",
    discount: 14,
    rating: 4.4,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "7",
    name: "Noodle House",
    street: "999 Oak Lane",
    longitude: 103.808765,
    latitude: 1.340219,
    cuisine: "Chinese",
    closingtime: "21:45",
    discounttime: "20:30",
    discount: 12,
    rating: 4.6,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "8",
    name: "Greek Delight",
    street: "654 Birch Road",
    longitude: 103.85321,
    latitude: 1.375632,
    cuisine: "Greek",
    closingtime: "19:30",
    discounttime: "18:15",
    discount: 16,
    rating: 4.3,
    picture: "https://picsum.photos/200/300",
  },
  {
    _id: "9",
    name: "Fusion Bites",
    street: "789 Pine Lane",
    longitude: 103.825678,
    latitude: 1.351234,
    cuisine: "International",
    closingtime: "22:15",
    discounttime: "20:45",
    discount: 20,
    rating: 4.9,
    picture: "https://picsum.photos/200/300",
  },
];
