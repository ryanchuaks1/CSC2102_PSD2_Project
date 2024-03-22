"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";

export default function RowSection({ header }: { header: string }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch( BASE_URL + "/shops/top", {
          mode: "cors",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        const body = data.body;
        //console.log("Get Top Shops from Server:\n" + JSON.stringify(body, null, 2));
        setRestaurants(body);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="text-3xl font-semibold text-primary">{header}</div>
      <div className="flex flex-row -mx-2 overflow-x-auto">
        {restaurants.map((restaurant) => (
          <Link
            href={`/shop/${restaurant._id}`}
            className="m-2 p-2 flex flex-col border rounded-md shadow-md min-h-64 min-w-40"
            key={restaurant._id}
          >
            <Image
              src={restaurant.picture ?? ""}
              width={300}
              height={300}
              className="rounded-md"
              alt="Picture of restaurant"
            />
            <div className="text-left mb-2">
              <div className="text-lg font-medium">{restaurant.name}</div>
              <div className="text-sm">{restaurant.cuisine}</div>
              <div className="text-sm">{restaurant.street}</div>
            </div>
            <div className="text-center mt-auto">
              <div className="text-2xl font-medium text-primary">
                {restaurant.discount}% off
              </div>
              <div className="">
                {/* {restaurant.closingtime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} */}
                Closing Time: {restaurant.closingtime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
