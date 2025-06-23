import Link from "next/link"
import { TrendingUp, Play, Heart, Plus, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const trendingMusic = [
  {
    id: 1,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artistId: "miley-cyrus",
    plays: "2.1M",
    trend: "+15%",
    trendDirection: "up",
    position: 1,
    lastPosition: 3,
    duration: "3:20",
    likes: "892K",
  },
  {
    id: 2,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artistId: "taylor-swift",
    plays: "1.8M",
    trend: "+12%",
    trendDirection: "up",
    position: 2,
    lastPosition: 4,
    duration: "3:20",
    likes: "756K",
  },
  {
    id: 3,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artistId: "sam-smith",
    plays: "1.5M",
    trend: "+8%",
    trendDirection: "up",
    position: 3,
    lastPosition: 2,
    duration: "2:36",
    likes: "634K",
  },
  {
    id: 4,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artistId: "harry-styles",
    plays: "1.3M",
    trend: "+5%",
    trendDirection: "up",
    position: 4,
    lastPosition: 5,
    duration: "2:47",
    likes: "523K",
  },
  {
    id: 5,
    title: "Bad Habit",
    artist: "Steve Lacy",
    album: "Gemini Rights",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artistId: "steve-lacy",
    plays: "1.1M",
    trend: "+3%",
    trendDirection: "up",
    position: 5,
    lastPosition: 6,
    duration: "3:51",
    likes: "445K",
  },
  {
    id: 6,
    title: "About Damn Time",
    artist: "Lizzo",
    album: "Special",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artistId: "lizzo",
    plays: "980K",
    trend: "-2%",
    trendDirection: "down",
    position: 6,
    lastPosition: 1,
    duration: "3:12",
    likes: "398K",
  },
  {
    id: 7,
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artistId: "glass-animals",
    plays: "890K",
    trend: "0%",
    trendDirection: "same",
    position: 7,
    lastPosition: 7,
    duration: "3:58",
    likes: "367K",
  },
  {
    id: 8,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artistId: "the-kid-laroi",
    plays: "820K",
    trend: "+7%",
    trendDirection: "up",
    position: 8,
    lastPosition: 10,
    duration: "2:21",
    likes: "334K",
  },
]

export function TrendingMusicTab() {
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-500" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getPositionChange = (current: number, last: number) => {
    const change = last - current
    if (change > 0) return `+${change}`
    if (change < 0) return change.toString()
    return "—"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          Top Music This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingMusic.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              {/* Position */}
              <div className="flex items-center gap-2 w-16">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-bold">
                  {track.position}
                </div>
                <div className="flex flex-col items-center">
                  {getTrendIcon(track.trendDirection)}
                  <span className="text-xs text-muted-foreground">
                    {getPositionChange(track.position, track.lastPosition)}
                  </span>
                </div>
              </div>

              {/* Album Cover */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={track.cover || "/placeholder.svg"} alt={track.title} className="w-full h-full object-cover" />
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <MusicPlayer music={track}>
                  <h3 className="font-medium truncate cursor-pointer hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                </MusicPlayer>
                <Link
                  href={`/artist/${track.artistId}`}
                  className="text-sm text-muted-foreground truncate hover:text-primary transition-colors"
                >
                  {track.artist}
                </Link>
                <p className="text-xs text-muted-foreground">{track.album}</p>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-sm font-medium">{track.plays}</div>
                <div className="text-xs text-muted-foreground">{track.duration}</div>
                <div className="flex items-center gap-1 justify-end">
                  <Badge
                    variant={
                      track.trendDirection === "up"
                        ? "default"
                        : track.trendDirection === "down"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {track.trend}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <MusicPlayer music={track}>
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
      </CardContent>
    </Card>
  )
}
