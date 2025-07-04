import Link from "next/link"
import Image from "next/image"
import { Music, Star, List, Heart, Users } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { AnimateInView } from "@/components/animate-in-view"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-blue-400 dark:text-blue-300" />
            <span className="text-xl font-bold">
              <AnimatedGradientText>MusicBox</AnimatedGradientText>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="relative z-50">
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <AnimatedButton variant="outline" size="sm" asChild>
                <Link href="/login">Log In</Link>
              </AnimatedButton>
              <AnimatedButton variant="gradient" size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimateInView className="flex flex-col justify-center space-y-4" delay={100}>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <AnimatedGradientText>Track, Rate, and Share Your Music Journey</AnimatedGradientText>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MusicBox is your personal music diary. Create lists, rate albums, review artists, and connect with
                    music lovers around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <AnimatedButton variant="gradient" size="lg" asChild>
                    <Link href="/signup">Get Started</Link>
                  </AnimatedButton>
                  {/* <AnimatedButton variant="outline" size="lg" asChild>
                    <Link href="#">Learn More</Link>
                  </AnimatedButton> */}
                </div>
              </AnimateInView>
              <AnimateInView className="flex items-center justify-center" direction="left" delay={300}>
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px] animate-float">
                  <Image
                    src="/landplaceholder.png?height=450&width=450"
                    alt="MusicBox App Screenshot"
                    fill
                    className="object-contain rounded-lg shadow-2xl border border-border transition-all duration-500 hover:shadow-blue-200/20 dark:hover:shadow-blue-900/20"
                  />
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <AnimatedGradientText>Features</AnimatedGradientText>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to document and share your musical journey
                </p>
              </div>
            </AnimateInView>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              <AnimateInView delay={100}>
                <AnimatedCard className="flex flex-col items-center space-y-2 h-full">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900 transition-transform duration-300 group-hover:scale-110">
                    <List className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold">Create Lists</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Organize your music into custom lists like "Summer Favorites" or "Road Trip Essentials"
                  </p>
                </AnimatedCard>
              </AnimateInView>
              <AnimateInView delay={200}>
                <AnimatedCard className="flex flex-col items-center space-y-2 h-full">
                  <div className="rounded-full bg-pink-100 p-3 dark:bg-pink-900 transition-transform duration-300 group-hover:scale-110">
                    <Star className="h-6 w-6 text-pink-500 dark:text-pink-300" />
                  </div>
                  <h3 className="text-xl font-bold">Rate & Review</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Score albums and tracks, write detailed reviews, and share your thoughts
                  </p>
                </AnimatedCard>
              </AnimateInView>
              <AnimateInView delay={300}>
                <AnimatedCard className="flex flex-col items-center space-y-2 h-full">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900 transition-transform duration-300 group-hover:scale-110">
                    <Heart className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold">Favorite Artists</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Keep track of your favorite artists and get notified about new releases
                  </p>
                </AnimatedCard>
              </AnimateInView>
              <AnimateInView delay={400}>
                <AnimatedCard className="flex flex-col items-center space-y-2 h-full">
                  <div className="rounded-full bg-pink-100 p-3 dark:bg-pink-900 transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-6 w-6 text-pink-500 dark:text-pink-300" />
                  </div>
                  <h3 className="text-xl font-bold">Connect</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Follow friends and discover new music through their recommendations
                  </p>
                </AnimatedCard>
              </AnimateInView>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <AnimatedGradientText>How It Works</AnimatedGradientText>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your musical journey in three simple steps
                </p>
              </div>
            </AnimateInView>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <AnimateInView delay={100}>
                <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white animate-gradient">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p className="text-center text-muted-foreground">
                    Sign up for free and set up your profile with your music preferences
                  </p>
                </div>
              </AnimateInView>
              <AnimateInView delay={200}>
                <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white animate-gradient">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold">Start Tracking</h3>
                  <p className="text-center text-muted-foreground">
                    Search for music, mark albums as listened, and start building your collection
                  </p>
                </div>
              </AnimateInView>
              <AnimateInView delay={300}>
                <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white animate-gradient">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold">Connect & Share</h3>
                  <p className="text-center text-muted-foreground">
                    Follow friends, share your lists, and discover new music through the community
                  </p>
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <AnimatedGradientText>What Our Users Say</AnimatedGradientText>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of music enthusiasts who love MusicBox
                </p>
              </div>
            </AnimateInView>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <AnimateInView delay={100}>
                <AnimatedCard className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      "MusicBox has completely changed how I discover and enjoy music. The community recommendations are
                      spot on!"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="rounded-full bg-muted p-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 animate-gradient" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Johnson</p>
                      <p className="text-xs text-muted-foreground">Music Producer</p>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimateInView>
              <AnimateInView delay={200}>
                <AnimatedCard className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      "I love being able to track all the albums I've listened to and share my thoughts with friends.
                      It's like a musical diary!"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="rounded-full bg-muted p-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 animate-gradient" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Samantha Lee</p>
                      <p className="text-xs text-muted-foreground">Music Blogger</p>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimateInView>
              <AnimateInView delay={300}>
                <AnimatedCard className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      "The curated lists and recommendations have introduced me to so many artists I would have never
                      discovered otherwise."
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="rounded-full bg-muted p-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 animate-gradient" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Marcus Chen</p>
                      <p className="text-xs text-muted-foreground">Music Enthusiast</p>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimateInView>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-pink-500 animate-gradient">
          <div className="container px-4 md:px-6">
            <AnimateInView className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Your Music Journey?</h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join MusicBox today and become part of a community that celebrates music in all its forms.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <AnimatedButton size="lg" className="bg-white text-blue-500 hover:bg-blue-50" asChild>
                  <Link href="/signup">Sign Up for Free</Link>
                </AnimatedButton>
                {/* <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="border-white bg-white/20 text-white hover:bg-white/10 hover:text-pink-200"
                  asChild
                >
                  <Link href="#">Learn More</Link>
                </AnimatedButton> */}
              </div>
            </AnimateInView>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-blue-400 dark:text-blue-300" />
            <p className="text-sm font-medium">
              <AnimatedGradientText>MusicBox</AnimatedGradientText>
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MusicBox. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
