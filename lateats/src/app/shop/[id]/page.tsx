"use client";

import { useEffect, useState } from "react";
import MobileHeader from "./components/shop-header";
import Link from "next/link";
import ItemGrid from "./components/item-grid";
import ShopInfo from "./components/shop-info";
import ShopHeader from "./components/shop-header";

export default function Shop({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Find the restaurant with the matching id
    const foundRestaurant = sampleRestaurants.find(
      (restaurant) => restaurant.id === parseInt(params.id)
    );
    setRestaurant(foundRestaurant || null); // If no restaurant found, set to null
  }, [params.id]);

  return (
    <div>
      {restaurant ? (
        <div className="min-h-screen bg-white">
          <ShopHeader
            name={restaurant.name}
            cuisine={restaurant.cuisine}
            street={restaurant.street}
          />
          <ShopInfo
            closingtime={restaurant.closingtime}
            discount={restaurant.discount}
            discounttime={restaurant.discounttime}
          />
          <div className="m-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {foodItems.map((item) => (
              <ItemGrid
                key={item.id}
                item={item}
                discount={restaurant.discount}
              />
            ))}
          </div>
          <div className="w-screen h-auto sticky bottom-0 p-4 flex justify-center lg:hidden">
            <Link
              href="/"
              className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md w-full text-center"
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center bg-primary">
          <img src="/fryingpan_animated.gif" className="w-36 self-center"></img>
          <div className="text-white text-3xl text-center w-full">
            Loading...
          </div>
          <div className="text-white text-light text-lg text-center w-full mt-3">
            If it is taking too long, go{" "}
            <Link href="/" className="underline">
              back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const sampleRestaurants = [
  {
    id: 1,
    name: "Food Haven",
    street: "123 Main Street",
    longitude: 103.827432,
    latitude: 1.359817,
    cuisine: "Italian",
    closingtime: new Date("2024-03-11T21:30:00"),
    discounttime: new Date("2024-03-11T20:00:00"),
    discount: 10,
    rating: 4.5,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Spice Paradise",
    street: "456 Oak Avenue",
    longitude: 103.822345,
    latitude: 1.364219,
    cuisine: "Indian",
    closingtime: new Date("2024-03-11T22:00:00"),
    discounttime: new Date("2024-03-11T20:30:00"),
    discount: 15,
    rating: 4.2,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Sushi Delight",
    street: "789 Elm Road",
    longitude: 103.817123,
    latitude: 1.349632,
    cuisine: "Japanese",
    closingtime: new Date("2024-03-11T20:45:00"),
    discounttime: new Date("2024-03-11T19:30:00"),
    discount: 12,
    rating: 4.7,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Burger Bliss",
    street: "321 Maple Lane",
    longitude: 103.832567,
    latitude: 1.369481,
    cuisine: "American",
    closingtime: new Date("2024-03-11T21:00:00"),
    discounttime: new Date("2024-03-11T19:45:00"),
    discount: 8,
    rating: 4.0,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    name: "Mango Tango",
    street: "555 Pine Street",
    longitude: 103.81789,
    latitude: 1.355782,
    cuisine: "Asian Fusion",
    closingtime: new Date("2024-03-11T22:30:00"),
    discounttime: new Date("2024-03-11T21:00:00"),
    discount: 18,
    rating: 4.8,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    name: "Taco Delight",
    street: "876 Cedar Avenue",
    longitude: 103.842123,
    latitude: 1.362943,
    cuisine: "Mexican",
    closingtime: new Date("2024-03-11T20:15:00"),
    discounttime: new Date("2024-03-11T19:00:00"),
    discount: 14,
    rating: 4.4,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 7,
    name: "Noodle House",
    street: "999 Oak Lane",
    longitude: 103.808765,
    latitude: 1.340219,
    cuisine: "Chinese",
    closingtime: new Date("2024-03-11T21:45:00"),
    discounttime: new Date("2024-03-11T20:30:00"),
    discount: 12,
    rating: 4.6,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 8,
    name: "Greek Delight",
    street: "654 Birch Road",
    longitude: 103.85321,
    latitude: 1.375632,
    cuisine: "Greek",
    closingtime: new Date("2024-03-11T19:30:00"),
    discounttime: new Date("2024-03-11T18:15:00"),
    discount: 16,
    rating: 4.3,
    picture: "https://picsum.photos/200/300",
  },
  {
    id: 9,
    name: "Fusion Bites",
    street: "789 Pine Lane",
    longitude: 103.825678,
    latitude: 1.351234,
    cuisine: "International",
    closingtime: new Date("2024-03-11T22:15:00"),
    discounttime: new Date("2024-03-11T20:45:00"),
    discount: 20,
    rating: 4.9,
    picture: "https://picsum.photos/200/300",
  },
];

const foodItems = [
  {
    id: 1,
    name: "Pizza",
    price: 10.99,
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    id: 2,
    name: "Burger",
    price: 8.49,
    image: "https://picsum.photos/id/238/200/300",
  },
  {
    id: 3,
    name: "Sushi",
    price: 15.99,
    image: "https://picsum.photos/id/239/200/300",
  },
  {
    id: 4,
    name: "Salad",
    price: 6.99,
    image: "https://picsum.photos/id/240/200/300",
  },
  {
    id: 5,
    name: "Pasta",
    price: 12.99,
    image: "https://picsum.photos/id/241/200/300",
  },
  {
    id: 6,
    name: "Steak",
    price: 19.99,
    image: "https://picsum.photos/id/242/200/300",
  },
  {
    id: 7,
    name: "Tacos",
    price: 9.99,
    image: "https://picsum.photos/id/243/200/300",
  },
  {
    id: 8,
    name: "Fried Chicken",
    price: 7.99,
    image: "https://picsum.photos/id/244/200/300",
  },
  {
    id: 9,
    name: "Sushi Rolls",
    price: 18.99,
    image: "https://picsum.photos/id/300/200/300",
  },
  {
    id: 10,
    name: "Ramen",
    price: 11.99,
    image: "https://picsum.photos/id/500/200/300",
  },
  {
    id: 11,
    name: "Fish and Chips",
    price: 14.99,
    image: "https://picsum.photos/id/247/200/300",
  },
  {
    id: 12,
    name: "Hamburger",
    price: 8.99,
    image: "https://picsum.photos/id/248/200/300",
  },
  {
    id: 13,
    name: "Caesar Salad",
    price: 7.49,
    image: "https://picsum.photos/id/249/200/300",
  },
  {
    id: 14,
    name: "Burrito",
    price: 10.49,
    image: "https://picsum.photos/id/250/200/300",
  },
  {
    id: 15,
    name: "Chicken Wings",
    price: 9.99,
    image: "https://picsum.photos/id/251/200/300",
  },
  {
    id: 16,
    name: "Lasagna",
    price: 13.99,
    image: "https://picsum.photos/id/252/200/300",
  },
  {
    id: 17,
    name: "Sashimi",
    price: 16.99,
    image: "https://picsum.photos/id/253/200/300",
  },
  {
    id: 18,
    name: "Pho",
    price: 10.99,
    image: "https://picsum.photos/id/254/200/300",
  },
  {
    id: 19,
    name: "Nachos",
    price: 8.99,
    image: "https://picsum.photos/id/255/200/300",
  },
  {
    id: 20,
    name: "Tiramisu",
    price: 6.49,
    image: "https://picsum.photos/id/256/200/300",
  },
];
