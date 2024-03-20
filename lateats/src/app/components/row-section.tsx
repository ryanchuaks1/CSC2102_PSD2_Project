"use client";

import { useEffect, useState } from "react";

export default function RowSection({
    header
  }: {
    header: string;
    
  }) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const sampleRestaurants = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch('http://localhost:5000/shops/top', {
            mode: 'cors',
          });
        
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
        
          const data = await res.json();
          const body = data.body;
          console.log("Get Top Shops from Server:\n" + JSON.stringify(body, null, 2));
          setRestaurants(body);
        } catch (error) {
          console.error('Error fetching shops:', error);
        }
      }
  
      fetchData();
    }, []);
    
    return (
      <div className="p-4">
        <div className="text-3xl font-semibold text-primary">{header}</div>
        <div className="flex flex-row -mx-2 overflow-x-auto">
          {restaurants.map((restaurant) => (
            <div className="m-2 p-2 flex flex-col border rounded-md shadow-md min-h-64 min-w-40" key={restaurant._idid}>
              <img
                src={restaurant.picture}
                className="w-full h-32 object-cover rounded-md"
              ></img>
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
            </div>
          ))}
        </div>
      </div>
    );
  }