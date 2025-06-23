"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Heart, Share2, Plus, Volume2, VolumeX, ExternalLink, Star, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  albumId: string
  duration: string
  coverArt: string
  isLiked?: boolean
  plays?: string
  previewUrl?: string
  rating?: number
}

interface MusicPreviewDialogProps {
  track: Track | null
  isOpen: boolean
  onClose: () => void
}

export function MusicPreviewDialog({ track, isOpen, onClose }: MusicPreviewDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(30) // 30 second preview
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (track) {
      setIsLiked(track.isLiked || false)
      setUserRating(track.rating || 0)
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }, [track])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAlbumClick = () => {
    if (track) {
      window.location.href = `/album/${track.albumId}`
    }
  }

  const handleArtistClick = () => {
    if (track) {
      const artistId = track.artist
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      window.location.href = `/artist/${artistId}`
    }
  }

  if (!track) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Now Playing</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Album Art */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image src={track.coverArt || "/placeholder.svg"} alt={track.album} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Track Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">{track.title}</h3>
            <button onClick={handleArtistClick} className="text-muted-foreground hover:text-primary transition-colors">
              {track.artist}
            </button>
            <button
              onClick={handleAlbumClick}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              {track.album}
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => handleRating(i + 1)} className="transition-colors">
                <Star
                  className={`h-5 w-5 ${
                    i < userRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm" onClick={toggleLike} className={isLiked ? "text-red-500" : ""}>
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>

            <Button
              size="lg"
              onClick={handlePlayPause}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted || volume[0] === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add to List
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Review
            </Button>
          </div>

          {/* Track Stats */}
          {track.plays && (
            <div className="text-center">
              <Badge variant="secondary">{track.plays} plays</Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
