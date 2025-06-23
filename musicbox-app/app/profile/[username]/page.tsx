"use client"
import { useState } from "react"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { ListDetailView } from "@/components/list-detail-view"
import { HomeHeader } from "@/components/home-header"

// Mock user data - in a real app, this would come from a database
const getUserData = (username: string) => {
  const users = {
    johndoe: {
      id: 1,
      username: "johndoe",
      displayName: "John Doe",
      bio: "Music enthusiast and vinyl collector. Always discovering new sounds and sharing the journey with fellow music lovers. 🎵",
      profilePicture: "/placeholder.svg?height=120&width=120",
      backgroundPicture: "/placeholder.svg?height=300&width=800",
      followers: 1247,
      following: 892,
      isCurrentUser: true,
      joinedDate: "March 2023",
      location: "San Francisco, CA",
    },
    sarahj: {
      id: 2,
      username: "sarahj",
      displayName: "Sarah Johnson",
      bio: "Indie rock lover | Concert photographer | Always hunting for the next great album 📸🎸",
      profilePicture: "/placeholder.svg?height=120&width=120",
      backgroundPicture: "/placeholder.svg?height=300&width=800",
      followers: 2156,
      following: 543,
      isCurrentUser: false,
      joinedDate: "January 2023",
      location: "Brooklyn, NY",
    },
  }

  return users[username as keyof typeof users] || users.johndoe
}

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = getUserData(params.username)
  const [selectedList, setSelectedList] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("activity")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleListClick = (list: any) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedList(list)
      setIsTransitioning(false)
    }, 150) // Half of the transition duration
  }

  const handleBackToLists = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedList(null)
      setActiveTab("lists")
      setIsTransitioning(false)
    }, 150) // Half of the transition duration
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <ProfileHeader user={user} />

        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
            }`}
          >
            {selectedList ? (
              <ListDetailView list={selectedList} user={user} onBack={handleBackToLists} />
            ) : (
              <ProfileTabs user={user} onListClick={handleListClick} activeTab={activeTab} onTabChange={setActiveTab} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
