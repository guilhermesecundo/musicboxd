"use client"

import type React from "react"

import { Star, MessageSquare, ThumbsUp, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Album {
  id: string
  title: string
  rating: number
  reviewCount: number
}

interface AlbumReviewsProps {
  album: Album
}

const mockReviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "a",
      username: "sarahj_music",
    },
    rating: 5,
    comment:
      "Absolutely incredible album! Taylor's songwriting has reached new heights. Every track tells a story and the production is flawless.",
    date: "2 days ago",
    likes: 24,
    helpful: true,
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "a",
      username: "mikechen92",
    },
    rating: 4,
    comment: "Great album overall, though a few tracks feel repetitive. The standout songs are absolutely phenomenal.",
    date: "1 week ago",
    likes: 12,
    helpful: false,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "a",
      username: "emmaw_reviews",
    },
    rating: 5,
    comment:
      "This album perfectly captures the feeling of late-night introspection. A masterpiece from start to finish.",
    date: "2 weeks ago",
    likes: 31,
    helpful: true,
  },
]

export function AlbumReviews({ album }: AlbumReviewsProps) {
  const handleProfileClick = (username: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/profile/${username}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          Reviews
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{album.rating}</span>
          </div>
          <span className="text-muted-foreground">({album.reviewCount.toLocaleString()} reviews)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="space-y-3 pb-4 border-b last:border-b-0">
            <div className="flex items-start gap-3">
              <button
                onClick={(e) => handleProfileClick(review.user.username, e)}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </button>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleProfileClick(review.user.username, e)}
                    className="font-medium text-sm hover:text-primary transition-colors"
                  >
                    {review.user.name}
                  </button>
                  <button
                    onClick={(e) => handleProfileClick(review.user.username, e)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    @{review.user.username}
                  </button>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {review.likes}
                  </Button>
                  {review.helpful && <span className="text-xs text-green-600 font-medium">Helpful</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View All Reviews
        </Button>
      </CardContent>
    </Card>
  )
}
