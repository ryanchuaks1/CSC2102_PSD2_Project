"use client";

import { useEffect, useState } from "react";
import MobileHeader from "./components/shop-header";
import Link from "next/link";
import ItemGrid from "./components/item-grid";
import ShopInfo from "./components/shop-info";
import ShopHeader from "./components/shop-header";

export default function Shop({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Find the restaurant with the matching id
    async function fetchRestaurant() {
      const res = await fetch(`http://localhost:5000/shops/view/${params.id}`, {
        mode: "cors",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data.body);
      setRestaurant(data.body.shop);
      setFoodItems(data.body.items);
    }
    fetchRestaurant();
  }, [params.id]);

  return (
    <div>
      {restaurant ? (
        <div className="min-h-screen bg-white">
          <ShopHeader restaurant={restaurant} />
          <ShopInfo
            restaurant={restaurant}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
          <div className="m-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {foodItems.map((item) => (
              <ItemGrid
                key={item._id}
                item={item}
                discount={restaurant.discount}
              />
            ))}
          </div>
          <div className="sticky bottom-0 w-screen p-4 flex justify-center lg:hidden">
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

// const foodItems = [
//   {
//     id: 1,
//     name: "Pizza",
//     price: 10.99,
//     // the image variable is after this string: data:image/jpeg;base64,<item.image>
//     // hence, <img src="data:image/jpeg;base64,<item.image>"
//     image: "data:image/jpeg;base64,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",
//   },
//   {
//     id: 2,
//     name: "Burger",
//     price: 8.49,
//     image: "https://picsum.photos/id/238/200/300",
//   },
//   {
//     id: 3,
//     name: "Sushi",
//     price: 15.99,
//     image: "https://picsum.photos/id/239/200/300",
//   },
//   {
//     id: 4,
//     name: "Salad",
//     price: 6.99,
//     image: "https://picsum.photos/id/240/200/300",
//   },
//   {
//     id: 5,
//     name: "Pasta",
//     price: 12.99,
//     image: "https://picsum.photos/id/241/200/300",
//   },
//   {
//     id: 6,
//     name: "Steak",
//     price: 19.99,
//     image: "https://picsum.photos/id/242/200/300",
//   },
//   {
//     id: 7,
//     name: "Tacos",
//     price: 9.99,
//     image: "https://picsum.photos/id/243/200/300",
//   },
//   {
//     id: 8,
//     name: "Fried Chicken",
//     price: 7.99,
//     image: "https://picsum.photos/id/244/200/300",
//   },
//   {
//     id: 9,
//     name: "Sushi Rolls",
//     price: 18.99,
//     image: "https://picsum.photos/id/300/200/300",
//   },
//   {
//     id: 10,
//     name: "Ramen",
//     price: 11.99,
//     image: "https://picsum.photos/id/500/200/300",
//   },
//   {
//     id: 11,
//     name: "Fish and Chips",
//     price: 14.99,
//     image: "https://picsum.photos/id/247/200/300",
//   },
//   {
//     id: 12,
//     name: "Hamburger",
//     price: 8.99,
//     image: "https://picsum.photos/id/248/200/300",
//   },
//   {
//     id: 13,
//     name: "Caesar Salad",
//     price: 7.49,
//     image: "https://picsum.photos/id/249/200/300",
//   },
//   {
//     id: 14,
//     name: "Burrito",
//     price: 10.49,
//     image: "https://picsum.photos/id/250/200/300",
//   },
//   {
//     id: 15,
//     name: "Chicken Wings",
//     price: 9.99,
//     image: "https://picsum.photos/id/251/200/300",
//   },
//   {
//     id: 16,
//     name: "Lasagna",
//     price: 13.99,
//     image: "https://picsum.photos/id/252/200/300",
//   },
//   {
//     id: 17,
//     name: "Sashimi",
//     price: 16.99,
//     image: "https://picsum.photos/id/253/200/300",
//   },
//   {
//     id: 18,
//     name: "Pho",
//     price: 10.99,
//     image: "https://picsum.photos/id/254/200/300",
//   },
//   {
//     id: 19,
//     name: "Nachos",
//     price: 8.99,
//     image: "https://picsum.photos/id/255/200/300",
//   },
//   {
//     id: 20,
//     name: "Tiramisu",
//     price: 6.49,
//     image: "https://picsum.photos/id/256/200/300",
//   },
// ];
