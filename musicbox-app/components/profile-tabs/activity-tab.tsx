"use client"

import { Heart, MessageCircle, Plus, Star, Music } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"

interface User {
  id: number
  username: string
  displayName: string
  isCurrentUser: boolean
}

interface ActivityTabProps {
  user: User
}

const activities = [
  {
    id: 1,
    action: "rated",
    target: "Folklore by Taylor Swift",
    rating: 5,
    time: "2 hours ago",
    type: "rating",
  },
  {
    id: 2,
    action: "added to list",
    target: "Summer Vibes 2024",
    album: "After Hours by The Weeknd",
    time: "4 hours ago",
    type: "list",
  },
  {
    id: 3,
    action: "liked",
    target: "Blinding Lights by The Weeknd",
    time: "6 hours ago",
    type: "like",
  },
  {
    id: 4,
    action: "favorited artist",
    target: "Dua Lipa",
    time: "1 day ago",
    type: "favorite",
  },
  {
    id: 5,
    action: "reviewed",
    target: "Midnights by Taylor Swift",
    review:
      "An absolute masterpiece! Taylor's songwriting has reached new heights with this album. Every track tells a story.",
    time: "2 days ago",
    type: "review",
  },
]

export function ActivityTab({ user }: ActivityTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={
                    user.isCurrentUser ? "/placeholder.svg?height=40&width=40" : "/placeholder.svg?height=40&width=40"
                  }
                  alt={user.displayName}
                />
                <AvatarFallback>
                  {user.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{user.displayName}</span>
                  <span className="text-muted-foreground text-xs">@{user.username}</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-muted-foreground text-xs">{activity.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm mb-2">
                  {activity.type === "like" && <Heart className="h-4 w-4 text-pink-500" />}
                  {activity.type === "list" && <Plus className="h-4 w-4 text-blue-500" />}
                  {activity.type === "rating" && <Star className="h-4 w-4 text-yellow-500" />}
                  {activity.type === "favorite" && <Heart className="h-4 w-4 text-red-500" />}
                  {activity.type === "review" && <MessageCircle className="h-4 w-4 text-green-500" />}

                  <span className="text-muted-foreground">{activity.action}</span>
                  {activity.type === "like" || activity.type === "rating" ? (
                    <MusicPlayer music={getMusicFromActivity(activity)}>
                      <button className="font-medium hover:text-primary transition-colors">{activity.target}</button>
                    </MusicPlayer>
                  ) : (
                    <button
                      onClick={() => {
                        if (activity.type === "favorite") {
                          handleArtistClick(activity.target)
                        } else if (activity.album) {
                          handleAlbumClick(activity.target)
                        }
                      }}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {activity.target}
                    </button>
                  )}
                  {activity.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: activity.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>

                {activity.album && <div className="text-xs text-muted-foreground mb-2">{activity.album}</div>}
                {activity.review && <div className="text-sm bg-muted/50 p-3 rounded-lg">"{activity.review}"</div>}
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const getMusicFromActivity = (activity: any) => {
  if (activity.type === "like" || activity.type === "rating") {
    const parts = activity.target.split(" by ")
    return {
      title: parts[0],
      artist: parts[1] || "Unknown Artist",
      album: "Unknown Album",
      cover: "/placeholder.svg?height=80&width=80",
      preview: "/placeholder-audio.mp3",
      artistId: (parts[1] || "unknown")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    }
  }
  return null
}

const handleAlbumClick = (albumName: string) => {
  const albumId = albumName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  window.location.href = `/album/${albumId}`
}

const handleArtistClick = (artistName: string) => {
  const artistId = artistName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  window.location.href = `/artist/${artistId}`
}
