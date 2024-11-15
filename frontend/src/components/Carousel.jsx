import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CarouselTransition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  ];

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="relative h-[542px] overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-full w-full object-cover"
      />
      <button
        className="absolute top-1/2 -translate-y-1/2 left-4 text-white hover:text-gray-300 transition-colors duration-300"
        onClick={handlePrevClick}
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-4 text-white hover:text-gray-300 transition-colors duration-300"
        onClick={handleNextClick}
      >
        <FaChevronRight className="w-6 h-6" />
      </button>
      <NavLink to="/login">
        <button className="absolute bottom-4 right-[700px] text-white px-4 py-2 rounded-md  ">
          <span className="font-semibold text-xl items-center align-middle hover:underline">
            Get Started {<FaArrowRight className="inline align-middle" />}
          </span>
        </button>
      </NavLink>
    </div>
  );
};

export default CarouselTransition;
