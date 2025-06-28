import { HomeHeader } from "@/components/home-header"
import { Suspense } from "react"
import { TrendingTabs } from "@/components/trending-tabs"

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background">
    <Suspense fallback={<div>Loading trends...</div>}>
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Trending</h1>
            <p className="text-muted-foreground">
              Discover what's hot in music right now - trending tracks, artists, and conversations
            </p>
          </div>
          <TrendingTabs />
        </div>
      </main>
    </Suspense>
    </div>
  )
}
