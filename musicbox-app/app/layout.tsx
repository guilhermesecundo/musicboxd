import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/UserContext"  // IMPORTAÇÃO DO PROVIDER

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MusicBox - Track, Rate, and Share Your Music Journey",
  description:
    "MusicBox is your personal music diary. Create lists, rate albums, review artists, and connect with music lovers around the world.",
  generator: "v0.dev",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="musicbox-theme"
        >
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
