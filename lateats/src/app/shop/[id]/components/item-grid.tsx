import React, { useState } from "react";
import Image from "next/image";
import ItemModal from "./item-modal";

export default function ItemGrid({
  item,
  discount,
  isEditing,
}: {
  item: FoodItem;
  discount: number;
  isEditing: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteItem = async () => {
    console.log(item._id);
    const res = await fetch("http://localhost:5000/items/delete", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item._id }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
    window.location.reload();
  };

  return (
    <div key={item._id} className="m-2 shadow-md border rounded-md">
      <div className="pb-2">
        {isEditing && (
          <div className="flex">
            <button
              onClick={toggleModal} // Use toggleModal directly here
              className="lg:text-lg m-1 lg:m-2 p-2 px-2 lg:px-4 bg-yellow-400 rounded-md text-white flex-grow"
            >
              Edit
            </button>
            <button
              onClick={deleteItem}
              className="lg:text-lg m-1 lg:m-2 p-2 px-2 lg:px-4 bg-red-400 rounded-md text-white flex-grow"
            >
              Delete
            </button>
          </div>
        )}
        <Image
          src={`data:image/jpeg;base64,${item.image}`}
          width={300}
          height={300}
          className="rounded-t-md"
          alt={item.name}
        />
        <div className="text-center font-semibold mt-2">{item.name}</div>
        <div className="flex justify-center">
          <div className="text-center line-through">${item.base_price}</div>
          <div className="text-center font-semibold text-primary ml-1">
            $
            {(item.base_price - item.base_price * (discount / 100)).toPrecision(
              3
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <ItemModal item={item} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
