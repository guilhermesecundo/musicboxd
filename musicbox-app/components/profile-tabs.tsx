"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityTab } from "./profile-tabs/activity-tab"
import { FavoritesTab } from "./profile-tabs/favorites-tab"
import { ListeningHistoryTab } from "./profile-tabs/listening-history-tab"
import { ListsTab } from "./profile-tabs/lists-tab"

interface User {
  id: number
  username: string
  profilePicture: string
  followers: number
  following: number
  isCurrentUser: boolean
  joinedDate: string
}

interface ProfileTabsProps {
  user: User
  onListClick?: (list: any) => void
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function ProfileTabs({ user, onListClick, activeTab = "activity", onTabChange }: ProfileTabsProps) {
  return (
    <div className="mt-6 animate-in fade-in-0 slide-in-from-left-4 duration-300">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          {/* <TabsTrigger value="history">Listening History</TabsTrigger> */}
          <TabsTrigger value="lists">Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <ActivityTab user={user} />
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <FavoritesTab user={user} />
        </TabsContent>

        {/* <TabsContent value="history" className="mt-6">
          <ListeningHistoryTab user={user} />
        </TabsContent> */}

        <TabsContent value="lists" className="mt-6">
          <ListsTab user={user} onListClick={onListClick} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
