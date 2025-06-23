"use client"

import Link from "next/link"
import { TrendingUp, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"

const hotTracks = [
  {
    id: 1,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    plays: "2.1M",
    trend: "+15%",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artistId: "miley-cyrus",
  },
  {
    id: 2,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    plays: "1.8M",
    trend: "+12%",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artistId: "taylor-swift",
  },
  {
    id: 3,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    plays: "1.5M",
    trend: "+8%",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artistId: "sam-smith",
  },
  {
    id: 4,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    plays: "1.3M",
    trend: "+5%",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artistId: "harry-styles",
  },
  {
    id: 5,
    title: "Bad Habit",
    artist: "Steve Lacy",
    album: "Gemini Rights",
    plays: "1.1M",
    trend: "+3%",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artistId: "steve-lacy",
  },
]

export function HotMusic() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          Hot Right Now
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {hotTracks.map((track, index) => (
          <div key={track.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs font-bold">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <MusicPlayer music={track}>
                <div className="cursor-pointer hover:text-primary transition-colors">
                  <div className="font-medium text-sm truncate">{track.title}</div>
                  <Link
                    href={`/artist/${track.artistId}`}
                    className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {track.artist}
                  </Link>
                </div>
              </MusicPlayer>
            </div>

            <div className="text-right">
              <div className="text-xs font-medium">{track.plays}</div>
              <div className="text-xs text-green-500">{track.trend}</div>
            </div>

            <MusicPlayer music={track}>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4" />
              </Button>
            </MusicPlayer>
          </div>
        ))}
        <div className="pt-4 border-t">
          <Link href="/trending?tab=music">
            <Button variant="outline" className="w-full">
              Show More Trending Music
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
