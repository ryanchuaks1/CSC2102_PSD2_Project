"use client";

import { useState } from "react";

export default function ListSection({
  header,
  restaurants,
}: {
  header: string;
  restaurants: Restaurant[];
}) {
  const [visibleRestaurants, setVisibleRestaurants] = useState(3);

  const showMoreRestaurants = () => {
    // Increment the visible restaurants count by 3
    setVisibleRestaurants((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="p-4">
      <div className="text-3xl font-semibold text-primary">{header}</div>
      {restaurants.slice(0, visibleRestaurants).map((restaurant) => (
        <div className="my-3">
          <div className="flex justify-between">
            <div className="text-left">
              <div className="text-lg font-medium">{restaurant.name}</div>
              <div className="">{restaurant.cuisine}</div>
              <div className="">{restaurant.street}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-medium text-primary">
                {restaurant.discount}% off
              </div>
              <div className="">
                {restaurant.closingtime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }).toLocaleLowerCase()}
              </div>
            </div>
          </div>
          <hr className="my-1 h-0.5 border-t-0 bg-gray-200 w-full"></hr>
        </div>
      ))}
      {visibleRestaurants < restaurants.length && (
        <button
          className="text-primary underline cursor-pointer text-center w-full"
          onClick={showMoreRestaurants}
        >
          Show More
        </button>
      )}
    </div>
  );
}
