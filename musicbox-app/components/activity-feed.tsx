"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Plus, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MusicPlayer } from "@/components/music-player"
import { Skeleton } from "@/components/ui/skeleton"

interface Activity {
  id: number
  user: {
    name: string
    username: string
    avatar: string
  }
  action: string
  target: string
  music?: {
    title: string
    artist: string
    album: string
    cover: string
    preview: string
    artistId: string
  }
  album?: string
  artistId?: string
  rating?: number
  time: string
  type: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch("/api/activity")
        const data = await res.json()
        setActivities(data.activities || [])
      } catch (error) {
        console.error("Erro ao carregar atividades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          Latest from Friends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activities found</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Link href={`/profile/${activity.user.username}`}>
                <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage
                    src={activity.user.avatar || "/placeholder.svg"}
                    alt={activity.user.name}
                  />
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/profile/${activity.user.username}`}
                    className="font-medium text-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    {activity.user.name}
                  </Link>
                  <Link
                    href={`/profile/${activity.user.username}`}
                    className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer"
                  >
                    @{activity.user.username}
                  </Link>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-muted-foreground text-xs">{activity.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {activity.type === "like" && <Heart className="h-4 w-4 text-pink-500" />}
                  {activity.type === "list" && <Plus className="h-4 w-4 text-blue-500" />}
                  {activity.type === "rating" && <Star className="h-4 w-4 text-yellow-500" />}
                  {activity.type === "favorite" && <Heart className="h-4 w-4 text-red-500" />}

                  <span className="text-muted-foreground">{activity.action}</span>
                  {activity.music ? (
                    <MusicPlayer music={activity.music}>
                      <span className="font-medium hover:text-primary cursor-pointer transition-colors">
                        {activity.target}
                      </span>
                    </MusicPlayer>
                  ) : activity.artistId ? (
                    <Link
                      href={`/artist/${activity.artistId}`}
                      className="font-medium hover:text-primary cursor-pointer transition-colors"
                    >
                      {activity.target}
                    </Link>
                  ) : (
                    <span className="font-medium">{activity.target}</span>
                  )}

                  {activity.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: activity.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>

                {activity.album && (
                  <div className="text-xs text-muted-foreground mt-1">{activity.album}</div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
