"use client";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <p className="text-sm mb-4 text-center">
          <span className="text-zinc-400 font-normal">
          © Designed and developed by
          </span>
          <br />
          <span className="text-zinc-300 font-bold">Kavishan Nipun</span>
        </p>
        <div className="flex space-x-5">
          <a
            href="https://github.com/kavishannip"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-zinc-200 transition-colors"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/kavishan-nipun-876930222/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-zinc-200 transition-colors"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
