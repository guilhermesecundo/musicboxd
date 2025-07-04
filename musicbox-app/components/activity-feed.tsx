import Link from "next/link"
import { Heart, MessageCircle, Plus, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "a",
    },
    action: "liked",
    target: "Blinding Lights by The Weeknd",
    music: {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "/placeholder.svg?height=300&width=300",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      artistId: "the-weeknd",
    },
    time: "2 hours ago",
    type: "like",
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      username: "mikechen",
      avatar: "a",
    },
    action: "added to list",
    target: "Summer Vibes 2024",
    album: "After Hours by The Weeknd",
    time: "4 hours ago",
    type: "list",
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "a",
    },
    action: "rated",
    target: "Folklore by Taylor Swift",
    music: {
      title: "Folklore",
      artist: "Taylor Swift",
      album: "Folklore",
      cover: "/placeholder.svg?height=300&width=300",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      artistId: "taylor-swift",
    },
    rating: 5,
    time: "6 hours ago",
    type: "rating",
  },
  {
    id: 4,
    user: {
      name: "Alex Rodriguez",
      username: "alexr",
      avatar: "a",
    },
    action: "favorited",
    target: "Dua Lipa",
    artistId: "dua-lipa",
    time: "8 hours ago",
    type: "favorite",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          Latest from Friends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Link href={`/profile/${activity.user.username}`}>
              <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
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

              {activity.album && <div className="text-xs text-muted-foreground mt-1">{activity.album}</div>}
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <div className="pt-4 border-t">
          <Link href="/community?tab=friends">
            <Button variant="outline" className="w-full">
              Show More Friends Activity
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
