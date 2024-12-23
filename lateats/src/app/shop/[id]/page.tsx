"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ItemGrid from "./components/item-grid";
import ShopInfo from "./components/shop-info";
import ShopHeader from "./components/shop-header";
import { BASE_URL } from "@/constants";

export default function Shop({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const isLoggedIn = sessionStorage.getItem("token") ? true : false;

  const logout = () => {
    sessionStorage.removeItem("token");
    console.log("Logged out");
    window.location.reload(); // Add this line to refresh the page after logout
  };

  useEffect(() => {
    // Find the restaurant with the matching id
    async function fetchRestaurant() {
      const res = await fetch( BASE_URL + `/shops/view/${params.id}`, {
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
          <ShopHeader restaurant={restaurant} isEditing={isEditing} />
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
                isEditing={isEditing}
              />
            ))}
          </div>
          <div className="sticky bottom-0 w-screen p-4 flex lg:hidden">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md mr-2"
              >
                Logout
              </button>
            ) : (
              <Link
                href={"/login"}
                className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md mr-2"
              >
                Stall Login
              </Link>
            )}
            <Link
              href={"/"}
              className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md flex-grow text-center"
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
