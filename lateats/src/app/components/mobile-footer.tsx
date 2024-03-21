"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileFooter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = sessionStorage.getItem("token");
    if (currentUser) {
      const res = fetch(`http://localhost:5000/users/token/${currentUser}`, {
        mode: "cors",
      });
      console.log("current user:\n" + JSON.stringify(res, null, 2));
      setIsLoggedIn(true);  
    } 
  }, []);

  //logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    console.log("Logged out");
    window.location.reload(); // Add this line to refresh the page after logout
  };

  const openMap = () => {
    const map = document.getElementById("map");
    if (map) {
      map.classList.toggle("hidden");
    }
  };

  return (
    <div className="h-24 bg-white p-4 flex justify-between shadow-inner shaodw-lg">
      {isLoggedIn ? (
          <button
            onClick={logout}
            className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md"
          >
            Stall Login
          </Link>
        )}
      <button
        onClick={openMap}
        className="p-4 text-2xl font-semibold text-white bg-primary rounded-lg drop-shadow-md flex-auto ml-4 text-center"
      >
        View Map
      </button>
    </div>
  );
}