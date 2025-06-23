"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Music, Star, List, Users } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-blue-400 dark:text-blue-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent dark:from-blue-300 dark:to-pink-300">
              MusicBox
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <SheetClose asChild>
            <Link
              href="#features"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Star className="h-5 w-5 text-pink-400 dark:text-pink-300" />
              Features
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#how-it-works"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <List className="h-5 w-5 text-blue-400 dark:text-blue-300" />
              How It Works
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#testimonials"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Users className="h-5 w-5 text-pink-400 dark:text-pink-300" />
              Testimonials
            </Link>
          </SheetClose>
        </nav>
        <div className="mt-auto border-t pt-4 flex flex-col gap-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="#" onClick={() => setOpen(false)}>
              Log In
            </Link>
          </Button>
          <Button
            className="w-full justify-start bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            asChild
          >
            <Link href="#" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
