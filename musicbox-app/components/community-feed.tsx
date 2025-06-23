import Link from "next/link"
import { MessageCircle, Heart, Share, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const posts = [
  {
    id: 1,
    user: {
      name: "David Kim",
      username: "davidk",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just discovered this amazing indie band called 'The Midnight'. Their synthwave sound is absolutely incredible! Anyone else listening to them?",
    time: "1 hour ago",
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    user: {
      name: "Lisa Park",
      username: "lisap",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Hot take: Folklore is Taylor Swift's best album. The storytelling and production are just *chef's kiss* 🤌",
    time: "3 hours ago",
    likes: 156,
    comments: 42,
    shares: 18,
  },
  {
    id: 3,
    user: {
      name: "James Wilson",
      username: "jamesw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Currently obsessed with Billie Eilish's new track. The way she experiments with different sounds never fails to amaze me.",
    time: "5 hours ago",
    likes: 89,
    comments: 23,
    shares: 12,
  },
]

export function CommunityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          Community Buzz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <Link href={`/profile/${post.user.username}`}>
                <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
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
                    className="font-medium text-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    {post.user.name}
                  </Link>
                  <Link
                    href={`/profile/${post.user.username}`}
                    className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer"
                  >
                    @{post.user.username}
                  </Link>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-muted-foreground text-xs">{post.time}</span>
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
          </div>
        ))}
        <div className="pt-4 border-t">
          <Link href="/community?tab=general">
            <Button variant="outline" className="w-full">
              Show More Community Posts
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
