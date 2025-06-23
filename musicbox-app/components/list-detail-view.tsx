"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  MoreHorizontal,
  Clock,
  Calendar,
  Globe,
  Lock,
  Music2,
  Shuffle,
  Edit3,
  Save,
  Trash2,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { MusicPlayer } from "@/components/music-player"

interface User {
  id: number
  username: string
  displayName: string
  profilePicture: string
  isCurrentUser: boolean
}

interface ListDetailViewProps {
  list: any
  user: User
  onBack: () => void
}

// Mock track data for the list
const getListTracks = (listId: number) => {
  const tracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumId: "after-hours",
      duration: "3:20",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: true,
      plays: "1.2B",
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      albumId: "fine-line",
      duration: "2:54",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: false,
      plays: "890M",
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      albumId: "future-nostalgia",
      duration: "3:23",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: true,
      plays: "756M",
    },
    {
      id: 4,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      albumId: "sour",
      duration: "2:58",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: false,
      plays: "645M",
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      albumId: "fck-love-3",
      duration: "2:21",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: true,
      plays: "534M",
    },
  ]

  return tracks.slice(0, Math.min(tracks.length, listId === 1 ? 5 : listId === 2 ? 4 : 3))
}

export function ListDetailView({ list, user, onBack }: ListDetailViewProps) {
  const [tracks, setTracks] = useState(getListTracks(list.id))
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const totalDuration = tracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(":").map(Number)
    return acc + minutes * 60 + seconds
  }, 0)

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const handleRemoveTrack = (trackId: number) => {
    setTracks(tracks.filter((track) => track.id !== trackId))
    console.log("Removed track:", trackId)
  }

  const handleAddTrack = (trackTitle: string) => {
    // Mock adding a track - in real app this would search and add actual tracks
    const newTrack = {
      id: Date.now(),
      title: trackTitle,
      artist: "Various Artist",
      album: "Various Album",
      albumId: "various-album",
      duration: "3:00",
      coverArt: "/placeholder.svg?height=50&width=50",
      isLiked: false,
      plays: "1M",
    }
    setTracks([...tracks, newTrack])
    setSearchQuery("")
    console.log("Added track:", trackTitle)
  }

  const handleAlbumClick = (albumId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/album/${albumId}`
  }

  const handleArtistClick = (artistName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Convert artist name to URL-friendly format
    const artistId = artistName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    window.location.href = `/artist/${artistId}`
  }

  const handleTrackClick = (track: any) => {
    // The MusicPlayer will handle the dialog opening
  }

  return (
    <div className="space-y-6 mt-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 hover:bg-muted/50 transition-all duration-200 hover:translate-x-1"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Lists
      </Button>

      {/* List Header */}
      <div className="flex flex-col md:flex-row gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
        {/* Cover Art */}
        <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-2 gap-1 w-full h-full">
            {list.coverImages.map((image: string, index: number) => (
              <div key={index} className="relative">
                <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* List Info */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-200">
              <Badge variant={list.isPublic ? "default" : "secondary"}>
                {list.isPublic ? (
                  <>
                    <Globe className="h-3 w-3 mr-1" />
                    Public Playlist
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3 mr-1" />
                    Private Playlist
                  </>
                )}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-300">
              {list.title}
            </h1>
            <p className="text-muted-foreground text-lg animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-400">
              {list.description}
            </p>

            <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-500">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.profilePicture || "/placeholder.svg"} />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{user.displayName}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{tracks.length} songs</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{formatTotalDuration(totalDuration)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-600">
              <Calendar className="h-4 w-4" />
              <span>Created {list.createdAt}</span>
              {list.isPublic && list.likes > 0 && (
                <>
                  <span>•</span>
                  <Heart className="h-4 w-4" />
                  <span>{list.likes} likes</span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-700">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-200"
            >
              <Play className="h-5 w-5 mr-2" />
              Play
            </Button>
            <Button size="lg" variant="outline" className="transition-all duration-200">
              <Shuffle className="h-5 w-5 mr-2" />
              Shuffle
            </Button>
            <Button size="lg" variant="outline" className="transition-all duration-200">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="transition-all duration-200">
              <Share2 className="h-5 w-5" />
            </Button>
            {user.isCurrentUser && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsEditMode(!isEditMode)}
                className="transition-all duration-200"
              >
                {isEditMode ? (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            )}
            <Button size="lg" variant="outline" className="transition-all duration-200">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add Track Section (Edit Mode) */}
      {isEditMode && (
        <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for songs to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => handleAddTrack(searchQuery)} disabled={!searchQuery.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Song
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Track List */}
      <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 text-sm text-muted-foreground border-b">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-1 text-center">
              <Clock className="h-4 w-4 mx-auto" />
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Tracks */}
          <div className="divide-y">
            {tracks.map((track, index) => (
              <MusicPlayer
                key={track.id}
                music={{
                  title: track.title,
                  artist: track.artist,
                  album: track.album,
                  cover: track.coverArt,
                  preview: "/placeholder-audio.mp3", // Add actual preview URL
                  artistId: track.artist
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                }}
              >
                <div
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 transition-all duration-200 group cursor-pointer animate-in fade-in-0 slide-in-from-left-4"
                  style={{ animationDelay: `${400 + index * 50}ms`, animationDuration: "300ms" }}
                >
                  <div className="col-span-1 text-center text-muted-foreground group-hover:hidden transition-opacity duration-200">
                    {index + 1}
                  </div>
                  <div className="col-span-1 text-center hidden group-hover:block">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 transition-all duration-200">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="col-span-6 flex items-center gap-3">
                    <div className="transition-transform duration-200">
                      <Image
                        src={track.coverArt || "/placeholder.svg"}
                        alt={track.album}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium transition-colors duration-200 group-hover:text-primary">
                        {track.title}
                      </p>
                      <p
                        className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                        onClick={(e) => handleArtistClick(track.artist, e)}
                      >
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <p
                      className="text-sm text-muted-foreground truncate hover:text-primary cursor-pointer transition-colors"
                      onClick={(e) => handleAlbumClick(track.albumId, e)}
                    >
                      {track.album}
                    </p>
                  </div>

                  <div className="col-span-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">{track.duration}</p>
                  </div>

                  <div className="col-span-1 flex items-center justify-center">
                    {isEditMode ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveTrack(track.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors duration-200 ${track.isLiked ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </MusicPlayer>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* List Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-500">
        {[
          { icon: Music2, value: tracks.length, label: "Total Tracks" },
          { icon: Clock, value: formatTotalDuration(totalDuration), label: "Total Duration" },
          { icon: Heart, value: list.likes, label: "Total Likes" },
        ].map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-4 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
