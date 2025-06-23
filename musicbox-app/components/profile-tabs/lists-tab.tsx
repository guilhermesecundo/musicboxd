"use client"

import { useState } from "react"
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

const musicLists = [
  {
    id: 1,
    title: "Summer Vibes 2024",
    description: "Perfect songs for those warm summer days and road trips",
    trackCount: 47,
    isPublic: true,
    coverImages: [
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
    ],
    createdAt: "2 weeks ago",
    likes: 23,
  },
  {
    id: 2,
    title: "Indie Rock Essentials",
    description: "The best indie rock tracks that define the genre",
    trackCount: 89,
    isPublic: true,
    coverImages: [
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
    ],
    createdAt: "1 month ago",
    likes: 156,
  },
  {
    id: 3,
    title: "Late Night Study",
    description: "Chill beats and ambient sounds for focused work sessions",
    trackCount: 32,
    isPublic: false,
    coverImages: [
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
    ],
    createdAt: "3 weeks ago",
    likes: 0,
  },
  {
    id: 4,
    title: "Workout Motivation",
    description: "High-energy tracks to power through any workout",
    trackCount: 65,
    isPublic: true,
    coverImages: [
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
    ],
    createdAt: "2 months ago",
    likes: 89,
  },
]

export function ListsTab({ user, onListClick }: ListsTabProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateList = (listData: any) => {
    console.log("Creating list:", listData)
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Music Lists</h2>
          <p className="text-muted-foreground">
            {user.isCurrentUser ? "Your" : `${user.displayName}'s`} curated music collections
          </p>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {musicLists.map((list) => (
          <Card
            key={list.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onListClick?.(list)}
          >
            <CardContent className="p-6">
              {/* Cover Images Grid */}
              <div className="grid grid-cols-2 gap-1 w-32 h-32 mb-4 rounded-lg overflow-hidden">
                {list.coverImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* List Info */}
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

      {/* Empty State for New Users */}
      {musicLists.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <List className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No lists yet</h3>
            <p className="text-muted-foreground mb-4">
              {user.isCurrentUser
                ? "Create your first music list to organize your favorite tracks"
                : `${user.displayName} hasn't created any public lists yet`}
            </p>
            {user.isCurrentUser && (
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

      {/* Create List Dialog */}
      <CreateListDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateList={handleCreateList}
      />
    </div>
  )
}
