import { ActivityFeed } from "@/components/activity-feed"
import { HotMusic } from "@/components/hot-music"
import { MusicRecommendations } from "@/components/music-recommendations"
import { CommunityFeed } from "@/components/community-feed"
import { HomeHeader } from "@/components/home-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityFeed />
            <CommunityFeed />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <HotMusic />
            <MusicRecommendations />
          </div>
        </div>
      </main>
    </div>
  )
}
