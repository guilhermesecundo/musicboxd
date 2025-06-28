// components/list-detail-view.tsx
"use client"

import React, { useEffect, useState } from "react"
import {
  ArrowLeft,
  Share2,
  Edit3,
  Save,
  Trash2,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface User {
  id: number
  username: string
  name: string
  profilePicture: string
  isCurrentUser: boolean
}

interface Track {
  id: number
  title: string
  artist: string
  album: string
  albumId: string | number
  duration: string
  coverArt: string
  isLiked: boolean
}

interface ListDetailViewProps {
  list: { id: number; title: string; description: string; coverImages: string[] }
  user: User
  onBack: () => void
}

export function ListDetailView({ list, user, onBack }: ListDetailViewProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await fetch(`/api/lists/${list.id}/tracks`)
      const data = await res.json()
      setTracks(data)
    }
    fetchTracks()
  }, [list.id])

  const handleRemoveTrack = (trackId: number) => {
    setTracks(tracks.filter((track) => track.id !== trackId))
  }

  const handleAddTrack = (trackTitle: string) => {
    const newTrack: Track = {
      id: Date.now(),
      title: trackTitle,
      artist: "Unknown",
      album: "Unknown",
      albumId: "0",
      duration: "3:00",
      coverArt: "/placeholder.svg",
      isLiked: false,
    }
    setTracks([...tracks, newTrack])
    setSearchQuery("")
  }

  const handleAlbumClick = (albumId: string | number, e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/album/${albumId}`
  }

  const handleArtistClick = (artistName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const artistId = artistName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    window.location.href = `/artist/${artistId}`
  }

  return (
    <div className="space-y-6 mt-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Lists
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* <div className="w-64 h-64 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 gap-1 w-full h-full">
            {list.coverImages.map((image, index) => (
              <div key={index} className="relative w-full h-full">
                <Image src={image || "/placeholder.svg"} alt="cover" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{list.title}</h1>
          <p className="text-muted-foreground text-lg">{list.description}</p>

          <div className="flex items-center gap-2">
            {/* <Avatar className="h-6 w-6">
              <AvatarImage src={user.profilePicture || "/placeholder.svg"} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar> */}
            <span className="font-medium">{user.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button> */}
            {user.isCurrentUser && (
              <Button size="lg" variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? <><Save className="h-5 w-5 mr-2" /> Save</> : <><Edit3 className="h-5 w-5 mr-2" /> Edit</>}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isEditMode && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for songs to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => handleAddTrack(searchQuery)} disabled={!searchQuery.trim()}>
                <Plus className="h-4 w-4 mr-2" /> Add Song
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {tracks.map((track, index) => (
              <div key={track.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50">
                <div className="col-span-1 text-center">{index + 1}</div>
                <div className="col-span-6 flex items-center gap-3">
                  {/* <Image src={track.coverArt || "/placeholder.svg"} alt={track.album} width={40} height={40} className="rounded" /> */}
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p
                      className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                      onClick={(e) => handleArtistClick(track.artist, e)}
                    >
                      {track.artist}
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p
                    className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                    onClick={(e) => handleAlbumClick(track.albumId, e)}
                  >
                    {track.album}
                  </p>
                </div>
                <div className="col-span-1 text-center">{track.duration}</div>
                <div className="col-span-1 text-center">
                  {isEditMode && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveTrack(track.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
