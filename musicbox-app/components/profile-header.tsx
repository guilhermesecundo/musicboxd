"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, MapPin, Calendar, Settings, UserPlus, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface User {
  id: number
  username: string
  displayName: string
  bio: string
  profilePicture: string
  backgroundPicture: string
  followers: number
  following: number
  isCurrentUser: boolean
  joinedDate: string
  location: string
}

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Card className="overflow-hidden mb-6">
      {/* Background Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-pink-500">
        <Image
          src={user.backgroundPicture || "/placeholder.svg"}
          alt="Profile background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Edit Background Button (only for current user) */}
        {user.isCurrentUser && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0"
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <div className="relative w-32 h-32 rounded-full border-4 border-background bg-background overflow-hidden">
            <Image
              src={user.profilePicture || "/placeholder.svg"}
              alt={user.displayName}
              fill
              className="object-cover"
            />
            {user.isCurrentUser && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
              >
                <Camera className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            {/* Name and Username */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            {/* Bio */}
            <p className="text-sm mb-3 max-w-2xl">{user.bio}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {user.joinedDate}
              </div>
            </div>

            {/* Followers/Following */}
            <div className="flex items-center gap-6 text-sm">
              <button className="hover:underline">
                <span className="font-semibold">{user.following.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Following</span>
              </button>
              <button className="hover:underline">
                <span className="font-semibold">{user.followers.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {user.isCurrentUser ? (
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={handleFollowToggle}
                variant={isFollowing ? "outline" : "default"}
                className={
                  isFollowing ? "" : "bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
                }
              >
                {isFollowing ? (
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
      </div>
    </Card>
  )
}
