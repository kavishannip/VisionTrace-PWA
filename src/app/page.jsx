"use client";
import { useToggle } from "../app/context/ToggleContext";
import OcrText from "../components/Ocr/OcrText.jsx";
import ImagetoText from "../components/ImagetoText/ImagetoText.jsx";


export default function Home() {
  const { activeComponent } = useToggle();

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4">
        {/* Content area for the components */}
        <div className=" w-full flex items-center justify-center">
          {activeComponent === "ocr-text" ? <OcrText /> : <ImagetoText />}
        </div>
      </div>
    </div>
  );
}
