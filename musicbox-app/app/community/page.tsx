import { HomeHeader } from "@/components/home-header"
import { CommunityTabs } from "@/components/community-tabs"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Community</h1>
            <p className="text-muted-foreground">
              Discover what your friends and the music community are listening to and sharing
            </p>
          </div>
          <CommunityTabs />
        </div>
      </main>
    </div>
  )
}
