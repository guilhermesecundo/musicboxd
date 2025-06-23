"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Heart, Star, Share, Clock, MessageSquare, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateListDialog } from "@/components/create-list-dialog"

interface Music {
  title: string
  artist: string
  album: string
  cover: string
  preview: string
  artistId?: string
}

interface MusicOptionsMenuProps {
  music: Music
  onAddToList: (listId: string) => void
  onLike: () => void
  onFavorite: () => void
  onShare: () => void
  onReview: () => void
  onAddToHistory: () => void
}

// Mock user lists - in real app this would come from props or context
const userLists = [
  { id: "1", name: "My Favorites", isPublic: true, trackCount: 25 },
  { id: "2", name: "Workout Mix", isPublic: false, trackCount: 18 },
  { id: "3", name: "Chill Vibes", isPublic: true, trackCount: 32 },
  { id: "4", name: "Road Trip", isPublic: false, trackCount: 45 },
  { id: "5", name: "Study Music", isPublic: true, trackCount: 12 },
]

export function MusicOptionsMenu({
  music,
  onAddToList,
  onLike,
  onFavorite,
  onShare,
  onReview,
  onAddToHistory,
}: MusicOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCreateListDialog, setShowCreateListDialog] = useState(false)

  const handleAddToList = (listId: string) => {
    onAddToList(listId)
    setIsOpen(false)
  }

  const handleAction = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const handleCreateList = (listData: any) => {
    // Handle the new list creation here
    console.log("New list created:", listData)
    // In a real app, this would call an API to create the list
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-black/20 hover:bg-black/30 text-white border-0 backdrop-blur-sm transition-all duration-200"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Add to List */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className="mr-2 h-4 w-4" />
            Add to List
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            <div className="p-2">
              <p className="text-sm font-medium mb-2">Add "{music.title}" to:</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {userLists.map((list) => (
                  <div
                    key={list.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleAddToList(list.id)}
                  >
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{list.name}</p>
                        <p className="text-xs text-muted-foreground">{list.trackCount} tracks</p>
                      </div>
                    </div>
                    <Badge variant={list.isPublic ? "secondary" : "outline"} className="text-xs">
                      {list.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator className="my-2" />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setShowCreateListDialog(true)
                  setIsOpen(false)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New List
              </Button>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Like */}
        <DropdownMenuItem onClick={() => handleAction(onLike)}>
          <Heart className="mr-2 h-4 w-4" />
          Like
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
          Share
        </DropdownMenuItem>

        {/* Review */}
        <DropdownMenuItem onClick={() => handleAction(onReview)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Write Review
        </DropdownMenuItem>

        {/* Add to History */}
        <DropdownMenuItem onClick={() => handleAction(onAddToHistory)}>
          <Clock className="mr-2 h-4 w-4" />
          Add to History
        </DropdownMenuItem>
      </DropdownMenuContent>

      <CreateListDialog
        open={showCreateListDialog}
        onOpenChange={setShowCreateListDialog}
        onCreateList={handleCreateList}
      />
    </DropdownMenu>
  )
}
