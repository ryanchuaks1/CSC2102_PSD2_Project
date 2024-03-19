'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function WebHeader() {
  useEffect(() => {
    const currentUser = sessionStorage.getItem("token");
    if (currentUser) {
      const res = fetch(`http://localhost:5000/users/token/${currentUser}`, {
        mode: "cors",
      });
      console.log("current user:\n" + JSON.stringify(res, null, 2));
    } 
  }, []);

  //logout function
  const logout = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem("token");
      console.log("Logged out");
      window.location.reload(); // Add this line to refresh the page after logout
    }
  };

  return (
    <div className="h-28 bg-primary px-6 py-8 flex justify-between">
      <div className="font-bold font-serif text-4xl text-white pb-1">
        Lateats Web
      </div>
      <div className="font-extralight text-xl text-white leading-6 text-center">
        Discounted food for you
        <br />
        Zero leftovers for f&b owners
      </div>
      <div className="self-center">
        {typeof window !== 'undefined' && window.sessionStorage.getItem("token") ? (
          <button
            onClick={logout}
            className="bg-white text-primary font-semibold px-4 py-2 rounded-md text-xl"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="bg-white text-primary font-semibold px-4 py-2 rounded-md text-xl"
          >
            Stall Login
          </Link>
        )}
      </div>
    </div>
  );
}
