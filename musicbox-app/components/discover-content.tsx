"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForYouTab } from "@/components/discover-tabs/for-you-tab"
import { NewReleasesTab } from "@/components/discover-tabs/new-releases-tab"
import { GenresTab } from "@/components/discover-tabs/genres-tab"
import { SimilarArtistsTab } from "@/components/discover-tabs/similar-artists-tab"

export function DiscoverContent() {
  return (
    <Tabs defaultValue="for-you" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="for-you">For You</TabsTrigger>
        <TabsTrigger value="new-releases">New Releases</TabsTrigger>
        <TabsTrigger value="genres">Genres</TabsTrigger>
        <TabsTrigger value="similar-artists">Similar Artists</TabsTrigger>
      </TabsList>

      <TabsContent value="for-you" className="mt-6">
        <ForYouTab />
      </TabsContent>

      <TabsContent value="new-releases" className="mt-6">
        <NewReleasesTab />
      </TabsContent>

      <TabsContent value="genres" className="mt-6">
        <GenresTab />
      </TabsContent>

      <TabsContent value="similar-artists" className="mt-6">
        <SimilarArtistsTab />
      </TabsContent>
    </Tabs>
  )
}
