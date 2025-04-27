import React, { useState } from "react";
import FileUploadArea from "../fileupload/FileUploadArea1";
import ScanButton from "../Buttons/ScanButton";
import OcrResults from "../Ocr/OcrResults";

const OcrText = () => {
  const [images, setImages] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResults, setOcrResults] = useState([]);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (images.length === 0) return;

    setIsScanning(true);
    setOcrResults([]);
    setError(null);

    try {
      // Create form data to send to API
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Make API call to your OCR endpoint
      const response = await fetch("/api/ocr-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOcrResults(data.results || []);
    } catch (err) {
      console.error("OCR Error:", err);
      setError(err.message || "Failed to process images");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
      <div className="text-center mb-8 mt-5">
        <h1 className="text-2xl font-bold mb-2 text-zinc-200">
          OCR Scanner <span className=" text-zinc-300">(AI-Powered)</span>
        </h1>
        <h2 className="text-xl font-medium mb-4 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 text-transparent bg-clip-text">
          "AI that sees, so you can copy."
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto">
          AI scans images, detects text with high accuracy, and lets you copy it
          instantly — effortless and fast.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <FileUploadArea files={images} setFiles={setImages} />
      </div>

      <div className="mt-6 flex justify-center">
        <ScanButton
          onClick={handleScan}
          isDisabled={images.length === 0}
          isScanning={isScanning}
          text="Scan Images"
        />
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 w-full text-center">
          {error}
        </div>
      )}

      <div className="sm:w-160 w-full flex justify-center">
        <OcrResults results={ocrResults} isLoading={isScanning} />
      </div>
    </div>
  );
};

export default OcrText;
