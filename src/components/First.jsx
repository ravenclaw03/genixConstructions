// src/First.jsx
import React from "react";
import Typical from "react-typical";
import Navbar from "./Navbar.jsx";
import HomeCarousel from "./HomeCarousel.jsx";

const First = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02294A] flex flex-col items-center text-white pt-20">
      <HomeCarousel />
    </div>
  );
};

export default First;
