"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function GeneralTab() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGeneralActivity() {
      try {
        const res = await fetch("/api/activity?scope=general")
        if (!res.ok) throw new Error("Failed to fetch general activities")
        const data = await res.json()
        // Supondo que a API já retorne um array simples
        setActivities(data || [])
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchGeneralActivity()
  }, [])

  if (loading) return <div>Loading general community posts...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>
  if (activities.length === 0)
    return <div className="text-center text-muted-foreground">No recent posts found.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">General Community</h2>
        <Badge variant="secondary">{activities.length} recent posts</Badge>
      </div>

      <div className="space-y-4">
        {activities.map((post) => (
          <Card key={`${post.type}-${post.id}`} className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Link href={`/profile/${post.user.username}`}>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    {post.user.avatar ? (
                      <AvatarImage src={post.user.avatar} alt={post.user.name || post.user.name} />
                    ) : (
                      <AvatarFallback>
                        {(post.user.name || post.user.name)
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/profile/${post.user.name}`}
                      className="font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {post.user.name || post.user.name}
                    </Link>
                    
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : "some time ago"}
                    </span>
                  </div>

                  <p className="text-sm mb-3">{post.content || `${post.action} ${post.target}`}</p>

                  

                  {post.album && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={post.album.cover || "/placeholder.svg"}
                        alt={post.album.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm hover:text-primary transition-colors">
                          {post.album.title}
                        </p>
                        <Link
                          href={`/artist/${post.album.artists?.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-muted-foreground text-xs hover:text-primary transition-colors"
                        >
                          {post.album.artists?.name}
                        </Link>
                      </div>
                    </div>
                  )}

                  {post.artist && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm hover:text-primary transition-colors">
                          {post.artist.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
