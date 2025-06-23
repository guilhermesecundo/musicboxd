"use client"

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingMusicTab } from "@/components/trending-tabs/trending-music-tab"
import { TrendingArtistsTab } from "@/components/trending-tabs/trending-artists-tab"
import { TrendingCommentsTab } from "@/components/trending-tabs/trending-comments-tab"

export function TrendingTabs() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "music"

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="music">Top Music</TabsTrigger>
        <TabsTrigger value="artists">Top Artists</TabsTrigger>
        <TabsTrigger value="comments">Top Comments</TabsTrigger>
      </TabsList>

      <TabsContent value="music" className="mt-6">
        <TrendingMusicTab />
      </TabsContent>

      <TabsContent value="artists" className="mt-6">
        <TrendingArtistsTab />
      </TabsContent>

      <TabsContent value="comments" className="mt-6">
        <TrendingCommentsTab />
      </TabsContent>
    </Tabs>
  )
}
