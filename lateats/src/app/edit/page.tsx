"use client";

import Image from "next/image";
import Link from "next/link";
import { isValidElement, useEffect, useState } from "react";
import { createHash } from "crypto";

export default function Edit() {

  const [formData, setFormData] = useState({
    email: "",
    shopName: "",
    street: "",
    longitude: "",
    latitude: "",
    cuisine: "",
    closingTime: "",
    image: "",
  });
  
  useEffect(() => {
    async function setData() {
      try {
        const token = sessionStorage.getItem("token");
        const user = await fetch(`http://localhost:5000/users/token/${token}`, {
          mode: 'cors',
        });

        if (!user.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await user.json(); // Extract user data from response
        console.log(JSON.stringify(userData, null, 2));

        //get restaurant by user
        const res = await fetch(`http://localhost:5000/users/shop/${userData.body._id}`, {
          mode: 'cors',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch shop data');
        }
        
        
        const data = await res.json();
        const body = data.body;

        setFormData({
          ...formData,
          email: userData.body.email,
          shopName: body.name,
          street: body.street,
          longitude: body.longitude,
          latitude: body.latitude,
          cuisine: body.cuisine,
          closingTime: body.closingtime,
        });
        
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    }

    setData();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
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

  const handleSubmit = async () => {
    try {
      //Validate Fields
      if (
        formData.email == "" ||
        formData.shopName == "" ||
        formData.longitude == "" ||
        formData.latitude == "" ||
        formData.cuisine == "" ||
        formData.closingTime == ""
      ) {
        throw new Error("Please fill in all fields"); // Set error message
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error("Please enter a valid email address"); // Set error message
      }

      
      // window.location.href = "/login";
    } catch (error) {
      console.error("Error creating account:", error);

    }
  };

  return (
    <div className="bg-white lg:flex lg:justify-center lg:pt-5 w-full min-h-screen items-center">
      <div className="flex flex-col lg:flex-row px-6 py-12 bg-white items-center">
        <div className="text-center lg:text-left">
          <div className="text-primary text-4xl font-bold font-serif text-center">
            Lateats
          </div>
          <div className="text-slate-950 text-lg text-center p-1">
            Discounted supper near 🫵
          </div>

          <Image
            src="/supper.svg"
            width={500}
            height={500}
            alt="Picture of peopple eating supper"
            className="p-8"
          />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="text-primary text-3xl font-bold font-serif text-center">
            Join us now
          </div>
          <div className="text-slate-950 text-lg text-center p-2">
            We can beat waste together
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 my-8"
          ></input>

          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 mb-8"
          ></input>

          <input
            type="text"
            name="street"
            placeholder="Street Name"
            value={formData.street}
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 mb-8"
          ></input>

          {/* <div className="text-slate-950 text-lg p-1 pl-3 lg:pl-5">
              Location:
            </div> */}
          <div className="flex flex-col lg:flex-row items-center p-2 lg:p-0">
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8 w-full"
            ></input>
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8 w-full"
            ></input>
          </div>

          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 mb-8"
          ></input>

          <div className="flex flex-row items-center p-2 lg:p-0">
            <div className="text-primary text-lg p-1 pl-3 lg:pl-4 mb-4">
              Closing Time:
            </div>
            <input
              type="Time"
              name="closingTime"
              placeholder="Closing Time"
              value={formData.closingTime}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 mb-8"
          ></input>

          <button
            className="bg-primary text-white p-2 m-2 rounded-lg"
            onClick={handleSubmit}
          >
            Register
          </button>

          <div className="text-center mt-4">
            <Link href="/login" className="text-primary underline">
              Already have a shop account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
