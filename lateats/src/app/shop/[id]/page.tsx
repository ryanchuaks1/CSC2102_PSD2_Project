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
    async function fetchRestaurant() {
      const res = await fetch(`http://localhost:5000/shops/view/${params.id}`, {
        mode: "cors",
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      console.log(data.body);
      setRestaurant(data.body.shop);
    }
    fetchRestaurant();
  }, [params.id]);

  return (
    <div>
      {restaurant ? (
        <div className="min-h-screen bg-white">
          <ShopHeader restaurant={restaurant} />
          <ShopInfo restaurant={restaurant} />
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
