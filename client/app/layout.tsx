
import React from 'react'; // Not Necessary but Fix : 'React' refers to a UMD global, but the current file is a module. 

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Protrask ~ Task Management',
  description: 'Project Task Tracking Tool',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  )
}
