import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/footer/Footer";
import { ToggleProvider } from "./context/ToggleContext";

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
    title: "Vision Trace",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* iOS icon */}
        <link rel="apple-touch-icon" href="/splash/icon.png" />
        
        {/* iPhone splash screens */}
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Pro_portrait.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Pro_landscape.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Pro_Max_portrait.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Pro_Max_landscape.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_portrait.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_landscape.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_portrait.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_landscape.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_portrait.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_landscape.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_portrait.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_landscape.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_portrait.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_landscape.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_11_Pro_Max_iPhone_XS_Max_portrait.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_11_Pro_Max_iPhone_XS_Max_landscape.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_11_iPhone_XR_portrait.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_11_iPhone_XR_landscape.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_8_Plus_iPhone_7_Plus_iPhone_6s_Plus_iPhone_6_Plus_portrait.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_8_Plus_iPhone_7_Plus_iPhone_6s_Plus_iPhone_6_Plus_landscape.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_8_iPhone_7_iPhone_6s_iPhone_6_4.7_iPhone_SE_portrait.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/iPhone_8_iPhone_7_iPhone_6s_iPhone_6_4.7_iPhone_SE_landscape.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/4_iPhone_SE_iPod_touch_5th_generation_and_later_portrait.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/4_iPhone_SE_iPod_touch_5th_generation_and_later_landscape.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad splash screens */}
        <link rel="apple-touch-startup-image" href="/splash/13_iPad_Pro_M4_portrait.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/13_iPad_Pro_M4_landscape.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/12.9_iPad_Pro_portrait.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/12.9_iPad_Pro_landscape.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/11_iPad_Pro_M4_portrait.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/11_iPad_Pro_M4_landscape.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/11_iPad_Pro_10.5_iPad_Pro_portrait.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/11_iPad_Pro_10.5_iPad_Pro_landscape.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/10.9_iPad_Air_portrait.png" media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/10.9_iPad_Air_landscape.png" media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/10.5_iPad_Air_portrait.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/10.5_iPad_Air_landscape.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/10.2_iPad_portrait.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/10.2_iPad_landscape.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/9.7_iPad_Pro_7.9_iPad_mini_9.7_iPad_Air_9.7_iPad_portrait.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/9.7_iPad_Pro_7.9_iPad_mini_9.7_iPad_Air_9.7_iPad_landscape.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        <link rel="apple-touch-startup-image" href="/splash/8.3_iPad_Mini_portrait.png" media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/8.3_iPad_Mini_landscape.png" media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
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
          </main>
          <div>
            <Footer />
          </div>
        </body>
      </ToggleProvider>
    </html>
  );
}