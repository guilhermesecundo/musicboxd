"use client"

import { useState } from "react"
import { Shield, Eye, Users, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrivacyTab() {
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    showListeningActivity: true,
    showFavorites: true,
    showPlaylists: true,
    allowMessages: true,
    showOnlineStatus: true,
    dataCollection: true,
    personalizedAds: false,
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) => handleSelectChange("profileVisibility", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view your profile</SelectItem>
                <SelectItem value="friends">Friends Only - Only friends can view your profile</SelectItem>
                <SelectItem value="private">Private - Only you can view your profile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Listening Activity</Label>
                <p className="text-sm text-muted-foreground">Allow others to see what you're currently listening to</p>
              </div>
              <Switch
                checked={settings.showListeningActivity}
                onCheckedChange={() => handleToggle("showListeningActivity")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Favorites</Label>
                <p className="text-sm text-muted-foreground">Display your favorite artists and songs on your profile</p>
              </div>
              <Switch checked={settings.showFavorites} onCheckedChange={() => handleToggle("showFavorites")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Playlists</Label>
                <p className="text-sm text-muted-foreground">Make your public playlists visible to others</p>
              </div>
              <Switch checked={settings.showPlaylists} onCheckedChange={() => handleToggle("showPlaylists")} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Direct Messages</Label>
              <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
            </div>
            <Switch checked={settings.allowMessages} onCheckedChange={() => handleToggle("allowMessages")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Online Status</Label>
              <p className="text-sm text-muted-foreground">Display when you're online to your friends</p>
            </div>
            <Switch checked={settings.showOnlineStatus} onCheckedChange={() => handleToggle("showOnlineStatus")} />
          </div>
        </CardContent>
      </Card>

      {/* Data & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Allow MusicBox to collect usage data to improve the service
              </p>
            </div>
            <Switch checked={settings.dataCollection} onCheckedChange={() => handleToggle("dataCollection")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Personalized Advertisements</Label>
              <p className="text-sm text-muted-foreground">Show ads based on your music preferences and activity</p>
            </div>
            <Switch checked={settings.personalizedAds} onCheckedChange={() => handleToggle("personalizedAds")} />
          </div>
        </CardContent>
      </Card>

      {/* Blocked Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Blocked Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blocked users</h3>
            <p className="text-muted-foreground">
              Users you block will appear here. They won't be able to see your profile or contact you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
