"use client";

import { useState } from "react";
export default function ItemModal() {
  const [formData, setFormData] = useState({
    itemName: "",
    basePrice: "",
    imageFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, [e.target.name]: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    try {
      if (
        formData.itemName == "" ||
        formData.basePrice == "" ||
        formData.imageFile == null
      ) {
        throw new Error("Please fill in all fields"); // Set error message
      }
  
      resizeImage(formData.imageFile, 256, 256)
        .then(async (resizedImage) => { // Make the arrow function async
          console.log(resizedImage);
          const image_b64 = resizedImage.split(",")[1];
  
          const new_item = {
            name: formData.itemName,
            base_price: formData.basePrice,
            image: image_b64,
          }
  
          // Send Form
          const res = await fetch("http://localhost:5000/items/create", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: sessionStorage.getItem("token"),
              item: new_item
            })
          });
  
          if (!res.ok) {
            throw new Error("Failed to add new item");
          }
  
          const data = await res.json();
          console.log(data);
          window.location.reload();
        })
        .catch((error) => {
          throw new Error(error);
        });
  
    } catch (error) {
      console.error("Error adding a new item: ", error);
    }
  }

  
  function resizeImage(image_src: string, width: number, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
  
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
  
      img.onerror = (error) => {
        reject(error);
      };
  
      img.src = image_src;
    });
  }

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
          type="file"
          name="imageFile"
          placeholder="Image"
          className="border rounded-md p-2 m-2"
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="bg-primary text-white p-2 m-2 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          onClick={toggleModal}
          className="bg-white text-primary border border-primary p-2 m-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
