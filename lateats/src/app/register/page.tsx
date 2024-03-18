"use client";

import Image from "next/image";

export default function Register() {
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
              placeholder="Email"
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <input
              type="text"
              placeholder="Shop Name"
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            {/* <div className="text-slate-950 text-lg p-1 pl-3 lg:pl-5">
              Location:
            </div> */}
            <div className="flex flex-col lg:flex-row items-center p-2 lg:p-0">
              <input
                type="number"
                placeholder="Longitude"
                className="border-b-2 border-primary p-2 m-2 mb-8 w-full"
              ></input>
              <input
                type="number"
                placeholder="Latitude"
                className="border-b-2 border-primary p-2 m-2 mb-8 w-full"
              ></input>
            </div>

            <input
              type="text"
              placeholder="Cuisine"
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <div className="flex flex-row items-center p-2 lg:p-0">
              <div className="text-primary text-lg p-1 pl-3 lg:pl-4 mb-4">
                Closing Time:
              </div>
              <input
                type="Date"
                placeholder="Closing Time"
                className="border-b-2 border-primary p-2 m-2 mb-8"
              ></input>
            </div>

            <input
              type="password"
              placeholder="Password"
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <input
              type="password"
              placeholder="Confirm Password"
              className="border-b-2 border-primary p-2 m-2 mb-8"
            ></input>

            <button className="bg-primary text-white p-2 m-2 rounded-lg">
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