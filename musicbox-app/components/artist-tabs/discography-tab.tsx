"use client"

import { Disc, Calendar, Play, Heart, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MusicPlayer } from "@/components/music-player"
import Image from "next/image"

interface Artist {
  id: string
  name: string
}

interface DiscographyTabProps {
  artist: Artist
}

const discography = [
  {
    id: "midnights",
    title: "Midnights",
    type: "Studio Album",
    releaseDate: "2022-10-21",
    cover: "/prop/midnights.png",
    trackCount: 13,
    duration: "44:08",
    plays: "5.2B",
    rating: 4.8,
    description: "Taylor Swift's tenth studio album, exploring themes of sleepless nights and self-reflection.",
    tracks: [
      {
        title: "Lavender Haze",
        duration: "3:22",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      { title: "Maroon", duration: "3:38", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      {
        title: "Anti-Hero",
        duration: "3:20",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
      {
        title: "Snow On The Beach",
        duration: "4:16",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
      {
        title: "You're On Your Own, Kid",
        duration: "3:14",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      },
    ],
  },
  {
    id: "red-taylors-version",
    title: "Red (Taylor's Version)",
    type: "Re-recorded Album",
    releaseDate: "2021-11-12",
    cover: "/prop/red.png",
    trackCount: 30,
    duration: "130:21",
    plays: "3.8B",
    rating: 4.9,
    description: "The re-recorded version of Red, featuring the iconic 10-minute version of All Too Well.",
    tracks: [
      {
        title: "State Of Grace",
        duration: "4:55",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      },
      { title: "Red", duration: "3:43", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      {
        title: "Treacherous",
        duration: "4:02",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      },
      {
        title: "I Knew You Were Trouble",
        duration: "3:39",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      },
      {
        title: "All Too Well (10 Minute Version)",
        duration: "10:13",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      },
    ],
  },
  {
    id: "folklore",
    title: "folklore",
    type: "Studio Album",
    releaseDate: "2020-07-24",
    cover: "/prop/folklore.jpg",
    trackCount: 16,
    duration: "63:29",
    plays: "4.1B",
    rating: 4.7,
    description: "An introspective indie folk album created during the COVID-19 pandemic.",
    tracks: [
      { title: "the 1", duration: "3:30", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
      {
        title: "cardigan",
        duration: "3:59",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      },
      {
        title: "the last great american dynasty",
        duration: "3:51",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
      },
      { title: "exile", duration: "4:45", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
      {
        title: "my tears ricochet",
        duration: "4:15",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
      },
    ],
  },
  {
    id: "lover",
    title: "Lover",
    type: "Studio Album",
    releaseDate: "2019-08-23",
    cover: "/prop/lover.png",
    trackCount: 18,
    duration: "61:49",
    plays: "3.2B",
    rating: 4.5,
    description: "A colorful and romantic album celebrating love in all its forms.",
    tracks: [
      {
        title: "I Forgot That You Existed",
        duration: "2:50",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
      },
      {
        title: "Cruel Summer",
        duration: "2:58",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
      },
      { title: "Lover", duration: "3:41", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" },
      { title: "The Man", duration: "3:10", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3" },
      {
        title: "The Archer",
        duration: "3:31",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
      },
    ],
  },
  {
    id: "reputation",
    title: "reputation",
    type: "Studio Album",
    releaseDate: "2017-11-10",
    cover: "/prop/reputation.jpg",
    trackCount: 15,
    duration: "55:24",
    plays: "2.9B",
    rating: 4.4,
    description: "A darker, more electronic sound exploring themes of reputation and media scrutiny.",
    tracks: [
      {
        title: "...Ready For It?",
        duration: "3:28",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3",
      },
      {
        title: "End Game",
        duration: "4:04",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3",
      },
      {
        title: "I Did Something Bad",
        duration: "3:58",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3",
      },
      {
        title: "Don't Blame Me",
        duration: "3:56",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3",
      },
      {
        title: "Delicate",
        duration: "3:52",
        preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3",
      },
    ],
  },
]

export function DiscographyTab({ artist }: DiscographyTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Disc className="h-6 w-6 text-purple-500" />
            Complete Discography
          </h2>
          <p className="text-muted-foreground">All albums and releases</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Releases</SelectItem>
            <SelectItem value="albums">Studio Albums</SelectItem>
            <SelectItem value="rerecorded">Re-recorded</SelectItem>
            <SelectItem value="singles">Singles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Albums List */}
      <div className="space-y-6">
        {discography.map((album) => (
          <Card key={album.id} className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Album Cover */}
              <div className="lg:w-64 lg:flex-shrink-0">
                <div className="relative aspect-square lg:h-64">
                  <Image src={album.cover || "/placeholder.svg"} alt={album.title} fill className="object-cover" />
                </div>
              </div>

              {/* Album Info */}
              <div className="flex-1 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/album/${album.id}`
                        }}
                      >
                        {album.title}
                      </h3>

                      <Badge variant="outline">{album.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(album.releaseDate)}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{album.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                {/* Track List */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Popular Tracks
                  </h4>
                  {album.tracks.map((track, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-6 text-center text-sm text-muted-foreground">{index + 1}</div>
                      <div className="flex-1 min-w-0">
                        <MusicPlayer
                          music={{
                            title: track.title,
                            artist: artist.name,
                            album: album.title,
                            cover: album.cover,
                            preview: track.preview,
                          }}
                        >
                          <p className="font-medium truncate cursor-pointer hover:text-primary transition-colors">
                            {track.title}
                          </p>
                        </MusicPlayer>
                      </div>
                      <div className="text-sm text-muted-foreground">{track.duration}</div>
                      <div className="flex items-center gap-1">
                        <MusicPlayer
                          music={{
                            title: track.title,
                            artist: artist.name,
                            album: album.title,
                            cover: album.cover,
                            preview: track.preview,
                          }}
                        >
                          
                        </MusicPlayer>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
