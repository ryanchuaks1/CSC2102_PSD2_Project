"use client";

import { useEffect, useState } from "react";
import ItemModal from "./item-modal";
import Link from "next/link";

export default function ShopInfo({
  restaurant,
  setIsEditing,
  isEditing,
}: {
  restaurant: Restaurant;
  setIsEditing: Function;
  isEditing: boolean;
}) {
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discounttime = new Date(restaurant.discounttime).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );

  const [formData, setFormData] = useState({
    name: restaurant.name,
    basePrice: "",
    imageFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const currentUser = sessionStorage.getItem("token");
    console.log("current user:\n" + currentUser);
    async function fetchUser() {
      if (currentUser) {
        const res = await fetch(
          `http://localhost:5000/users/token/${currentUser}`,
          {
            mode: "cors",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.body.shop_id === restaurant._id) {
          setIsUserOwner(true);
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="lg:flex lg:p-6 lg:justify-between">
      {isModalOpen && <ItemModal setIsModalOpen={setIsModalOpen} />}
      <div className="hidden lg:block bg-primary p-4 rounded-md shadow-md">
        <div className="font-bold text-3xl text-white font-serif min-w-64">
          {restaurant.name}
        </div>
        <div className="font-light text-lg text-white mb-1">
          {restaurant.cuisine}
        </div>
        <div className="font-medium text-lg text-white">
          {restaurant.street}
        </div>
        {isEditing && (
          <div
            onClick={() => {
              window.location.href = `/edit`;
            }}
            className="px-4 py-2 m-2 text-center text-xl font-semibold bg-yellow-300 hover:bg-yellow-400 text-white rounded-lg drop-shadow-md"
          >
            Edit Shop
          </div>
        )}
      </div>

      <div className="">
        <div className="text-center text-primary text-2xl font-semibold pt-4">
          Discounted Items
        </div>
        <div className="text-center font-medium">
          Closes: {restaurant.closingtime}
        </div>
        <div className="text-center font-medium">
          <span className="text-primary font-bold">{restaurant.discount}%</span>{" "}
          off starts at: {restaurant.discounttime}
        </div>
      </div>

      {isUserOwner ? (
        <div className="self-center text-center mt-2 min-w-72">
          <button
            id="edit-button"
            onClick={() => {
              setIsEditing(!isEditing);
              const editButton = document.getElementById("edit-button");
              if (editButton) {
                editButton.innerText = isEditing ? "Edit" : "Cancel";
                editButton.classList.toggle("animate-pulse");
                editButton.classList.toggle("!bg-red-300");
              }
            }}
            className="px-4 py-2 text-2xl h-fit font-semibold bg-yellow-300 hover:bg-yellow-400 text-white rounded-lg drop-shadow-md mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-2xl h-fit font-semibold bg-green-300 hover:bg-green-400 text-white rounded-lg drop-shadow-md"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="min-w-72"></div>
      )}
    </div>
  );
}
