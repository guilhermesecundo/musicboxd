import { Calendar, Play, Heart, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"
import Image from "next/image"

interface Artist {
  id: string
  name: string
}

interface RecentReleasesTabProps {
  artist: Artist
}

const recentReleases = [
  {
    id: 1,
    title: "Lavender Haze",
    album: "Midnights (3am Edition)",
    type: "Single",
    releaseDate: "2023-10-27",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:22",
    plays: "45.2M",
    isNew: true,
  },
  {
    id: 2,
    title: "Anti-Hero",
    album: "Midnights",
    type: "Album Track",
    releaseDate: "2023-10-21",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "3:20",
    plays: "892.1M",
    isNew: false,
  },
  {
    id: 3,
    title: "Karma",
    album: "Midnights",
    type: "Album Track",
    releaseDate: "2023-10-21",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:24",
    plays: "234.7M",
    isNew: false,
  },
  {
    id: 4,
    title: "Vigilante Shit",
    album: "Midnights",
    type: "Album Track",
    releaseDate: "2023-10-21",
    cover: "/placeholder.svg?height=300&width=300",
    preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "2:44",
    plays: "156.3M",
    isNew: false,
  },
]

export function RecentReleasesTab({ artist }: RecentReleasesTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Latest Releases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReleases.map((release) => (
            <div
              key={release.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              {/* Album Cover */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={release.cover || "/placeholder.svg"} alt={release.title} fill className="object-cover" />
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {/* <MusicPlayer
                    music={{
                      title: release.title,
                      artist: artist.name,
                      album: release.album,
                      cover: release.cover,
                      preview: release.preview,
                    }}
                  >
                  </MusicPlayer> */}
                  <h3 className="font-medium truncate hover:text-primary transition-colors">
                    {release.title}
                  </h3>
                  {/* {release.isNew && (
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      New
                    </Badge>
                  )} */}
                </div>
                <p className="text-sm text-muted-foreground truncate">{release.album}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span>{formatDate(release.releaseDate)}</span>
                  <span>•</span>
                  <span>{release.type}</span>
                  <span>•</span>
                  <span>{release.duration}</span>
                  {/* <span>•</span>
                  <span>{release.plays} plays</span> */}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* <MusicPlayer
                  music={{
                    title: release.title,
                    artist: artist.name,
                    album: release.album,
                    cover: release.cover,
                    preview: release.preview,
                  }}
                >
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </MusicPlayer>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button> */}
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
