"use client";
import React from "react";
import { cn } from "../../app/lib/utils.js";
import { useToggle } from "../../app/context/ToggleContext";
import Logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { IoDocumentText } from "react-icons/io5";
import { RiImageAiFill } from "react-icons/ri";

const NavBar = () => {
  // Use the context hook
  const { activeComponent, setActiveComponent } = useToggle();

  const handlePostTypeChange = (type) => {
    setActiveComponent(type);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-r from-zinc-950/60 via-zinc-800/60 to-zinc-950/60 backdrop-blur-md">
      {/* Space for logo */}
      <div className="mb-4 sm:mb-6 h-12 sm:h-16 flex items-center justify-center mt-4">
        {/* Using the imported logo */}
        <Image
          src={Logo}
          alt="VisionTrace Logo"
          width={480}
          height={192}
          priority
          className="h-5 w-auto sm:h-6 md:h-6 lg:h-6 transition-all duration-200"
        />
      </div>

      {/* Centered toggle */}
      <div className="relative bg-gradient-to-r from-zinc-800/80 to-zinc-700/80 rounded-full p-1 nav-transition w-72 mx-auto shadow-lg shadow-zinc-500/20 border border-zinc-600/20 backdrop-blur-sm mb-4">
        <div
          className={cn(
            "absolute inset-y-0.5 rounded-full transition-all duration-500 ease-in-out",
            activeComponent === "ocr-text"
              ? "left-1 right-[50%]"
              : "left-[50%] right-1"
          )}
          style={{
            background:
              "linear-gradient(135deg, rgba(161, 161, 170, 0.6) 0%, rgba(113, 113, 122, 0.6) 100%)",
            boxShadow: "0 4px 12px rgba(113, 113, 122, 0.3)",
            backdropFilter: "blur(8px)",
          }}
        />
        <div className="relative flex justify-between w-full">
          <button
            onClick={() => handlePostTypeChange("ocr-text")}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center justify-center space-x-1 flex-1 whitespace-nowrap",
              activeComponent === "ocr-text"
                ? "text-white font-semibold scale-105"
                : "text-zinc-300 hover:text-white"
            )}
          >
            <IoDocumentText className="h-3.5 w-3.5" />
            <span>OCR Text</span>
          </button>
          <button
            onClick={() => handlePostTypeChange("image-to-text")}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center justify-center space-x-1 flex-1 whitespace-nowrap",
              activeComponent === "image-to-text"
                ? "text-white font-semibold scale-105"
                : "text-zinc-300 hover:text-white"
            )}
          >
            <RiImageAiFill className="h-3.5 w-3.5" />
            <span>Image to Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
