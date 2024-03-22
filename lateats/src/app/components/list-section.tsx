"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";


export default function ListSection({
  header,
  searchQuery = "",
  currPosition = null as [number, number] | null
}: {
  header: string;
  searchQuery?: string;
  currPosition?: [number, number] | null;
}) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [numberOfItemstoShow, setNumberOfItemstoShow] = useState(3);

  useEffect(() => {
    if(header === "Near you") {
      //Fetch Nearby Data
      if (currPosition) {
        fetchNearbyShops(currPosition[1], currPosition[0  ]); // [longitude, latitude]
      } else {
        fetchAllShops(); // Default coordinates
      }
    }
    
    if(header === "Recommended") {
      fetchAllShops();
    } 
    //setRestaurants(sampleRestaurants);
  }, [currPosition]);

  useEffect(() => {
    if(searchQuery !== "") {
      fetchSearchShops(searchQuery);
    }
  }, [searchQuery]);
  

  //Get all Shops
  async function fetchAllShops() {
    try {
      const res = await fetch(BASE_URL + '/shops/index', {
        mode: 'cors',
      });
    
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const data = await res.json();
      const body = data.body;
      console.log("Get All Shops from Server:\n" + JSON.stringify(body, null, 2));
      setRestaurants(body);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }

  //Get Nearby Shops
  async function fetchNearbyShops(longitude: number, latitude: number) {
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
      //console.log("Nearby Restaurants:\n" + JSON.stringify(body, null, 2));
      setRestaurants(body);

    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  }

  //Search for Shops
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
  
  const showMoreRestaurants = () => {
    // Increment the visible restaurants count by 3
    setNumberOfItemstoShow((prevVisible) => prevVisible + 3);
    console.log("Number of items to show: " + numberOfItemstoShow);
  };

  return (
    <div className="p-4">
      <div className="text-3xl font-semibold text-primary">{header}</div>
      {restaurants.slice(0, numberOfItemstoShow).map((restaurant) => (
        <Link href={`/shop/${restaurant._id}`} key={restaurant._id}> 
          <div className="my-3 hover:bg-gray-100 transition-all duration-200">
            <div className="flex justify-between">
              <div className="text-left flex-1">
                <div className="text-lg font-medium">{restaurant.name}</div>
                <div className="">{restaurant.cuisine}</div>
                <div className="">{restaurant.street}</div>
              </div>
              <div className="text-right flex-1">
                <div className="text-2xl font-medium text-primary">
                  {restaurant.discount}% off
                </div>
                <div className="">
                  Closing Time: {restaurant.closingtime}
                </div>
              </div>
            </div>
            <hr className="my-1 h-0.5 border-t-0 bg-gray-200 w-full"></hr>
          </div>
        </Link>
      ))}
      {numberOfItemstoShow < restaurants.length && (
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
