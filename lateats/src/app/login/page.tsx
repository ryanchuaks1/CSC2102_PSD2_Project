"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createHash } from "crypto";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("Sending Form\n" + JSON.stringify(formData, null, 2));
    try {
      //Validate Fields
      if (formData.email == "" || formData.password == "") {
        throw new Error("Please fill in all fields"); // Set error message
      }
      //Send Form
      const hashedPassword = createHash("sha256")
        .update(formData.password)
        .digest("hex");
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: hashedPassword,
        }), // Sending hashed password
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      if (hashedPassword == data.body.password) {
        console.log("Login Successful");
        // Create a new random hash token
        const token = createHash("sha256")
          .update(Math.random().toString())
          .digest("hex");
        sessionStorage.setItem("token", token);
        // Update the user with this token
        const res = await fetch("http://localhost:5000/users/token", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            token: token,
          }),
        });
        console.log("token set status:", res)
        // window.location.href = "/";

        //redirect to home page
        // window.location.href = "/";

        // nav back one page
        window.history.back();
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-white lg:flex lg:justify-center lg:pt-5 w-full min-h-screen">
      <div className="flex flex-col px-6 py-12 bg-white lg:w-1/3 lg:border lg:shadow-md h-fit">
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-b-2 border-primary p-2 m-2"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-b-2 border-primary p-2 m-2"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button
          onClick={handleSubmit}
          className="bg-primary text-white p-2 m-2 rounded-lg"
        >
          Login
        </button>
        <Link
          href={"/register"}
          className="bg-white text-primary border border-primary p-2 m-2 rounded-lg text-center hover:bg-gray-100"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
