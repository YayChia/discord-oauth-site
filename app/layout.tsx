import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

