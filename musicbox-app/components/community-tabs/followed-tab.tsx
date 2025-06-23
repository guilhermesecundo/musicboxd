import Link from "next/link"
import { Heart, MessageCircle, Share, Play, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const followedActivities = [
  {
    id: 1,
    user: {
      name: "Indie Music Blog",
      username: "indiemusic",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    type: "post",
    content:
      "Just discovered this incredible new artist! Their sound is a perfect blend of indie rock and electronic elements. Definitely worth checking out.",
    track: {
      title: "Neon Dreams",
      artist: "Luna Echo",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "1 hour ago",
    likes: 89,
    comments: 23,
  },
  {
    id: 2,
    user: {
      name: "Music Producer Jake",
      username: "jakeprod",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    type: "shared_playlist",
    content: "Created a new playlist: 'Late Night Vibes' - Perfect for those 3am studio sessions",
    playlist: {
      title: "Late Night Vibes",
      trackCount: 24,
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "3 hours ago",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    user: {
      name: "Taylor Swift",
      username: "taylorswift",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    type: "announcement",
    content:
      "Excited to share that I'll be performing at the Grammy Awards next month! Can't wait to debut the new song live ✨",
    time: "5 hours ago",
    likes: 2847,
    comments: 892,
  },
  {
    id: 4,
    user: {
      name: "Vinyl Collector",
      username: "vinylhead",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    type: "collection",
    content:
      "Added a rare pressing of 'Dark Side of the Moon' to my collection. The sound quality is absolutely incredible!",
    album: {
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "7 hours ago",
    likes: 67,
    comments: 18,
  },
]

export function FollowedTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Following</h2>
        <Badge variant="secondary">{followedActivities.length} recent posts</Badge>
      </div>

      <div className="space-y-4">
        {followedActivities.map((activity) => (
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
                    {activity.user.isVerified && (
                      <Badge variant="default" className="text-xs bg-blue-500">
                        ✓
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      Following
                    </Badge>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{activity.time}</span>
                  </div>

                  <p className="text-sm mb-3">{activity.content}</p>

                  {/* Activity Content */}
                  {activity.track && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.track.cover || "/placeholder.svg"}
                        alt={activity.track.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <MusicPlayer
                          music={{
                            title: activity.track.title,
                            artist: activity.track.artist,
                            album: activity.track.title,
                            cover: activity.track.cover,
                            preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                            artistId: activity.track.artist.toLowerCase().replace(/\s+/g, "-"),
                          }}
                        >
                          <p className="font-medium text-sm cursor-pointer hover:text-primary transition-colors">
                            {activity.track.title}
                          </p>
                        </MusicPlayer>
                        <Link
                          href={`/artist/${activity.track.artist.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-muted-foreground text-xs hover:text-primary transition-colors"
                        >
                          {activity.track.artist}
                        </Link>
                      </div>
                      <MusicPlayer
                        music={{
                          title: activity.track.title,
                          artist: activity.track.artist,
                          album: activity.track.title,
                          cover: activity.track.cover,
                          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                          artistId: activity.track.artist.toLowerCase().replace(/\s+/g, "-"),
                        }}
                      >
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </MusicPlayer>
                    </div>
                  )}

                  {activity.playlist && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.playlist.cover || "/placeholder.svg"}
                        alt={activity.playlist.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.playlist.title}</p>
                        <p className="text-muted-foreground text-xs">{activity.playlist.trackCount} tracks</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {activity.album && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg mb-3">
                      <img
                        src={activity.album.cover || "/placeholder.svg"}
                        alt={activity.album.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <MusicPlayer
                          music={{
                            title: activity.album.title,
                            artist: activity.album.artist,
                            album: activity.album.title,
                            cover: activity.album.cover,
                            preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                            artistId: activity.album.artist.toLowerCase().replace(/\s+/g, "-"),
                          }}
                        >
                          <p className="font-medium text-sm cursor-pointer hover:text-primary transition-colors">
                            {activity.album.title}
                          </p>
                        </MusicPlayer>
                        <Link
                          href={`/artist/${activity.album.artist.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-muted-foreground text-xs hover:text-primary transition-colors"
                        >
                          {activity.album.artist}
                        </Link>
                      </div>
                      <MusicPlayer
                        music={{
                          title: activity.album.title,
                          artist: activity.album.artist,
                          album: activity.album.title,
                          cover: activity.album.cover,
                          preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                          artistId: activity.album.artist.toLowerCase().replace(/\s+/g, "-"),
                        }}
                      >
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </MusicPlayer>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
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
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Posts</Button>
      </div>
    </div>
  )
}
