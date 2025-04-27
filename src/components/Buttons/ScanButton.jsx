"use client";
import React from "react";
import { RiEye2Fill } from "react-icons/ri";

const ScanButton = ({
  onClick,
  isDisabled = false,
  isScanning = false,
  text = "Scan",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isScanning}
      className={`
        relative overflow-hidden w-50 h-14 rounded-full font-semibold text-white
        flex items-center justify-center gap-2
        border-1 border-white/80
        ${
          isDisabled
            ? "bg-zinc-600 cursor-not-allowed border-white/40"
            : isScanning
            ? "bg-gradient-to-r from-zinc-600 to-zinc-500"
            : "bg-gradient-to-r from-zinc-700 to-zinc-500 hover:from-zinc-800 hover:to-zinc-600 shadow-[0_0_15px_rgba(161,161,170,0.5)]"
        }
        transition-all duration-300 shadow-lg
      `}
    >
      {isScanning ? (
        <>
          <div className="flex items-center justify-center gap-2">
            <RiEye2Fill className="text-xl animate-pulse" />
            <div className="scanning-text">Scanning</div>
          </div>
        </>
      ) : (
        <>
          <RiEye2Fill className="text-xl" />
          <span>{text}</span>
        </>
      )}
      <style jsx>{`
        .scanning-text::after {
          content: "";
          animation: scanningDots 1.5s infinite;
        }

        @keyframes scanningDots {
          0% {
            content: "";
          }
          25% {
            content: ".";
          }
          50% {
            content: "..";
          }
          75% {
            content: "...";
          }
          100% {
            content: "";
          }
        }

        button:not(:disabled):not(.bg-zinc-400):hover {
          box-shadow: 0 0 20px rgba(161, 161, 170, 0.7);
        }
      `}</style>
    </button>
  );
};

export default ScanButton;
