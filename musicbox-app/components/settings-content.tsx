"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountTab } from "@/components/settings-tabs/account-tab"
import { PrivacyTab } from "@/components/settings-tabs/privacy-tab"
import { NotificationsTab } from "@/components/settings-tabs/notifications-tab"
import { MusicTab } from "@/components/settings-tabs/music-tab"
import { AppearanceTab } from "@/components/settings-tabs/appearance-tab"

export function SettingsContent() {
  return (
    <Tabs defaultValue="account" className="w-full">
      {/* <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList> */}

      <TabsContent value="account" className="mt-6">
        <AccountTab />
      </TabsContent>

      {/* <TabsContent value="privacy" className="mt-6">
        <PrivacyTab />
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="music" className="mt-6">
        <MusicTab />
      </TabsContent>

      <TabsContent value="appearance" className="mt-6">
        <AppearanceTab />
      </TabsContent> */}
    </Tabs>
  )
}
