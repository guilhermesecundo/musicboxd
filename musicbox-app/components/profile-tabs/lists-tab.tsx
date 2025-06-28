"use client"

import { useEffect, useState } from "react"
import { List, Plus, Music, Lock, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CreateListDialog } from "@/components/create-list-dialog"

interface User {
  id: number
  username: string
  displayName: string
  isCurrentUser: boolean
}

interface ListsTabProps {
  user: User
  onListClick?: (list: any) => void
}

interface MusicList {
  id: number
  title: string
  description: string
  trackCount: number
  isPublic: boolean
  coverImages: string[]
  createdAt: string
  likes: number
}

export function ListsTab({ user, onListClick }: ListsTabProps) {
  const [musicLists, setMusicLists] = useState<MusicList[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLists() {
      try {
        const res = await fetch(`/api/users/${user.id}/playlists`)
        const data = await res.json()
        setMusicLists(data)
      } catch (error) {
        console.error("Failed to load playlists:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [user.id])

  const handleCreateList = async (listData: any) => {
    try {
      const res = await fetch(`/api/users/${user.id}/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: listData.title,
          description: listData.description,
          isPublic: listData.isPublic,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to create playlist")
      }

      const newList = await res.json()
      setMusicLists((prev) => [...prev, {
        id: newList.id,
        title: newList.name,
        description: newList.description,
        trackCount: 0,
        isPublic: listData.isPublic,
        coverImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        createdAt: "just now",
        likes: 0,
      }])
    } catch (error) {
      console.error("Error creating list:", error)
    }
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {user.isCurrentUser && (
          <Button
            className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create List
          </Button>
        )}
      </div>

      {/* Lists Grid */}
      {loading ? (
        <p className="text-muted-foreground">Loading playlists...</p>
      ) : musicLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {musicLists.map((list) => (
            <Card
              key={list.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onListClick?.(list)}
            >
              <CardContent className="p-6">
                {/* Cover Images Grid */}
                {/* <div className="grid grid-cols-2 gap-1 w-32 h-32 mb-4 rounded-lg overflow-hidden">
                  {list.coverImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div> */}

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{list.title}</h3>
                    <div className="flex items-center gap-2">
                      {list.isPublic ? (
                        <Globe className="h-4 w-4 text-green-500" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{list.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Music className="h-4 w-4" />
                      {list.trackCount} tracks
                    </div>
                    <span>•</span>
                    <span>{list.createdAt}</span>
                    {list.isPublic && list.likes > 0 && (
                      <>
                        <span>•</span>
                        <span>{list.likes} likes</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant={list.isPublic ? "default" : "secondary"}>
                      {list.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <List className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No lists yet</h3>
            <p className="text-muted-foreground mb-4">
              {user.isCurrentUser
                ? "Create your first music list to organize your favorite tracks"
                : ``}
            </p>
            {(
              <Button
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First List
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog */}
      <CreateListDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateList={handleCreateList}
      />
    </div>
  )
}
