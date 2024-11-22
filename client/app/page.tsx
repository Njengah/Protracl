// "use client";

import React from 'react'; // Not Necessary but Fix : 'React' refers to a UMD global, but the current file is a module. 

import Image from 'next/image'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Poppins } from "next/font/google";
import { MoveRight} from 'lucide-react';
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})


export default async function Home() {
  return (

    <main className="min-h-screen flex flex-col 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#428188] to-[#ecf3ef]">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-3xl font-semibold">Welcome to Protracl</div>
        </div>
        <Footer />

    </main>
  );
}

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-grow flex justify-center items-center">
//         <div className="text-3xl font-semibold">Welcome to Protracl</div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
