"use client"

import Link from "next/link"
import { Search, User, Music, Home, TrendingUp, Users, Compass, Settings } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { useUser } from "@/context/UserContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

export function HomeHeader() {
  const { username } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-blue-400 dark:text-blue-300" />
            <span className="text-xl font-bold">
              <AnimatedGradientText>MusicBox</AnimatedGradientText>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/home"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/discover"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Compass className="h-4 w-4" />
              Discover
            </Link>
            <Link
              href="/trending"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Link>
            <Link
              href="/community"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              Community
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search music, artists, albums..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <NotificationsDropdown />

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
              <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/profile/johndoe")}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => (window.location.href = "/")}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
