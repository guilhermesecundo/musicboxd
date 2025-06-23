"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Upload, Globe, Lock, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateList: (listData: any) => void
}

export function CreateListDialog({ open, onOpenChange, onCreateList }: CreateListDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [genre, setGenre] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const listData = {
      title: title.trim(),
      description: description.trim(),
      isPublic,
      genre,
      coverImage,
      createdAt: new Date().toISOString(),
    }

    onCreateList(listData)

    // Reset form
    setTitle("")
    setDescription("")
    setIsPublic(true)
    setGenre("")
    setCoverImage(null)

    onOpenChange(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setCoverImage(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New List
          </DialogTitle>
          <DialogDescription>Create a new music list to organize your favorite tracks</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter list title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your list..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Privacy Setting */}
          <div className="space-y-3">
            <Label>Privacy</Label>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{isPublic ? "Public" : "Private"}</p>
                  <p className="text-sm text-muted-foreground">
                    {isPublic ? "Anyone can see this list" : "Only you can see this list"}
                  </p>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Select a genre..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="hip-hop">Hip Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="r&b">R&B</SelectItem>
                <SelectItem value="indie">Indie</SelectItem>
                <SelectItem value="alternative">Alternative</SelectItem>
                <SelectItem value="folk">Folk</SelectItem>
                <SelectItem value="reggae">Reggae</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input id="cover" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <label htmlFor="cover" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{coverImage ? coverImage.name : "Upload cover image"}</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </label>
              {coverImage && (
                <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setCoverImage(null)}>
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              disabled={!title.trim()}
            >
              Create List
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
