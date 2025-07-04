// components/search-results.tsx
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchAllTab } from "@/components/search-tabs/search-all-tab"
import { SearchMusicTab } from "@/components/search-tabs/search-music-tab"
import { SearchArtistsTab } from "@/components/search-tabs/search-artists-tab"
import { SearchAlbumsTab } from "@/components/search-tabs/search-albums-tab"
import { SearchUsersTab } from "@/components/search-tabs/search-users-tab"

interface SearchResultsProps {
  query: string
  isLoading: boolean
  results: {
    music: any[]
    artists: any[]
    albums: any[]
    users: any[]
  } | null
}

export function SearchResults({ query, isLoading, results }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState("all")

  if (isLoading || !results) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  const totalResults =
    results.music.length +
    results.artists.length +
    results.albums.length +
    results.users.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>About {totalResults.toLocaleString()} results</span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="all" className="mt-6">
          <SearchAllTab results={results} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
