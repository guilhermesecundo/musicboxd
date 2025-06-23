"use client"

import { Suspense, useState } from "react"
import { HomeHeader } from "@/components/home-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, UserPlus, UserCheck, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import React from "react"

interface User {
  id: number
  username: string
  displayName: string
  bio: string
  profilePicture: string
  followers: number
  following: number
  isFollowing: boolean
  isCurrentUser: boolean
  mutualFollowers?: number
}

interface FollowersPageProps {
  params: {
    username: string
  }
}

// Mock data - in a real app, this would come from a database
const getFollowersData = (username: string) => {
  const followers: User[] = [
    {
      id: 1,
      username: "musiclover23",
      displayName: "Alex Johnson",
      bio: "Indie rock enthusiast 🎸",
      profilePicture: "/placeholder.svg?height=50&width=50",
      followers: 234,
      following: 189,
      isFollowing: true,
      isCurrentUser: false,
      mutualFollowers: 12,
    },
    {
      id: 2,
      username: "vinylcollector",
      displayName: "Sarah Chen",
      bio: "Collecting records since 1995 📀",
      profilePicture: "/placeholder.svg?height=50&width=50",
      followers: 567,
      following: 234,
      isFollowing: false,
      isCurrentUser: false,
      mutualFollowers: 8,
    },
    {
      id: 3,
      username: "jazzfan",
      displayName: "Marcus Williams",
      bio: "Jazz is life 🎺",
      profilePicture: "/placeholder.svg?height=50&width=50",
      followers: 123,
      following: 456,
      isFollowing: true,
      isCurrentUser: false,
      mutualFollowers: 5,
    },
  ]

  const following: User[] = [
    {
      id: 4,
      username: "popstar2024",
      displayName: "Emma Davis",
      bio: "Pop music producer & songwriter ✨",
      profilePicture: "/placeholder.svg?height=50&width=50",
      followers: 1234,
      following: 567,
      isFollowing: true,
      isCurrentUser: false,
      mutualFollowers: 23,
    },
    {
      id: 5,
      username: "rocklegend",
      displayName: "Jake Miller",
      bio: "Rock & Roll Hall of Fame curator 🤘",
      profilePicture: "/placeholder.svg?height=50&width=50",
      followers: 2345,
      following: 123,
      isFollowing: true,
      isCurrentUser: false,
      mutualFollowers: 15,
    },
  ]

  return { followers, following }
}

export default function FollowersPage({ params }: FollowersPageProps) {
  const { username } = React.use(params)

  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "followers"

  const { followers, following } = getFollowersData(username)
  const [searchQuery, setSearchQuery] = useState("")
  const [followersData, setFollowersData] = useState(followers)
  const [followingData, setFollowingData] = useState(following)

  const handleFollowToggle = (userId: number, isFollowing: boolean, listType: "followers" | "following") => {
    if (listType === "followers") {
      setFollowersData((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isFollowing: !isFollowing } : user)),
      )
    } else {
      setFollowingData((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isFollowing: !isFollowing } : user)),
      )
    }
  }

  const handleUnfollow = (userId: number) => {
    setFollowingData((prev) => prev.filter((user) => user.id !== userId))
  }

  const handleProfileClick = (username: string) => {
    window.location.href = `/profile/${username}`
  }

  const filteredFollowers = followersData.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFollowing = followingData.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const UserCard = ({ user, listType }: { user: User; listType: "followers" | "following" }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer flex-1"
            onClick={() => handleProfileClick(user.username)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback>
                {user.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{user.displayName}</h3>
                {user.mutualFollowers && user.mutualFollowers > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {user.mutualFollowers} mutual
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              {user.bio && <p className="text-sm text-muted-foreground truncate mt-1">{user.bio}</p>}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <span>{user.followers} followers</span>
                <span>{user.following} following</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {listType === "following" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnfollow(user.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Unfollow
              </Button>
            )}

            {!user.isCurrentUser && (
              <Button
                variant={user.isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => handleFollowToggle(user.id, user.isFollowing, listType)}
                className={
                  user.isFollowing
                    ? ""
                    : "bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
                }
              >
                {user.isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-background">
        <HomeHeader />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6" />@{username}'s Network
              </h1>
              <p className="text-muted-foreground">Followers and following connections</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="followers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Followers ({filteredFollowers.length})
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Following ({filteredFollowing.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="followers" className="mt-6">
              <div className="space-y-4">
                {filteredFollowers.length > 0 ? (
                  filteredFollowers.map((user) => <UserCard key={user.id} user={user} listType="followers" />)
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No followers found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms." : "This user doesn't have any followers yet."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <div className="space-y-4">
                {filteredFollowing.length > 0 ? (
                  filteredFollowing.map((user) => <UserCard key={user.id} user={user} listType="following" />)
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No following found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms." : "This user isn't following anyone yet."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Suspense>
  )
}
