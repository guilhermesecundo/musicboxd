import Link from "next/link"
import { MessageCircle, Heart, Share, TrendingUp, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingComments = [
  {
    id: 1,
    user: {
      name: "Music Critic Pro",
      username: "musiccritic",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content:
      "Taylor Swift's 'Midnights' is a masterclass in storytelling. Every track feels like a chapter in a deeply personal novel. The production choices are bold yet intimate. This album will be studied for years to come. 🌙✨",
    likes: 2847,
    replies: 892,
    shares: 456,
    time: "2 hours ago",
    trend: "+45%",
    category: "Album Review",
    relatedMusic: {
      title: "Midnights",
      artist: "Taylor Swift",
    },
  },
  {
    id: 2,
    user: {
      name: "Vinyl Enthusiast",
      username: "vinylhead99",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content:
      "Hot take: Physical media is making a comeback because streaming lacks the emotional connection. There's something magical about dropping the needle on your favorite album. The ritual, the artwork, the liner notes - it's an experience, not just consumption. 🎵📀",
    likes: 1923,
    replies: 567,
    shares: 234,
    time: "4 hours ago",
    trend: "+38%",
    category: "Music Discussion",
  },
  {
    id: 3,
    user: {
      name: "Concert Photographer",
      username: "livemusicshots",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content:
      "Just shot Harry Styles at Madison Square Garden. The energy was absolutely electric! His stage presence has evolved so much since his 1D days. The way he connects with the audience is pure artistry. These photos don't do justice to the magic that happened tonight. 📸✨",
    likes: 1654,
    replies: 423,
    shares: 189,
    time: "6 hours ago",
    trend: "+32%",
    category: "Live Music",
    relatedMusic: {
      title: "As It Was",
      artist: "Harry Styles",
    },
  },
  {
    id: 4,
    user: {
      name: "Indie Discoverer",
      username: "indievibes",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content:
      "Found this incredible underground artist through a random YouTube rabbit hole. Their sound is like if Radiohead and Bon Iver had a musical baby raised by Aphex Twin. Sometimes the best music isn't on the charts. Link in bio! 🎧🔥",
    likes: 1432,
    replies: 298,
    shares: 167,
    time: "8 hours ago",
    trend: "+28%",
    category: "Music Discovery",
  },
  {
    id: 5,
    user: {
      name: "Genre Explorer",
      username: "allgenres",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content:
      "Unpopular opinion: Jazz fusion from the 70s is the most technically impressive music ever created. The complexity, the improvisation, the sheer musicianship - it's mind-blowing. Miles Davis' 'Bitches Brew' still sounds futuristic 50+ years later. Respect the masters! 🎺🎸",
    likes: 1287,
    replies: 445,
    shares: 123,
    time: "10 hours ago",
    trend: "+25%",
    category: "Music History",
  },
  {
    id: 6,
    user: {
      name: "Playlist Curator",
      username: "playlistpro",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content:
      "Spent 6 hours perfecting my 'Rainy Day Vibes' playlist. The flow between songs is everything - it's like creating a musical journey through emotions. Each transition tells a story. Playlist curation is an art form that doesn't get enough recognition. ☔🎵",
    likes: 1156,
    replies: 234,
    shares: 98,
    time: "12 hours ago",
    trend: "+22%",
    category: "Playlist",
  },
]

export function TrendingCommentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          Top Comments This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trendingComments.map((comment, index) => (
            <div key={comment.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Trending Position */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500 font-medium">{comment.trend}</span>
                  </div>
                </div>

                <Link href={`/profile/${comment.user.username}`}>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                    <AvatarFallback>
                      {comment.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/profile/${comment.user.username}`}
                      className="font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {comment.user.name}
                    </Link>
                    {comment.user.isVerified && (
                      <Badge variant="default" className="text-xs bg-blue-500">
                        ✓
                      </Badge>
                    )}
                    <Link
                      href={`/profile/${comment.user.username}`}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer"
                    >
                      @{comment.user.username}
                    </Link>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">{comment.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {comment.category}
                    </Badge>
                  </div>

                  <p className="text-sm mb-3 leading-relaxed">{comment.content}</p>

                  {comment.relatedMusic && (
                    <div className="p-2 bg-muted/30 rounded-lg mb-3 text-xs">
                      <span className="text-muted-foreground">Related to: </span>
                      <span className="font-medium">
                        {comment.relatedMusic.title} by {comment.relatedMusic.artist}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-pink-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {comment.likes.toLocaleString()}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {comment.replies.toLocaleString()}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                      <Share className="h-4 w-4 mr-1" />
                      {comment.shares.toLocaleString()}
                    </Button>
                    <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
