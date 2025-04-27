"use client";
import React, { useState, useCallback } from "react";
import { UploadCloud } from "lucide-react";

function FileUploadArea2({ files, setFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const MAX_FILES = 1;

  // Only allow JPG and PNG files
  const allowedTypes = ["image/jpeg", "image/png"];

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFile = e.dataTransfer.files[0];

        if (!allowedTypes.includes(newFile.type)) {
          alert("Please upload only JPG or PNG files");
          return;
        }

        // Replace any existing file
        setFiles([newFile]);
        e.dataTransfer.clearData();
      }
    },
    [setFiles]
  );

  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFile = e.target.files[0];

        if (!allowedTypes.includes(newFile.type)) {
          alert("Please upload only JPG or PNG files");
          return;
        }

        // Replace any existing file
        setFiles([newFile]);
      }
    },
    [setFiles]
  );

  const removeFile = useCallback(() => {
    setFiles([]);
  }, [setFiles]);

  return (
    <div className="sm:w-120 w-full mt-5">
      {files.length === 0 ? (
        <div
          className={`border-2 border-zinc-500/30 rounded-xl p-8 text-center transition-all duration-300 backdrop-blur-md ${
            isDragging
              ? "bg-zinc-800/50 shadow-lg shadow-zinc-700/20 border-zinc-400/50"
              : "bg-zinc-900/40 hover:bg-zinc-800/50 hover:shadow-md hover:shadow-zinc-700/10"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            backgroundImage: isDragging
              ? "radial-gradient(circle at center, rgba(161, 161, 170, 0.15), rgba(24, 24, 27, 0.4))"
              : "linear-gradient(to bottom, rgba(39, 39, 42, 0.4), rgba(24, 24, 27, 0.4))",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div
              className={`rounded-full p-4 mb-6 transition-all duration-300 ${
                isDragging ? "bg-zinc-700/50 shadow-lg" : "bg-zinc-800/50"
              }`}
            >
              <UploadCloud
                className={`w-10 h-10 transition-all duration-300 ${
                  isDragging ? "text-zinc-200" : "text-zinc-400"
                }`}
                strokeWidth={1.5}
              />
            </div>
            <p className="mb-2 text-sm font-medium text-zinc-200">
              {isDragging ? "Drop to upload" : "Upload your image"}
            </p>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Drag and drop your file here, or click to browse
              <span className="block mt-1 text-zinc-500">JPG/PNG only</span>
            </p>
            <input
              id="file-upload-2"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload-2"
              className="mt-6 px-6 py-2 rounded-full text-sm bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 cursor-pointer hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 shadow-lg shadow-zinc-900/30 border border-zinc-600/30 backdrop-blur-md"
            >
              Select image
            </label>
          </div>
        </div>
      ) : (
        <div className="mt-6 relative overflow-hidden rounded-lg shadow-lg border border-zinc-700/30 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent z-10"></div>
          <img
            src={URL.createObjectURL(files[0])}
            alt="Uploaded image"
            className="w-full h-auto object-cover aspect-video"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center z-20">
            <span className="text-sm text-zinc-200 font-medium truncate max-w-[80%]">
              {files[0].name}
            </span>
            <div className="flex items-center gap-2">
              <input
                id="replace-image"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="replace-image"
                className="flex items-center justify-center px-3 py-1 text-xs rounded-full bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 transition-colors backdrop-blur-md border border-zinc-600/30 cursor-pointer"
              >
                Replace
              </label>
              <button
                type="button"
                onClick={removeFile}
                className="rounded-full w-7 h-7 flex items-center justify-center bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 transition-colors backdrop-blur-md border border-zinc-600/30"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadArea2;
