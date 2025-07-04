import { Clock, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MusicPlayer } from "@/components/music-player"
import Image from "next/image"

interface User {
  id: number
  username: string
  isCurrentUser: boolean
}

interface ListeningHistoryTabProps {
  user: User
}

const listeningHistory = [
  {
    id: 1,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "2 hours ago",
    duration: "3:20",
  },
  {
    id: 2,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "4 hours ago",
    duration: "3:20",
  },
  {
    id: 3,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "6 hours ago",
    duration: "2:36",
  },
  {
    id: 4,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "8 hours ago",
    duration: "2:47",
  },
  {
    id: 5,
    title: "Bad Habit",
    artist: "Steve Lacy",
    album: "Gemini Rights",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "1 day ago",
    duration: "3:51",
  },
  {
    id: 6,
    title: "About Damn Time",
    artist: "Lizzo",
    album: "Special",
    cover: "/placeholder.svg?height=60&width=60",
    listenedAt: "1 day ago",
    duration: "3:12",
  },
]

const stats = {
  totalTracks: 1247,
  totalHours: 89,
  topGenre: "Pop",
  thisMonth: 156,
}

export function ListeningHistoryTab({ user }: ListeningHistoryTabProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.totalTracks}</div>
            <div className="text-sm text-muted-foreground">Total Tracks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.topGenre}</div>
            <div className="text-sm text-muted-foreground">Top Genre</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{stats.thisMonth}</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Listening History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Listening History
            </CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {listeningHistory.map((track) => (
              <MusicPlayer music={track}>
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image src={track.cover || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{track.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                    <p className="text-xs text-muted-foreground">{track.album}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{track.listenedAt}</p>
                    <p className="text-xs text-muted-foreground">{track.duration}</p>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </MusicPlayer>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
