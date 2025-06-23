"use client"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause, Volume2, VolumeX, X, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useGlobalVolume } from "@/hooks/use-global-volume"
import { MusicOptionsMenu } from "@/components/music-options-menu"
import { ReviewDialog } from "@/components/review-dialog"
import { AddToHistoryDialog } from "@/components/add-to-history-dialog"

interface Music {
  title: string
  artist: string
  album: string
  cover: string
  preview: string
  artistId?: string
}

interface MusicPlayerProps {
  music: Music
  children: ReactNode
}

export function MusicPlayer({ music, children }: MusicPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(20) // Fixed 20-second duration
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isUserSeekingRef = useRef(false)

  // Use global volume hook
  const { volume, isMuted, setVolume, toggleMute } = useGlobalVolume()

  // Separate progress tracking function that's independent of other state
  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    progressIntervalRef.current = setInterval(() => {
      const audio = audioRef.current
      if (!audio || isUserSeekingRef.current) return

      const newTime = audio.currentTime

      // Stop at 20 seconds
      if (newTime >= 20) {
        audio.pause()
        setIsPlaying(false)
        setCurrentTime(20)
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
        return
      }

      setCurrentTime(newTime)
    }, 100)
  }, [])

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [])

  // Handle audio setup and volume
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateDuration = () => {
      setDuration(20)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      stopProgressTracking()
    }

    const handleLoadedMetadata = () => {
      audio.volume = isMuted ? 0 : volume / 100
      updateDuration()
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    if (audio.readyState >= 1) {
      audio.volume = isMuted ? 0 : volume / 100
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isOpen, volume, isMuted, stopProgressTracking])

  // Update audio volume when global volume or mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  // Set initial volume when dialog opens
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [isOpen, volume, isMuted])

  // Handle play/pause state changes for progress tracking
  useEffect(() => {
    if (isPlaying) {
      startProgressTracking()
    } else {
      stopProgressTracking()
    }

    return () => {
      stopProgressTracking()
    }
  }, [isPlaying, startProgressTracking, stopProgressTracking])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    // Ensure volume is set correctly before playing
    audio.volume = isMuted ? 0 : volume / 100

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // Reset if at the end
      if (currentTime >= 20) {
        audio.currentTime = 0
        setCurrentTime(0)
      }

      audio.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    isUserSeekingRef.current = true

    // Calculate new time based on 20-second duration
    const newTime = (value[0] / 100) * 20
    const clampedTime = Math.min(newTime, 20)

    audio.currentTime = clampedTime
    setCurrentTime(clampedTime)

    // Resume progress tracking after seeking
    setTimeout(() => {
      isUserSeekingRef.current = false
    }, 50)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    // Immediately apply the volume to the current audio element
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      setCurrentTime(0)
      stopProgressTracking()
      isUserSeekingRef.current = false
    }
  }

  // Music options handlers
  const handleAddToList = (listId: string) => {
    console.log(`Adding "${music.title}" to list ${listId}`)
    // Implement add to list logic
  }

  const handleLike = () => {
    console.log(`Liked "${music.title}"`)
    // Implement like logic
  }

  const handleFavorite = () => {
    console.log(`Added "${music.title}" to favorites`)
    // Implement favorite logic
  }

  const handleShare = () => {
    console.log(`Sharing "${music.title}"`)
    // Implement share logic
  }

  const handleReview = () => {
    setIsReviewDialogOpen(true)
  }

  const handleAddToHistory = () => {
    setIsHistoryDialogOpen(true)
  }

  const handleSubmitReview = (review: { rating: number; comment: string }) => {
    console.log(`Review for "${music.title}":`, review)
    // Implement review submission logic
  }

  const handleSubmitHistory = (historyData: any) => {
    console.log(`Adding "${music.title}" to history:`, historyData)
    // Implement history addition logic
  }

  // Calculate progress percentage based on 20-second duration
  const progressPercentage = (currentTime / 20) * 100

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div onClick={() => setIsOpen(true)}>{children}</div>
        </DialogTrigger>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="relative">
            {/* Options Menu */}
            <div className="absolute top-4 left-4 z-10">
              <MusicOptionsMenu
                music={music}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onFavorite={handleFavorite}
                onShare={handleShare}
                onReview={handleReview}
                onAddToHistory={handleAddToHistory}
              />
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Album Cover */}
            <div className="relative aspect-square">
              <Image src={music.cover || "/placeholder.svg"} alt={music.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Music Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-xl font-bold mb-1">{music.title}</h2>
              {music.artistId ? (
                <Link
                  href={`/artist/${music.artistId}`}
                  className="text-white/80 mb-1 hover:text-white transition-colors cursor-pointer inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {music.artist}
                </Link>
              ) : (
                <p className="text-white/80 mb-1">{music.artist}</p>
              )}
              <p
                className="text-white/60 text-sm hover:text-white/80 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  // Navigate to album page - you can customize this logic based on how you determine album ID
                  const albumId = music.album
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "-")
                    .replace(/-+/g, "-")
                  window.location.href = `/album/${albumId}`
                }}
              >
                {music.album}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-6 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider value={[progressPercentage]} onValueChange={handleSeek} max={100} step={0.1} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>0:20</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>

              <Button
                onClick={togglePlay}
                size="icon"
                className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>

              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8 hover:bg-muted/50">
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-8">{isMuted ? "0%" : `${volume}%`}</span>
            </div>

            {/* Preview Notice */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">20-second preview</p>
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} src={music.preview} preload="metadata" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <ReviewDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        music={music}
        onSubmitReview={handleSubmitReview}
      />

      {/* Add to History Dialog */}
      <AddToHistoryDialog
        open={isHistoryDialogOpen}
        onOpenChange={setIsHistoryDialogOpen}
        music={music}
        onAddToHistory={handleSubmitHistory}
      />
    </>
  )
}
