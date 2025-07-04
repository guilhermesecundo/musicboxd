import Link from "next/link"
import { Heart, MessageCircle, Share, Play, MoreHorizontal, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

const generalPosts = [
  {
    id: 1,
    user: {
      name: "Music Enthusiast",
      username: "musiclover99",
      avatar: "a",
    },
    content:
      "Anyone else think that 'Flowers' by Miley Cyrus is going to be the song of the year? The production is absolutely incredible and the lyrics hit different 🌸",
    time: "30 minutes ago",
    likes: 156,
    comments: 42,
    shares: 18,
    trending: true,
  },
  {
    id: 2,
    user: {
      name: "Vinyl Hunter",
      username: "vinylfinder",
      avatar: "a",
    },
    content:
      "Found a first pressing of 'Abbey Road' at a local record store today! Sometimes the best finds are hiding in plain sight. What's your best vinyl discovery?",
    album: {
      title: "Abbey Road",
      artist: "The Beatles",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "1 hour ago",
    likes: 89,
    comments: 23,
    shares: 12,
  },
  {
    id: 3,
    user: {
      name: "Concert Goer",
      username: "livemusicfan",
      avatar: "a",
    },
    content:
      "Just got back from the most incredible concert! The energy was absolutely electric. There's nothing quite like experiencing music live with thousands of other fans.",
    time: "2 hours ago",
    likes: 234,
    comments: 67,
    shares: 34,
  },
  {
    id: 4,
    user: {
      name: "Indie Discoverer",
      username: "indievibes",
      avatar: "a",
    },
    content:
      "Discovered this amazing indie artist through a random Spotify recommendation. Their sound is so unique - like if Radiohead and Bon Iver had a musical baby 🎵",
    track: {
      title: "Midnight Echoes",
      artist: "River Stone",
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "3 hours ago",
    likes: 78,
    comments: 19,
    shares: 8,
  },
  {
    id: 5,
    user: {
      name: "Genre Explorer",
      username: "allgenres",
      avatar: "a",
    },
    content:
      "Hot take: Jazz fusion from the 70s is severely underrated. The technical skill and creativity in albums like 'Bitches Brew' still sounds futuristic today.",
    time: "4 hours ago",
    likes: 145,
    comments: 56,
    shares: 23,
  },
  {
    id: 6,
    user: {
      name: "Playlist Curator",
      username: "playlistpro",
      avatar: "a",
    },
    content:
      "Spent 3 hours perfecting my 'Rainy Day Vibes' playlist. The flow between songs is everything - it's like creating a musical journey through emotions ☔",
    playlist: {
      title: "Rainy Day Vibes",
      trackCount: 32,
      cover: "/placeholder.svg?height=60&width=60",
    },
    time: "5 hours ago",
    likes: 92,
    comments: 28,
    shares: 15,
  },
]

export function GeneralTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">General Community</h2>
        <Badge variant="secondary">{generalPosts.length} recent posts</Badge>
      </div>

      <div className="space-y-4">
        {generalPosts.map((post) => (
          <Card key={post.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Link href={`/profile/${post.user.username}`}>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/profile/${post.user.username}`}
                      className="font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {post.user.name}
                    </Link>
                    <Link
                      href={`/profile/${post.user.username}`}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer"
                    >
                      @{post.user.username}
                    </Link>
                    
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{post.time}</span>
                  </div>

                  <p className="text-sm mb-3">{post.content}</p>


                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-pink-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                      <Share className="h-4 w-4 mr-1" />
                      {post.shares}
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
