"use client";
import React, { useState, useCallback, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import imageCompression from "browser-image-compression";

function FileUploadArea1({ files, setFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const MAX_FILES = 3;

  // Only allow JPG and PNG files
  const allowedTypes = ["image/jpeg", "image/png"];

  // Compression options
  const compressionOptions = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1920, // Maximum width or height in pixels
    useWebWorker: true, // Use web worker for better performance
    initialQuality: 0.8, // Initial quality (0 to 1)
  };

  // Handle paste events
  const handlePaste = useCallback(
    async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file && allowedTypes.includes(file.type)) {
            // Create a proper filename for pasted images
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const extension = file.type === 'image/png' ? 'png' : 'jpg';
            const renamedFile = new File([file], `pasted-image-${timestamp}.${extension}`, {
              type: file.type
            });
            imageFiles.push(renamedFile);
          }
        }
      }

      if (imageFiles.length === 0) return;

      const totalFiles = files.length + imageFiles.length;
      if (totalFiles > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} photos`);
        return;
      }

      setIsCompressing(true);
      try {
        const compressedFiles = await Promise.all(
          imageFiles.map(compressFile)
        );

        setFiles((prevFiles) =>
          [...prevFiles, ...compressedFiles].slice(0, MAX_FILES)
        );
      } catch (error) {
        console.error("Error processing pasted files:", error);
      } finally {
        setIsCompressing(false);
      }
    },
    [files, setFiles]
  );

  // Add global paste event listener
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      // Only handle paste if the target is not an input or textarea
      if (
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA' && 
        !e.target.isContentEditable
      ) {
        handlePaste(e);
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
    };
  }, [handlePaste]);

  // Handle file compression
  const compressFile = async (file) => {
    try {
      return await imageCompression(file, compressionOptions);
    } catch (error) {
      console.error("Error compressing file:", error);
      return file; // Return original file if compression fails
    }
  };

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
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = [];
      
      // Handle files from dataTransfer.files
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const fileList = Array.from(e.dataTransfer.files).filter((file) =>
          allowedTypes.includes(file.type)
        );
        droppedFiles.push(...fileList);
      }
      
      // Handle images from dataTransfer.items (for drag from browser/other apps)
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          const item = e.dataTransfer.items[i];
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file && allowedTypes.includes(file.type)) {
              droppedFiles.push(file);
            }
          }
        }
      }

      if (droppedFiles.length === 0) {
        alert("Please upload only JPG or PNG files");
        return;
      }

      const totalFiles = files.length + droppedFiles.length;
      if (totalFiles > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} photos`);
        return;
      }

      setIsCompressing(true);
      try {
        // Compress each file
        const compressedFiles = await Promise.all(
          droppedFiles.map(compressFile)
        );

        setFiles((prevFiles) =>
          [...prevFiles, ...compressedFiles].slice(0, MAX_FILES)
        );
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        setIsCompressing(false);
        e.dataTransfer.clearData();
      }
    },
    [files, setFiles]
  );

  const handleFileChange = useCallback(
    async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files).filter((file) =>
          allowedTypes.includes(file.type)
        );

        if (selectedFiles.length === 0) {
          alert("Please upload only JPG or PNG files");
          return;
        }

        const totalFiles = files.length + selectedFiles.length;
        if (totalFiles > MAX_FILES) {
          alert(`You can only upload up to ${MAX_FILES} photos`);
          return;
        }

        setIsCompressing(true);
        try {
          // Compress each file
          const compressedFiles = await Promise.all(
            selectedFiles.map(compressFile)
          );

          setFiles((prevFiles) =>
            [...prevFiles, ...compressedFiles].slice(0, MAX_FILES)
          );
        } catch (error) {
          console.error("Error processing files:", error);
        } finally {
          setIsCompressing(false);
        }
      }
    },
    [files, setFiles]
  );

  const removeFile = useCallback(
    (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    },
    [setFiles]
  );

  return (
    <div className="sm:w-120 w-full mt-5">
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
          {isCompressing ? (
            <>
              <div className="animate-pulse rounded-full p-4 mb-6 bg-zinc-700/50">
                <UploadCloud
                  className="w-10 h-10 text-zinc-300"
                  strokeWidth={1.5}
                />
              </div>
              <p className="mb-2 text-sm font-medium text-zinc-200">
                Compressing images...
              </p>
            </>
          ) : (
            <>
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
                {isDragging ? "Drop to upload" : "Upload your images"}
              </p>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Drag and drop your files here, paste from clipboard, or click to browse
                <span className="block mt-1 text-zinc-500">
                  Max 3 photos · JPG/PNG only · Will be compressed
                </span>
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
                multiple
                disabled={isCompressing}
              />
              <label
                htmlFor="file-upload"
                className={`mt-6 px-6 py-2 rounded-full text-sm bg-gradient-to-b from-zinc-700 to-zinc-800 text-zinc-100 cursor-pointer hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 shadow-lg shadow-zinc-900/30 border border-zinc-600/30 backdrop-blur-md ${
                  isCompressing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Select images
              </label>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg border border-zinc-700/30 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent z-10"></div>
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-auto object-cover aspect-video"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center z-20">
                <div className="text-sm text-zinc-200 font-medium truncate max-w-[80%]">
                  <span className="block truncate">{file.name}</span>
                  <span className="text-xs text-zinc-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-full w-7 h-7 flex items-center justify-center bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 transition-colors backdrop-blur-md border border-zinc-600/30"
                  disabled={isCompressing}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          {files.length < MAX_FILES && (
            <div className="flex items-center justify-center">
              <input
                id="add-more-files"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
                multiple
                disabled={isCompressing}
              />
              <label
                htmlFor="add-more-files"
                className={`flex flex-col items-center justify-center w-full h-full p-4 border-2 border-dashed border-zinc-700/50 rounded-lg cursor-pointer hover:bg-zinc-800/30 transition-all ${
                  isCompressing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <UploadCloud
                  className="w-8 h-8 text-zinc-500 mb-2"
                  strokeWidth={1.5}
                />
                <span className="text-sm text-zinc-400">
                  Add more ({MAX_FILES - files.length} left)
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-right">
        <p className="text-xs text-zinc-500">
          {files.length}/{MAX_FILES} images uploaded
        </p>
      </div>
    </div>
  );
}

export default FileUploadArea1;
