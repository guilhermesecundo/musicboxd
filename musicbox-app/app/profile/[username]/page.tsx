"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { ListDetailView } from "@/components/list-detail-view"
import { HomeHeader } from "@/components/home-header"

interface User {
  id: number
  username: string
  profilePicture: string
  followers: number
  following: number
  isCurrentUser: boolean
  joinedDate: string
}

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [selectedList, setSelectedList] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("activity")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile/${username}`)
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError("User not found")
        console.error(err)
      }
    }

    fetchUser()
  }, [username])

  const handleListClick = (list: any) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedList(list)
      setIsTransitioning(false)
    }, 150)
  }

  const handleBackToLists = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedList(null)
      setActiveTab("lists")
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : !user ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ProfileHeader user={user} />
            <div className="relative overflow-hidden">
              <div
                className={`transition-all duration-300 ease-in-out ${isTransitioning
                    ? "opacity-0 transform translate-x-4"
                    : "opacity-100 transform translate-x-0"
                  }`}
              >
                {selectedList ? (
                  <ListDetailView list={selectedList} user={user} onBack={handleBackToLists} />
                ) : (
                  <ProfileTabs
                    user={user}
                    onListClick={handleListClick}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
