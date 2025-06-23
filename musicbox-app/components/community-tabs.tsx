"use client"

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FriendsTab } from "@/components/community-tabs/friends-tab"
import { FollowedTab } from "@/components/community-tabs/followed-tab"
import { GeneralTab } from "@/components/community-tabs/general-tab"
import { Suspense } from "react"

export function CommunityTabs() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "friends"

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="followed">Following</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="mt-6">
          <FriendsTab />
        </TabsContent>

        <TabsContent value="followed" className="mt-6">
          <FollowedTab />
        </TabsContent>

        <TabsContent value="general" className="mt-6">
          <GeneralTab />
        </TabsContent>
      </Tabs>
    </Suspense>
  )
}
