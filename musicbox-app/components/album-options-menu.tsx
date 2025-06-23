"use client"

import { useState } from "react"
import { MoreHorizontal, Heart, Star, Share, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReviewDialog } from "@/components/review-dialog"

interface Album {
  id: string
  title: string
  artist: string
  cover: string
}

interface AlbumOptionsMenuProps {
  album: Album
  onLike: () => void
  onFavorite: () => void
  onReview: () => void
  onShare: () => void
}

export function AlbumOptionsMenu({ album, onLike, onFavorite, onReview, onShare }: AlbumOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  const handleAction = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const handleReviewClick = () => {
    setShowReviewDialog(true)
    setIsOpen(false)
  }

  const handleReviewSubmit = (reviewData: { rating: number; comment: string }) => {
    console.log("Album review submitted:", reviewData)
    onReview()
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="lg"
            className="bg-black/20 hover:bg-black/30 text-white border-0 backdrop-blur-sm transition-all duration-200"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* Like */}
          <DropdownMenuItem onClick={() => handleAction(onLike)}>
            <Heart className="mr-2 h-4 w-4" />
            Like Album
          </DropdownMenuItem>

          {/* Favorite */}
          <DropdownMenuItem onClick={() => handleAction(onFavorite)}>
            <Star className="mr-2 h-4 w-4" />
            Add to Favorites
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Share */}
          <DropdownMenuItem onClick={() => handleAction(onShare)}>
            <Share className="mr-2 h-4 w-4" />
            Share Album
          </DropdownMenuItem>

          {/* Review */}
          <DropdownMenuItem onClick={handleReviewClick}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Write Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReviewDialog
        open={showReviewDialog}
        onOpenChange={setShowReviewDialog}
        music={{
          title: album.title,
          artist: album.artist,
          album: album.title,
          cover: album.cover,
        }}
        onSubmitReview={handleReviewSubmit}
        type="album"
      />
    </>
  )
}
