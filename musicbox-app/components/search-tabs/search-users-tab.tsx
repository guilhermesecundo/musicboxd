"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle, UserPlus, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface SearchUsersTabProps {
  users: any[]
}

export function SearchUsersTab({ users }: SearchUsersTabProps) {
  const [followingUsers, setFollowingUsers] = useState<Set<number>>(new Set())

  const toggleFollow = (userId: number) => {
    setFollowingUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="group hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Link href={`/profile/${user.username}`}>
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden cursor-pointer">
                  <Image
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={user.displayName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>

              <div className="space-y-2">
                <Link href={`/profile/${user.username}`}>
                  <div className="cursor-pointer hover:text-primary">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="font-semibold">{user.displayName}</h3>
                      {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                </Link>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-4">
                    <span>{user.followers.toLocaleString()} followers</span>
                    <span>•</span>
                    <span>{user.following.toLocaleString()} following</span>
                  </div>
                </div>

                {user.bio && <p className="text-xs text-muted-foreground line-clamp-2 px-2">{user.bio}</p>}

                <Button
                  size="sm"
                  variant={followingUsers.has(user.id) ? "outline" : "default"}
                  onClick={() => toggleFollow(user.id)}
                  className="mt-3"
                >
                  {followingUsers.has(user.id) ? (
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List View */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">All Users</h3>
        {users.map((user) => (
          <div
            key={`list-${user.id}`}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Link href={`/profile/${user.username}`}>
              <div className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer">
                <Image
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.displayName}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/profile/${user.username}`}>
                <div className="cursor-pointer hover:text-primary">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{user.displayName}</h4>
                    {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>{user.followers.toLocaleString()} followers</span>
                <span>•</span>
                <span>{user.following.toLocaleString()} following</span>
              </div>

              {user.bio && <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>}
            </div>

            <Button
              size="sm"
              variant={followingUsers.has(user.id) ? "outline" : "default"}
              onClick={() => toggleFollow(user.id)}
            >
              {followingUsers.has(user.id) ? (
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
          </div>
        ))}
      </div>
    </div>
  )
}
