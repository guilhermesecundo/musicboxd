import Link from "next/link"
import { Music, Play, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const genreCategories = [
  {
    id: 1,
    name: "Pop",
    description: "Catchy melodies and mainstream appeal",
    color: "from-pink-400 to-purple-500",
    tracks: 1247,
    trending: "+12%",
    featuredTracks: [
      {
        title: "Anti-Hero",
        artist: "Taylor Swift",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        artistId: "taylor-swift",
      },
      {
        title: "Flowers",
        artist: "Miley Cyrus",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        artistId: "miley-cyrus",
      },
    ],
  },
  {
    id: 2,
    name: "Hip-Hop",
    description: "Rhythmic beats and powerful lyrics",
    color: "from-orange-400 to-red-500",
    tracks: 892,
    trending: "+8%",
    featuredTracks: [
      {
        title: "Paint The Town Red",
        artist: "Doja Cat",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        artistId: "doja-cat",
      },
      {
        title: "Rich Flex",
        artist: "Drake & 21 Savage",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        artistId: "drake",
      },
    ],
  },
  {
    id: 3,
    name: "R&B",
    description: "Smooth vocals and soulful rhythms",
    color: "from-blue-400 to-indigo-500",
    tracks: 634,
    trending: "+15%",
    featuredTracks: [
      {
        title: "Snooze",
        artist: "SZA",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        artistId: "sza",
      },
      {
        title: "Creepin'",
        artist: "Metro Boomin, The Weeknd, 21 Savage",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        artistId: "the-weeknd",
      },
    ],
  },
  {
    id: 4,
    name: "Rock",
    description: "Guitar-driven energy and powerful vocals",
    color: "from-gray-400 to-gray-600",
    tracks: 567,
    trending: "+5%",
    featuredTracks: [
      {
        title: "Enemy",
        artist: "Imagine Dragons",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        artistId: "imagine-dragons",
      },
      {
        title: "Heat Waves",
        artist: "Glass Animals",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        artistId: "glass-animals",
      },
    ],
  },
  {
    id: 5,
    name: "Electronic",
    description: "Digital beats and synthesized sounds",
    color: "from-cyan-400 to-blue-500",
    tracks: 423,
    trending: "+18%",
    featuredTracks: [
      {
        title: "Midnight City",
        artist: "M83",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        artistId: "m83",
      },
      {
        title: "Strobe",
        artist: "Deadmau5",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        artistId: "deadmau5",
      },
    ],
  },
  {
    id: 6,
    name: "Indie",
    description: "Independent and alternative sounds",
    color: "from-green-400 to-emerald-500",
    tracks: 789,
    trending: "+10%",
    featuredTracks: [
      {
        title: "Somebody Else",
        artist: "The 1975",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        artistId: "the-1975",
      },
      {
        title: "Electric Feel",
        artist: "MGMT",
        cover: "/placeholder.svg?height=60&width=60",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        artistId: "mgmt",
      },
    ],
  },
]

export function GenresTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-blue-500" />
            Explore by Genre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreCategories.map((genre) => (
              <Card key={genre.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-24 bg-gradient-to-r ${genre.color} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="text-xl font-bold">{genre.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{genre.tracks} tracks</span>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {genre.trending}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">{genre.description}</p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Featured Tracks</h4>
                    {genre.featuredTracks.map((track, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <MusicPlayer
                            music={{
                              title: track.title,
                              artist: track.artist,
                              album: track.title,
                              cover: track.cover,
                              preview: track.preview,
                              artistId: track.artistId,
                            }}
                          >
                            <p className="font-medium text-sm truncate cursor-pointer hover:text-primary transition-colors">
                              {track.title}
                            </p>
                          </MusicPlayer>
                          <Link
                            href={`/artist/${track.artistId}`}
                            className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
                          >
                            {track.artist}
                          </Link>
                        </div>
                        <MusicPlayer
                          music={{
                            title: track.title,
                            artist: track.artist,
                            album: track.title,
                            cover: track.cover,
                            preview: track.preview,
                            artistId: track.artistId,
                          }}
                        >
                          <Button variant="ghost" size="sm">
                            <Play className="h-3 w-3" />
                          </Button>
                        </MusicPlayer>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Explore {genre.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
