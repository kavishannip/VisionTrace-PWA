import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/footer/Footer";
import { ToggleProvider } from "./context/ToggleContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VisionTrace",
  description: "Ai Text scan and Image to text generation",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VisionTrace",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* iOS icon */}
        <link rel="apple-touch-icon" href="/splash/icon.png" />
      </head>
      <ToggleProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="sticky top-0 z-50">
            <NavBar />
          </div>
          <main>
            {children}
            <Analytics />
          </main>
          <div>
            <Footer />
          </div>
          
        </body>
      </ToggleProvider>
    </html>
  );
}