"use client"

import { useState } from "react"
import { Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
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

interface AddToListButtonProps {
  music: Music
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onAddToList?: (listId: string) => void
}

// Mock user lists - in real app this would come from props or context
const userLists = [
  { id: "1", name: "My Favorites", isPublic: true, trackCount: 25 },
  { id: "2", name: "Workout Mix", isPublic: false, trackCount: 18 },
  { id: "3", name: "Chill Vibes", isPublic: true, trackCount: 32 },
  { id: "4", name: "Road Trip", isPublic: false, trackCount: 45 },
  { id: "5", name: "Study Music", isPublic: true, trackCount: 12 },
]

export function AddToListButton({
  music,
  variant = "ghost",
  size = "sm",
  className = "",
  onAddToList,
}: AddToListButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCreateListDialog, setShowCreateListDialog] = useState(false)

  const handleAddToList = (listId: string) => {
    onAddToList?.(listId)
    console.log(`Added "${music.title}" to list ${listId}`)
    setIsOpen(false)
  }

  const handleCreateList = (listData: any) => {
    console.log("New list created:", listData)
    // In a real app, this would call an API to create the list
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-2">
            <p className="text-sm font-medium mb-2">Add "{music.title}" to:</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {userLists.map((list) => (
                <div
                  key={list.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
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
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateListDialog
        open={showCreateListDialog}
        onOpenChange={setShowCreateListDialog}
        onCreateList={handleCreateList}
      />
    </>
  )
}
