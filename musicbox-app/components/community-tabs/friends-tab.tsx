import Link from "next/link"
import { Heart, MessageCircle, Share, Play, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const friendsActivities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg?height=40&width=40",
      isFriend: true,
    },
    type: "rated",
    content: "Rated 'Midnights' by Taylor Swift",
    rating: 4.5,
    album: {
      title: "Midnights",
      artist: "Taylor Swift",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "2 hours ago",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: {
      name: "Mike Rodriguez",
      username: "mikerod",
      avatar: "/placeholder.svg?height=40&width=40",
      isFriend: true,
    },
    type: "added_to_list",
    content: "Added 'As It Was' to 'Summer Vibes 2024'",
    track: {
      title: "As It Was",
      artist: "Harry Styles",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "4 hours ago",
    likes: 8,
    comments: 2,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      isFriend: true,
    },
    type: "reviewed",
    content: "Wrote a review for 'SOUR' by Olivia Rodrigo",
    review:
      "This album perfectly captures the emotional rollercoaster of teenage heartbreak. Olivia's songwriting is incredibly mature for her age...",
    album: {
      title: "SOUR",
      artist: "Olivia Rodrigo",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "6 hours ago",
    likes: 24,
    comments: 7,
  },
  {
    id: 4,
    user: {
      name: "Alex Thompson",
      username: "alext",
      avatar: "/placeholder.svg?height=40&width=40",
      isFriend: true,
    },
    type: "favorited",
    content: "Added The Weeknd to favorite artists",
    artist: {
      name: "The Weeknd",
      image: "/placeholder.svg?height=60&width=60",
    },
    time: "8 hours ago",
    likes: 15,
    comments: 4,
  },
]

export function FriendsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Friends Activity</h2>
        <Badge variant="secondary">{friendsActivities.length} recent activities</Badge>
      </div>

      <div className="space-y-4">
        {friendsActivities.map((activity) => (
          <Card key={activity.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Link href={`/profile/${activity.user.username}`}>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
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
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/profile/${activity.user.username}`}
                      className="font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {activity.user.name}
                    </Link>
                    <Badge variant="outline" className="text-xs">
                      Friend
                    </Badge>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{activity.time}</span>
                  </div>

                  <p className="text-sm mb-3">{activity.content}</p>

                  {/* Activity Content */}
                  {activity.album && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.album.cover || "/placeholder.svg"}
                        alt={activity.album.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        {/* <MusicPlayer
                          music={{
                            title: activity.album.title,
                            artist: activity.album.artist,
                            album: activity.album.title,
                            cover: activity.album.cover,
                            preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                            artistId: activity.album.artist.toLowerCase().replace(/\s+/g, "-"),
                          }}
                        >
                        </MusicPlayer> */}
                        <p className="font-medium text-sm hover:text-primary transition-colors">
                          {activity.album.title}
                        </p>
                        <Link
                          href={`/artist/${activity.album.artist.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-muted-foreground text-xs hover:text-primary transition-colors"
                        >
                          {activity.album.artist}
                        </Link>
                        {activity.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">{activity.rating}</span>
                          </div>
                        )}
                      </div>
                      {/* <MusicPlayer
                        music={{
                          title: activity.album.title,
                          artist: activity.album.artist,
                          album: activity.album.title,
                          cover: activity.album.cover,
                          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                          artistId: activity.album.artist.toLowerCase().replace(/\s+/g, "-"),
                        }}
                      >
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </MusicPlayer> */}
                    </div>
                  )}

                  {activity.track && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.track.cover || "/placeholder.svg"}
                        alt={activity.track.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        {/* <MusicPlayer
                          music={{
                            title: activity.track.title,
                            artist: activity.track.artist,
                            album: activity.track.title,
                            cover: activity.track.cover,
                            preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                            artistId: activity.track.artist.toLowerCase().replace(/\s+/g, "-"),
                          }}
                        >
                        </MusicPlayer> */}
                        <p className="font-medium text-sm hover:text-primary transition-colors">
                          {activity.track.title}
                        </p>
                        <Link
                          href={`/artist/${activity.track.artist.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-muted-foreground text-xs hover:text-primary transition-colors"
                        >
                          {activity.track.artist}
                        </Link>
                      </div>
                      {/* <MusicPlayer
                        music={{
                          title: activity.track.title,
                          artist: activity.track.artist,
                          album: activity.track.title,
                          cover: activity.track.cover,
                          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                          artistId: activity.track.artist.toLowerCase().replace(/\s+/g, "-"),
                        }}
                      >
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </MusicPlayer> */}
                    </div>
                  )}

                  {activity.artist && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.artist.image || "/placeholder.svg"}
                        alt={activity.artist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <Link
                          href={`/artist/${activity.artist.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="font-medium text-sm hover:text-primary transition-colors"
                        >
                          {activity.artist.name}
                        </Link>
                        <p className="text-muted-foreground text-xs">Artist</p>
                      </div>
                    </div>
                  )}

                  {activity.review && (
                    <div className="p-3 bg-muted/30 rounded-lg mb-3">
                      <p className="text-sm text-muted-foreground italic">"{activity.review}"</p>
                    </div>
                  )}

                  {/* <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-pink-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {activity.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {activity.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div> */}
                </div>

                {/* <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Activities</Button>
      </div>
    </div>
  )
}
