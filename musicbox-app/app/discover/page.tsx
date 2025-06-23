import { HomeHeader } from "@/components/home-header"
import { DiscoverContent } from "@/components/discover-content"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Discover</h1>
            <p className="text-muted-foreground">
              Personalized music recommendations based on your taste and listening habits
            </p>
          </div>
          <DiscoverContent />
        </div>
      </main>
    </div>
  )
}
