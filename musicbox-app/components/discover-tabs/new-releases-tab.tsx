"use client"

import Link from "next/link"
import { Calendar, Play, Heart, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"
import { AddToListButton } from "@/components/add-to-list-button"

const newReleases = [
  {
    id: 1,
    title: "Lavender Haze",
    artist: "Taylor Swift",
    album: "Midnights (3am Edition)",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artistId: "taylor-swift",
    releaseDate: "2024-01-15",
    type: "Single",
    duration: "3:22",
    isNew: true,
    albumId: "midnights",
  },
  {
    id: 2,
    title: "Fortnight",
    artist: "Taylor Swift ft. Post Malone",
    album: "The Tortured Poets Department",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artistId: "taylor-swift",
    releaseDate: "2024-01-12",
    type: "Album Track",
    duration: "3:48",
    isNew: true,
    albumId: "ttpd",
  },
  {
    id: 3,
    title: "Houdini",
    artist: "Dua Lipa",
    album: "Radical Optimism",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artistId: "dua-lipa",
    releaseDate: "2024-01-10",
    type: "Lead Single",
    duration: "3:06",
    isNew: true,
    albumId: "radical-optimism",
  },
  {
    id: 4,
    title: "Texas Hold 'Em",
    artist: "Beyoncé",
    album: "Cowboy Carter",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artistId: "beyonce",
    releaseDate: "2024-01-08",
    type: "Country Single",
    duration: "3:54",
    isNew: true,
    albumId: "cowboy-carter",
  },
  {
    id: 5,
    title: "Espresso",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artistId: "sabrina-carpenter",
    releaseDate: "2024-01-05",
    type: "Single",
    duration: "2:55",
    isNew: false,
    albumId: "short-n-sweet",
  },
  {
    id: 6,
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artistId: "sabrina-carpenter",
    releaseDate: "2024-01-03",
    type: "Single",
    duration: "3:06",
    isNew: false,
    albumId: "short-n-sweet",
  },
  {
    id: 7,
    title: "Good Luck, Babe!",
    artist: "Chappell Roan",
    album: "The Rise and Fall of a Midwest Princess",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artistId: "chappell-roan",
    releaseDate: "2024-01-01",
    type: "Single",
    duration: "3:38",
    isNew: false,
    albumId: "the-rise-and-fall",
  },
  {
    id: 8,
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    album: "Hit Me Hard and Soft",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artistId: "billie-eilish",
    releaseDate: "2023-12-28",
    type: "Album Track",
    duration: "3:30",
    isNew: false,
    albumId: "hit-me-hard-and-soft",
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Yesterday"
  if (diffDays <= 7) return `${diffDays} days ago`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function NewReleasesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Fresh Releases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                {/* Album Cover */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={release.cover || "/placeholder.svg"}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MusicPlayer music={release}>
                      <h3 className="font-medium truncate cursor-pointer hover:text-primary transition-colors">
                        {release.title}
                      </h3>
                    </MusicPlayer>
                    {release.isNew && (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <Link
                    href={`/artist/${release.artistId}`}
                    className="text-sm text-muted-foreground truncate hover:text-primary transition-colors block"
                  >
                    {release.artist}
                  </Link>
                  <p
                    className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/album/${release.albumId}`
                    }}
                  >
                    {release.album}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(release.releaseDate)}
                    </div>
                    <span>•</span>
                    <span>{release.type}</span>
                    <span>•</span>
                    <span>{release.duration}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <MusicPlayer music={release}>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </MusicPlayer>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <AddToListButton
                    music={release}
                    variant="ghost"
                    size="sm"
                    onAddToList={(listId) => console.log(`Added ${release.title} to list ${listId}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
