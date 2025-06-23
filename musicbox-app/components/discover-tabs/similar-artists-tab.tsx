import Link from "next/link"
import { Users, Play, Heart, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const similarArtists = [
  {
    id: 1,
    name: "Olivia Rodrigo",
    artistId: "olivia-rodrigo",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Pop/Alternative",
    similarity: 95,
    reason: "Similar to Taylor Swift",
    monthlyListeners: "58.7M",
    topTrack: {
      title: "Vampire",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    commonGenres: ["Pop", "Alternative", "Singer-Songwriter"],
  },
  {
    id: 2,
    name: "Gracie Abrams",
    artistId: "gracie-abrams",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Indie Pop",
    similarity: 92,
    reason: "Similar to Taylor Swift",
    monthlyListeners: "12.3M",
    topTrack: {
      title: "I miss you, I'm sorry",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    commonGenres: ["Indie Pop", "Singer-Songwriter", "Alternative"],
  },
  {
    id: 3,
    name: "Phoebe Bridgers",
    artistId: "phoebe-bridgers",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Indie Folk",
    similarity: 88,
    reason: "Similar to Taylor Swift",
    monthlyListeners: "8.9M",
    topTrack: {
      title: "Motion Sickness",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    commonGenres: ["Indie Folk", "Alternative", "Singer-Songwriter"],
  },
  {
    id: 4,
    name: "Lorde",
    artistId: "lorde",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Alternative Pop",
    similarity: 90,
    reason: "Similar to Billie Eilish",
    monthlyListeners: "24.1M",
    topTrack: {
      title: "Solar Power",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    commonGenres: ["Alternative Pop", "Electropop", "Art Pop"],
  },
  {
    id: 5,
    name: "Clairo",
    artistId: "clairo",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Bedroom Pop",
    similarity: 85,
    reason: "Similar to your indie preferences",
    monthlyListeners: "15.6M",
    topTrack: {
      title: "Pretty Girl",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    commonGenres: ["Bedroom Pop", "Indie Pop", "Lo-fi"],
  },
  {
    id: 6,
    name: "Conan Gray",
    artistId: "conan-gray",
    image: "/placeholder.svg?height=150&width=150",
    genre: "Pop",
    similarity: 87,
    reason: "Similar to Olivia Rodrigo",
    monthlyListeners: "19.2M",
    topTrack: {
      title: "Heather",
      cover: "/placeholder.svg?height=60&width=60",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
    commonGenres: ["Pop", "Indie Pop", "Alternative"],
  },
]

const getSimilarityColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-500"
  if (percentage >= 85) return "bg-blue-500"
  if (percentage >= 80) return "bg-yellow-500"
  return "bg-gray-500"
}

export function SimilarArtistsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Artists You Might Like
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarArtists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Artist Image */}
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Artist Info */}
                  <div className="text-center mb-4">
                    <Link
                      href={`/artist/${artist.artistId}`}
                      className="font-semibold text-lg hover:text-primary transition-colors"
                    >
                      {artist.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{artist.genre}</p>
                    <p className="text-xs text-muted-foreground mt-1">{artist.monthlyListeners} monthly listeners</p>
                  </div>

                  {/* Similarity Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className={`text-white ${getSimilarityColor(artist.similarity)}`}>
                      {artist.similarity}% match
                    </Badge>
                  </div>

                  {/* Reason */}
                  <p className="text-xs text-muted-foreground text-center mb-4 italic">{artist.reason}</p>

                  {/* Top Track */}
                  <div className="bg-muted/30 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold mb-2">Top Track</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={artist.topTrack.cover || "/placeholder.svg"}
                        alt={artist.topTrack.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <MusicPlayer
                          music={{
                            title: artist.topTrack.title,
                            artist: artist.name,
                            album: artist.topTrack.title,
                            cover: artist.topTrack.cover,
                            preview: artist.topTrack.preview,
                            artistId: artist.artistId,
                          }}
                        >
                          <p className="text-sm font-medium truncate cursor-pointer hover:text-primary transition-colors">
                            {artist.topTrack.title}
                          </p>
                        </MusicPlayer>
                      </div>
                      <MusicPlayer
                        music={{
                          title: artist.topTrack.title,
                          artist: artist.name,
                          album: artist.topTrack.title,
                          cover: artist.topTrack.cover,
                          preview: artist.topTrack.preview,
                          artistId: artist.artistId,
                        }}
                      >
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      </MusicPlayer>
                    </div>
                  </div>

                  {/* Common Genres */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2">Common Genres</p>
                    <div className="flex flex-wrap gap-1">
                      {artist.commonGenres.map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Follow
                    </Button>
                  </div>

                  <Link href={`/artist/${artist.artistId}`}>
                    <Button className="w-full mt-2" size="sm">
                      View Artist
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
