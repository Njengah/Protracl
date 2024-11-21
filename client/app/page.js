"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex justify-center items-center">
        <div className="text-3xl font-semibold">Welcome to Protracl</div>
      </div>

      <Footer />
    </div>
  );
}
