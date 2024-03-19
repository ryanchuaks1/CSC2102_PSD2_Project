"use client";

import { useState } from "react";

export default function ItemModal() {
  const [formData, setFormData] = useState({
    itemName: "",
    basePrice: "",
    imageLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function toggleModal() {
    const modal = document.getElementById("item-modal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  }

  return (
    <div
      id="item-modal"
      className="hidden fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div className="min-h-36 min-w-24 bg-white p-6 flex flex-col">
        <div className="text-center text-primary text-2xl font-semibold mb-4">
          Add/Edit Item
        </div>
        <input
          name="itemName"
          placeholder="Item Name"
          className="border rounded-md p-2 m-2"
          value={formData.itemName}
          onChange={handleChange}
        ></input>
        <input
          name="basePrice"
          placeholder="Base Price"
          className="border rounded-md p-2 m-2"
          value={formData.basePrice}
          onChange={handleChange}
        ></input>
        <input
          name="imageLink"
          placeholder="Image Link"
          className="border rounded-md p-2 m-2"
          value={formData.imageLink}
          onChange={handleChange}
        ></input>
        <button className="bg-primary text-white p-2 m-2 rounded-lg">
          Submit
        </button>
        <button
          onClick={toggleModal}
          className="bg-white text-primary border border-primary p-2 m-2 rounded-lg"
        >
          Cancel
        </button>
        <input></input>
      </div>
    </div>
  );
}
