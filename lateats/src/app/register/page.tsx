"use client";

import Image from "next/image";
import { isValidElement, useState } from "react";

export default function Register() {

  const [formData, setFormData] = useState({
    email: "",
    shopName: "",
    street: "",
    longitude: "",
    latitude: "",
    cuisine: "",
    closingTime: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        formData.closingTime == "" ||
        formData.password == "" ||
        formData.confirmPassword == ""
      ) {
        throw new Error('Please fill in all fields'); // Set error message
        return; // Exit function early if any field is empty
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Please enter a valid email address'); // Set error message
        return; // Exit function early if email is invalid
      }
      
      //Validate Password
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      console.log("Sending Form\n" + JSON.stringify(formData, null, 2));

      //Send Form
      const res = await fetch("http://localhost:5000/shops/account/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop: {
            name: formData.shopName,
            street: formData.street,
            longitude: formData.longitude, 
            latitude: formData.latitude,
            cuisine: formData.cuisine,
            closingtime: formData.closingTime,
            discounttime: "2024-03-21T20:00:00Z",
            discount: 0,
            rating: 0,
            picture: "https://picsum.photos/200/300",
          },
          user: {
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to register');
      }

      const data = await res.json();
      console.log(data);
    }
    catch (error) {
      console.error('Error creating account:', error);
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
        
        <div className="w-full flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8"
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <button className="bg-primary text-white p-2 m-2 rounded-lg" onClick={handleSubmit}>
              Register
            </button>

            <div className="text-center mt-4">
              <a href="/login" className="text-primary underline">
                Already have a shop account? Login
              </a>
            </div>
          </div>
      </div>
    </div>
  );
}