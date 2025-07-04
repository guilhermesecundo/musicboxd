"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Album {
  id: string
  artist: string
  artistId: string
}

interface AlbumRecommendationsProps {
  album: Album
}

const mockRecommendations = [
  {
    id: "folklore",
    title: "folklore",
    artist: "Taylor Swift",
    artistId: "taylor-swift",
    cover: "/prop/folklore.jpg",
    reason: "Same artist",
  },
  {
    id: "red-taylors-version",
    title: "Red (Taylor's Version)",
    artist: "Taylor Swift",
    artistId: "taylor-swift",
    cover: "/prop/red.png",
    reason: "Same artist",
  },
  {
    id: "sour",
    title: "SOUR",
    artist: "Olivia Rodrigo",
    artistId: "olivia-rodrigo",
    cover: "/prop/olivia.jpg",
    reason: "Similar style",
  },
]

export function AlbumRecommendations({ album }: AlbumRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRecommendations.map((rec) => (
          <Link key={rec.id} href={`/album/${rec.id}`}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <img src={rec.cover || "/placeholder.svg"} alt={rec.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{rec.title}</p>
                <Link
                  href={`/artist/${rec.artistId}`}
                  className="text-xs text-muted-foreground truncate hover:text-primary transition-colors block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {rec.artist}
                </Link>
                <p className="text-xs text-muted-foreground">{rec.reason}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
