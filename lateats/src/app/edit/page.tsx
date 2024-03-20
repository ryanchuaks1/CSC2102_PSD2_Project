"use client";

import FrontendImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Snackbar from "./components/snackbar";

export default function Edit() {

  const [formData, setFormData] = useState({
    shopName: "",
    street: "",
    longitude: "",
    latitude: "",
    cuisine: "",
    closingTime: "",
    discountTime: "",
    discount: "",
    image: "",
  });

  //Snack bar variables
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);

  //Store the Current Shop ID
  const [currShopId, setCurrShopId] = useState("");

  //Onstart: Set the Variables of the form
  useEffect(() => {
    //Check if user is logged in
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/login";
    }
    else
    {
      setLoading(false);
    }

    async function setData() {
      try {
        //Get the User
        const token = sessionStorage.getItem("token");

        const user = await fetch(`http://localhost:5000/users/token/${token}`, {
          mode: 'cors',
        });

        if (!user.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await user.json(); // Extract user data from response
        //console.log("User: " + JSON.stringify(userData, null, 2));
        
        //Get restaurant by user
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
          shopName: body.name,
          street: body.street,
          longitude: body.longitude,
          latitude: body.latitude,
          cuisine: body.cuisine,
          closingTime: body.closingtime,
          discountTime: body.discounttime,
          discount: body.discount,
          image: body.picture,
        });

        setCurrShopId(body._id); // Store the shop id

      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    }

    setData();
  }, []);


  //On Input
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

  //Wei Jun's Resize Function
  function resizeImage(image_src: string, width: number, height: number): Promise<string> {
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
  const showMessage = (message: string) => {
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
        formData.shopName == "" ||
        formData.longitude == "" ||
        formData.latitude == "" ||
        formData.cuisine == "" ||
        formData.closingTime == "" ||
        formData.discountTime == "" ||
        formData.discount == ""
      ) {
        throw new Error("Please fill in all fields"); // Set error message
      }

      if (formData.image != null) {
        formData.image = await resizeImage(formData.image, 256, 256);
      }

      //console.log("Sending Form\n" + JSON.stringify(formData, null, 2));
      //console.log("Shop ID: " + currShopId);

      //Send Form
      const res = await fetch(`http://localhost:5000/shops/update`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            _id: currShopId,
            name: formData.shopName,
            street: formData.street,
            longitude: formData.longitude,
            latitude: formData.latitude,
            cuisine: formData.cuisine,
            closingtime: formData.closingTime,
            discounttime: formData.discountTime,
            discount: formData.discount,
            picture: formData.image,
          }
        ),
      });

      if (!res.ok) {
        throw new Error("Failed to update shop: " + res.statusText);
      }else{
        showMessage("Form Send Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating account:", (error as Error).message);
      showMessage((error as Error).message);
    }
  };

  if (loading) {
    return null;
  }
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

          <div className="flex flex-row items-center p-2 lg:p-0">
            <div className="text-primary text-lg p-1 pl-3 lg:pl-4 mb-4">
              Discount Time:
            </div>
            <input
              type="Time"
              name="discountTime"
              placeholder="Discount Time"
              value={formData.discountTime}
              onChange={handleChange}
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>
          </div>

          <input
            type="number"
            name="discount"
            placeholder="Percentage Discount(%)"
            value={formData.discount}
            onChange={handleChange}
            className="border-b-2 border-primary p-2 m-2 mb-8"
          ></input>

          <div className="text-primary text-lg p-1 pl-3 lg:pl-4 ">
            Shop Profile Picture (Optional):
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

        <Snackbar
            message={snackbarMessage}
            visible={showSnackbar}
          />
      </div>
    </div>
  );
}
