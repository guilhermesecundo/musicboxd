"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Plus, Minus } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Music {
  title: string
  artist: string
  album: string
  cover: string
}

interface AddToHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  music: Music
  onAddToHistory: (historyData: {
    playCount: number
    date: string
    time: string
    customDate?: string
    customTime?: string
  }) => void
}

export function AddToHistoryDialog({ open, onOpenChange, music, onAddToHistory }: AddToHistoryDialogProps) {
  const [playCount, setPlayCount] = useState(1)
  const [dateOption, setDateOption] = useState("today")
  const [timeOption, setTimeOption] = useState("now")
  const [customDate, setCustomDate] = useState("")
  const [customTime, setCustomTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const historyData = {
      playCount,
      date: dateOption,
      time: timeOption,
      customDate: dateOption === "custom" ? customDate : undefined,
      customTime: timeOption === "custom" ? customTime : undefined,
    }

    onAddToHistory(historyData)

    // Reset form
    setPlayCount(1)
    setDateOption("today")
    setTimeOption("now")
    setCustomDate("")
    setCustomTime("")
    onOpenChange(false)
  }

  const incrementPlayCount = () => {
    setPlayCount((prev) => Math.min(prev + 1, 999))
  }

  const decrementPlayCount = () => {
    setPlayCount((prev) => Math.max(prev - 1, 1))
  }

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Add to Listening History
          </DialogTitle>
          <DialogDescription>
            Add "{music.title}" by {music.artist} to your listening history
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Music Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{music.title}</h3>
              <p className="text-sm text-muted-foreground">{music.artist}</p>
              <p className="text-xs text-muted-foreground">{music.album}</p>
            </div>
          </div>

          {/* Play Count */}
          <div className="space-y-2">
            <Label>Times Listened</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decrementPlayCount}
                disabled={playCount <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={playCount}
                onChange={(e) => setPlayCount(Math.max(1, Math.min(999, Number.parseInt(e.target.value) || 1)))}
                className="w-20 text-center"
                min="1"
                max="999"
              />
              <Button type="button" variant="outline" size="icon" onClick={incrementPlayCount}>
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground ml-2">time{playCount !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Select value={dateOption} onValueChange={setDateOption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">Earlier this week</SelectItem>
                <SelectItem value="last-week">Last week</SelectItem>
                <SelectItem value="custom">Custom date</SelectItem>
              </SelectContent>
            </Select>
            {dateOption === "custom" && (
              <Input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                max={getCurrentDate()}
                required
              />
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={timeOption} onValueChange={setTimeOption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Right now</SelectItem>
                <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (2:00 PM)</SelectItem>
                <SelectItem value="evening">Evening (7:00 PM)</SelectItem>
                <SelectItem value="night">Night (10:00 PM)</SelectItem>
                <SelectItem value="custom">Custom time</SelectItem>
              </SelectContent>
            </Select>
            {timeOption === "custom" && (
              <Input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} required />
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              Add to History
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
