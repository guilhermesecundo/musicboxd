"use client"

import type React from "react"

import { useState } from "react"
import { Star, MessageSquare, MusicIcon, Disc } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Music {
  title: string
  artist: string
  album: string
  cover: string
  preview?: string
}

interface ReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  music: Music
  onSubmitReview: (review: { rating: number; comment: string }) => void
  type?: "music" | "album"
}

export function ReviewDialog({ open, onOpenChange, music, onSubmitReview, type = "music" }: ReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) return

    onSubmitReview({
      rating,
      comment: comment.trim(),
    })

    // Reset form
    setRating(0)
    setHoveredRating(0)
    setComment("")
    onOpenChange(false)
  }

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  const displayRating = hoveredRating || rating

  const isAlbum = type === "album"
  const itemType = isAlbum ? "album" : "track"
  const ItemIcon = isAlbum ? Disc : MusicIcon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Write Review
          </DialogTitle>
          <DialogDescription>
            Share your thoughts about {isAlbum ? "the album" : "the track"} "{music.title}" by {music.artist}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Music/Album Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-lg flex items-center justify-center">
              <ItemIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{music.title}</h3>
              <p className="text-sm text-muted-foreground">{music.artist}</p>
              {!isAlbum && <p className="text-xs text-muted-foreground">{music.album}</p>}
              <p className="text-xs text-blue-600 font-medium capitalize">{itemType} Review</p>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label>Rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= displayRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && (
                  <>
                    {rating} star{rating !== 1 ? "s" : ""}
                    {rating === 1 && " - Poor"}
                    {rating === 2 && " - Fair"}
                    {rating === 3 && " - Good"}
                    {rating === 4 && " - Very Good"}
                    {rating === 5 && " - Excellent"}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Review (Optional)</Label>
            <Textarea
              id="comment"
              placeholder={`Share your thoughts about this ${itemType}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">{comment.length}/500</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              disabled={rating === 0}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
