"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"
import { AddToListButton } from "@/components/add-to-list-button"

const recommendations = [
  {
    id: 1,
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    reason: "Based on your love for Taylor Swift",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artistId: "olivia-rodrigo",
  },
  {
    id: 2,
    title: "Paint The Town Red",
    artist: "Doja Cat",
    album: "Scarlet",
    reason: "Trending in your area",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    artistId: "doja-cat",
  },
  {
    id: 3,
    title: "Greedy",
    artist: "Tate McRae",
    album: "Think Later",
    reason: "Similar to your recent likes",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    artistId: "tate-mcrae",
  },
  {
    id: 4,
    title: "Water",
    artist: "Tyla",
    album: "Tyla",
    reason: "Popular with friends",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    artistId: "tyla",
  },
]

export function MusicRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <MusicPlayer music={rec}>
                  <div className="cursor-pointer hover:text-primary transition-colors">
                    <div className="font-medium text-sm truncate">{rec.title}</div>
                    <Link
                      href={`/artist/${rec.artistId}`}
                      className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {rec.artist}
                    </Link>
                  </div>
                </MusicPlayer>
              </div>
              <AddToListButton
                music={rec}
                variant="ghost"
                size="sm"
                onAddToList={(listId) => console.log(`Added ${rec.title} to list ${listId}`)}
              />
            </div>
            <div className="text-xs text-muted-foreground">{rec.reason}</div>
          </div>
        ))}
        <div className="pt-4 border-t">
          <Link href="/discover">
            <Button variant="outline" className="w-full">
              Discover More Music
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
