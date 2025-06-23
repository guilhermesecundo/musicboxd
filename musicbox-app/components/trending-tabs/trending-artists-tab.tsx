import Link from "next/link"
import { Star, Users, ArrowUp, ArrowDown, Minus, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingArtists = [
  {
    id: 1,
    name: "Taylor Swift",
    artistId: "taylor-swift",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Pop/Folk",
    monthlyListeners: "89.2M",
    followers: "45.8M",
    trend: "+18%",
    trendDirection: "up",
    position: 1,
    lastPosition: 3,
    topTrack: "Anti-Hero",
    newReleases: 2,
  },
  {
    id: 2,
    name: "The Weeknd",
    artistId: "the-weeknd",
    image: "/placeholder.svg?height=100&width=100",
    genre: "R&B/Pop",
    monthlyListeners: "78.5M",
    followers: "32.1M",
    trend: "+15%",
    trendDirection: "up",
    position: 2,
    lastPosition: 4,
    topTrack: "Blinding Lights",
    newReleases: 1,
  },
  {
    id: 3,
    name: "Miley Cyrus",
    artistId: "miley-cyrus",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Pop/Rock",
    monthlyListeners: "67.3M",
    followers: "28.9M",
    trend: "+22%",
    trendDirection: "up",
    position: 3,
    lastPosition: 7,
    topTrack: "Flowers",
    newReleases: 3,
  },
  {
    id: 4,
    name: "Harry Styles",
    artistId: "harry-styles",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Pop/Rock",
    monthlyListeners: "65.1M",
    followers: "31.2M",
    trend: "+8%",
    trendDirection: "up",
    position: 4,
    lastPosition: 5,
    topTrack: "As It Was",
    newReleases: 0,
  },
  {
    id: 5,
    name: "Olivia Rodrigo",
    artistId: "olivia-rodrigo",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Pop/Alternative",
    monthlyListeners: "58.7M",
    followers: "24.6M",
    trend: "+12%",
    trendDirection: "up",
    position: 5,
    lastPosition: 6,
    topTrack: "Vampire",
    newReleases: 1,
  },
  {
    id: 6,
    name: "Dua Lipa",
    artistId: "dua-lipa",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Pop/Dance",
    monthlyListeners: "54.2M",
    followers: "27.8M",
    trend: "-5%",
    trendDirection: "down",
    position: 6,
    lastPosition: 2,
    topTrack: "Levitating",
    newReleases: 0,
  },
  {
    id: 7,
    name: "Bad Bunny",
    artistId: "bad-bunny",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Reggaeton/Latin",
    monthlyListeners: "52.9M",
    followers: "29.1M",
    trend: "0%",
    trendDirection: "same",
    position: 7,
    lastPosition: 7,
    topTrack: "Tití Me Preguntó",
    newReleases: 0,
  },
  {
    id: 8,
    name: "Billie Eilish",
    artistId: "billie-eilish",
    image: "/placeholder.svg?height=100&width=100",
    genre: "Alternative/Pop",
    monthlyListeners: "51.3M",
    followers: "26.4M",
    trend: "+6%",
    trendDirection: "up",
    position: 8,
    lastPosition: 9,
    topTrack: "What Was I Made For?",
    newReleases: 1,
  },
]

export function TrendingArtistsTab() {
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
          <Star className="h-5 w-5 text-yellow-500" />
          Top Artists This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingArtists.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              {/* Position */}
              <div className="flex items-center gap-2 w-16">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold">
                  {artist.position}
                </div>
                <div className="flex flex-col items-center">
                  {getTrendIcon(artist.trendDirection)}
                  <span className="text-xs text-muted-foreground">
                    {getPositionChange(artist.position, artist.lastPosition)}
                  </span>
                </div>
              </div>

              {/* Artist Image */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Artist Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/artist/${artist.artistId}`}
                  className="font-medium truncate hover:text-primary transition-colors"
                >
                  {artist.name}
                </Link>
                <p className="text-sm text-muted-foreground">{artist.genre}</p>
                <p className="text-xs text-muted-foreground">Top track: {artist.topTrack}</p>
                {artist.newReleases > 0 && (
                  <Badge variant="default" className="text-xs mt-1">
                    {artist.newReleases} new release{artist.newReleases > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {artist.monthlyListeners}
                </div>
                <div className="text-xs text-muted-foreground">{artist.followers} followers</div>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Badge
                    variant={
                      artist.trendDirection === "up"
                        ? "default"
                        : artist.trendDirection === "down"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {artist.trend}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                <Link href={`/artist/${artist.artistId}`}>
                  <Button variant="outline" size="sm">
                    View Artist
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
