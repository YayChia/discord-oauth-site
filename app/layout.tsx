import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import AuthProvider from './components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

