"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentReleasesTab } from "@/components/artist-tabs/recent-releases-tab"
import { TopTracksTab } from "@/components/artist-tabs/top-tracks-tab"
import { DiscographyTab } from "@/components/artist-tabs/discography-tab"

interface Artist {
  id: string
  name: string
  bio: string
  image: string
  backgroundImage: string
  genres: string[]
  monthlyListeners: string
  followers: string
  verified: boolean
  formed: string
  location: string
  website: string
  socialMedia: {
    instagram: string
    twitter: string
    spotify: string
  }
}

interface ArtistTabsProps {
  artist: Artist
}

export function ArtistTabs({ artist }: ArtistTabsProps) {
  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recent">Recent Releases</TabsTrigger>
        <TabsTrigger value="top">Top Tracks</TabsTrigger>
        <TabsTrigger value="discography">Discography</TabsTrigger>
      </TabsList>

      <TabsContent value="recent" className="mt-6">
        <RecentReleasesTab artist={artist} />
      </TabsContent>

      <TabsContent value="top" className="mt-6">
        <TopTracksTab artist={artist} />
      </TabsContent>

      <TabsContent value="discography" className="mt-6">
        <DiscographyTab artist={artist} />
      </TabsContent>
    </Tabs>
  )
}
