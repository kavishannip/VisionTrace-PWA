import React, { useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { MdOutlineDownloadDone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ImageTextResults = ({ results, isLoading }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="w-full mt-8 p-6 backdrop-blur-sm bg-zinc-800/60 rounded-xl border border-zinc-700/50 shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-2">
            <div className="h-4 bg-zinc-700/70 rounded-full w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-700/70 rounded-full"></div>
              <div className="h-4 bg-zinc-700/70 rounded-full w-5/6"></div>
              <div className="h-4 bg-zinc-700/70 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 space-y-6"
    >
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`backdrop-blur-md bg-zinc-800/70 rounded-xl overflow-hidden border border-zinc-700/40 shadow-lg transition-all duration-300 ${
              hoveredIndex === index ? "translate-y-[-2px] shadow-xl" : ""
            }`}
          >
            <div className="px-5 py-3 bg-zinc-900/50 font-medium flex justify-between items-center backdrop-blur-sm border-b border-zinc-700/40 sm:w-160 w-full">
              <span className="text-zinc-300 text-sm tracking-wide truncate max-w-[80%]">
                AI-Generated Prompt
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(result.generatedPrompt, index)}
                className="text-zinc-400 hover:text-white transition-colors focus:outline-none p-1.5 rounded-full hover:bg-zinc-700/50"
                title="Copy prompt to clipboard"
              >
                <AnimatePresence mode="wait">
                  {copiedIndex === index ? (
                    <motion.div
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <MdOutlineDownloadDone className="h-5 w-5 text-emerald-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <IoIosCopy className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <div className="p-5">
              <p className="whitespace-pre-wrap text-zinc-300 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                {result.generatedPrompt}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-800/20 to-zinc-900/20 blur-xl rounded-xl transform scale-[0.96] opacity-50" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageTextResults;
