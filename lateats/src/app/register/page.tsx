"use client";

import FrontendImage from "next/image";
import Link from "next/link";
import { isValidElement, useState } from "react";
import { createHash } from "crypto";
import Snackbar from "./components/snackbar";
import { BASE_URL } from "@/constants";

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
    image: ""
  });

  //Snack bar variables
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    //Wei Jun's Resize Function
  function resizeImage(
    image_src: string,
    width: number,
    height: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image() as HTMLImageElement;

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

  //Show Error Message
  const showErrorMessage = (message: string) => {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    // Show Error for 5 seconds
    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);
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
        formData.confirmPassword == "" ||
        formData.image == ""
      ) {
        throw new Error("Please fill in all fields"); // Set error message
      }

      if (formData.image != null) {
        formData.image = await resizeImage(formData.image, 256, 256);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error("Please enter a valid email address"); // Set error message
      }

      //Validate Password
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      console.log("Sending Form\n" + JSON.stringify(formData, null, 2));
      const hashedPassword = createHash("sha256")
        .update(formData.password)
        .digest("hex");
      //Send Form
      const res = await fetch( BASE_URL + "/shops/account/create", {
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
            picture: formData.image,
          },
          user: {
            email: formData.email,
            password: hashedPassword,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      const data = await res.json();
      console.log(data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error creating account:", error);
      showErrorMessage((error as Error).message);
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

          <FrontendImage
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
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8 w-full"
            ></input>
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
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

          <div className="text-primary text-lg p-1 pl-3 lg:pl-4 ">
            Shop Profile Picture:
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

          <Snackbar message={snackbarMessage} visible={showSnackbar} />
        </div>
      </div>
    </div>
  );
}
