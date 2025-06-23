"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/context/UserContext"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div
        className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="loading"
      />
    </div>
  )
}

export function FollowedTab() {
  const { username } = useUser() // espera que userId seja número
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFollowedActivity() {
      if (!username) {
        console.warn("No userId available yet.")
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`/api/activity/scope=followed`)
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data = await res.json()
        console.log("Followed activities fetched:", data)
        setActivities(data || [])
      } catch (error) {
        console.error("Failed to fetch followed activities:", error)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }
    fetchFollowedActivity()
  }, [username])

  if (loading) return <LoadingSpinner />

  if (!activities.length) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No recent posts from people you follow.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Following</h2>
        <Badge variant="secondary">{activities.length} recent posts</Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const user = activity.user || {}
          const nome = user.nome || "User"
          const username = user.username || "unknown"
          const avatar = user.avatar || null
          const createdAt = activity.createdAt ? new Date(activity.createdAt).toLocaleString() : "some time ago"

          return (
            <Card key={`${activity.type}-${activity.id}`} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-6 flex gap-4">
                {/* Avatar */}
                <Link href={`/profile/${username}`}>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    {avatar ? (
                      <AvatarImage src={avatar} alt={nome} />
                    ) : (
                      <AvatarFallback>
                        {nome
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>

                {/* Conteúdo da atividade */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/profile/${username}`}
                      className="font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {nome}
                    </Link>
                    <span className="text-muted-foreground text-xs">@{username}</span>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{createdAt}</span>
                  </div>

                  <p className="text-sm mb-2">
                    {activity.action} {activity.target}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
