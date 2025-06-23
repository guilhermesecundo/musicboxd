import { TrendingUp, Play, Heart, Plus, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicPlayer } from "@/components/music-player"
import Image from "next/image"

interface Artist {
  id: string
  name: string
}

interface TopTracksTabProps {
  artist: Artist
}

const topLiked = [
  {
    id: 1,
    title: "Anti-Hero",
    album: "Midnights",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:20",
    likes: "2.1M",
    plays: "892.1M",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Shake It Off",
    album: "1989",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "3:39",
    likes: "1.8M",
    plays: "1.2B",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Blank Space",
    album: "1989",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:51",
    likes: "1.6M",
    plays: "1.1B",
    rating: 4.6,
  },
  {
    id: 4,
    title: "Love Story",
    album: "Fearless",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "3:55",
    likes: "1.4M",
    plays: "987.3M",
    rating: 4.9,
  },
  {
    id: 5,
    title: "You Belong With Me",
    album: "Fearless",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "3:51",
    likes: "1.3M",
    plays: "876.2M",
    rating: 4.5,
  },
]

const topFavorited = [
  {
    id: 1,
    title: "All Too Well (10 Minute Version)",
    album: "Red (Taylor's Version)",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "10:13",
    favorites: "892K",
    plays: "456.7M",
    rating: 4.9,
  },
  {
    id: 2,
    title: "cardigan",
    album: "folklore",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "3:59",
    favorites: "743K",
    plays: "623.1M",
    rating: 4.8,
  },
  {
    id: 3,
    title: "willow",
    album: "evermore",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: "3:34",
    favorites: "687K",
    plays: "534.2M",
    rating: 4.7,
  },
  {
    id: 4,
    title: "august",
    album: "folklore",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: "4:21",
    favorites: "612K",
    plays: "445.8M",
    rating: 4.8,
  },
  {
    id: 5,
    title: "champagne problems",
    album: "evermore",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "4:04",
    favorites: "589K",
    plays: "398.5M",
    rating: 4.6,
  },
]

export function TopTracksTab({ artist }: TopTracksTabProps) {
  const renderTrackList = (tracks: any[], metricLabel: string, metricKey: string) => (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <div key={track.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          {/* Rank */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm font-bold">
            {index + 1}
          </div>

          {/* Album Cover */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image src={track.cover || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <MusicPlayer
              music={{
                title: track.title,
                artist: artist.name,
                album: track.album,
                cover: track.cover,
                preview: track.preview,
              }}
            >
              <h3 className="font-medium truncate cursor-pointer hover:text-primary transition-colors">
                {track.title}
              </h3>
            </MusicPlayer>
            <p className="text-sm text-muted-foreground truncate">{track.album}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.floor(track.rating) }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{track.rating}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="text-sm font-medium">{track[metricKey]}</div>
            <div className="text-xs text-muted-foreground">{metricLabel}</div>
            <div className="text-xs text-muted-foreground">{track.plays} plays</div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <MusicPlayer
              music={{
                title: track.title,
                artist: artist.name,
                album: track.album,
                cover: track.cover,
                preview: track.preview,
              }}
            >
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4" />
              </Button>
            </MusicPlayer>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          Top Tracks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="liked" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="liked">Most Liked</TabsTrigger>
            <TabsTrigger value="favorited">Most Favorited</TabsTrigger>
          </TabsList>

          <TabsContent value="liked" className="mt-6">
            {renderTrackList(topLiked, "likes", "likes")}
          </TabsContent>

          <TabsContent value="favorited" className="mt-6">
            {renderTrackList(topFavorited, "favorites", "favorites")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
