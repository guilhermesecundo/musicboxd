"use client"

import Link from "next/link"

import { Sparkles, Play, Heart, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"
import { AddToListButton } from "@/components/add-to-list-button"

const personalizedRecommendations = [
  {
    id: 1,
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artistId: "olivia-rodrigo",
    reason: "Based on your love for Taylor Swift",
    matchPercentage: 95,
    duration: "3:39",
    rating: 4.8,
    genre: "Pop",
    albumId: "guts",
  },
  {
    id: 2,
    title: "Paint The Town Red",
    artist: "Doja Cat",
    album: "Scarlet",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artistId: "doja-cat",
    reason: "Trending in your area",
    matchPercentage: 88,
    duration: "3:50",
    rating: 4.6,
    genre: "Hip-Hop",
    albumId: "scarlet",
  },
  {
    id: 3,
    title: "Greedy",
    artist: "Tate McRae",
    album: "Think Later",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artistId: "tate-mcrae",
    reason: "Similar to your recent likes",
    matchPercentage: 92,
    duration: "2:11",
    rating: 4.7,
    genre: "Pop",
    albumId: "think-later",
  },
  {
    id: 4,
    title: "Water",
    artist: "Tyla",
    album: "Tyla",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artistId: "tyla",
    reason: "Popular with friends",
    matchPercentage: 85,
    duration: "3:20",
    rating: 4.5,
    genre: "Afrobeats",
    albumId: "tyla",
  },
  {
    id: 5,
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artistId: "taylor-swift",
    reason: "From your favorite artist",
    matchPercentage: 98,
    duration: "2:58",
    rating: 4.9,
    genre: "Pop",
    albumId: "lover",
  },
  {
    id: 6,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artistId: "olivia-rodrigo",
    reason: "You rated SOUR highly",
    matchPercentage: 94,
    duration: "2:58",
    rating: 4.8,
    genre: "Pop Rock",
    albumId: "sour",
  },
  {
    id: 7,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artistId: "miley-cyrus",
    reason: "Currently trending",
    matchPercentage: 87,
    duration: "3:20",
    rating: 4.6,
    genre: "Pop",
    albumId: "endless-summer-vacation",
  },
  {
    id: 8,
    title: "Snooze",
    artist: "SZA",
    album: "SOS",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artistId: "sza",
    reason: "Matches your R&B preferences",
    matchPercentage: 91,
    duration: "3:22",
    rating: 4.7,
    genre: "R&B",
    albumId: "sos",
  },
]

const getMatchColor = (percentage: number) => {
  if (percentage >= 95) return "bg-green-500"
  if (percentage >= 90) return "bg-blue-500"
  if (percentage >= 85) return "bg-yellow-500"
  return "bg-gray-500"
}

export function ForYouTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Personalized for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {personalizedRecommendations.map((track) => (
              <div key={track.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group">
                {/* Album Cover */}
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                  <img
                    src={track.cover || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <MusicPlayer music={track}>
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-black"
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </MusicPlayer>
                  </div>
                </div>

                {/* Track Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs text-white ${getMatchColor(track.matchPercentage)}`}>
                      {track.matchPercentage}% match
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {track.genre}
                    </Badge>
                  </div>

                  <MusicPlayer music={track}>
                    <h3 className="font-medium truncate cursor-pointer hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                  </MusicPlayer>

                  <Link
                    href={`/artist/${track.artistId}`}
                    className="text-sm text-muted-foreground truncate hover:text-primary transition-colors block"
                  >
                    {track.artist}
                  </Link>

                  <p
                    className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/album/${track.albumId}`
                    }}
                  >
                    {track.album}
                  </p>

                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{track.rating}</span>
                    <span className="text-xs text-muted-foreground">• {track.duration}</span>
                  </div>

                  <p className="text-xs text-muted-foreground italic">{track.reason}</p>

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <AddToListButton
                      music={track}
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onAddToList={(listId) => console.log(`Added ${track.title} to list ${listId}`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
