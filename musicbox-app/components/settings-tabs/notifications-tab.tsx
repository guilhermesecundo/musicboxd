"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone, Volume2, Heart, MessageCircle, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationsTab() {
  const [settings, setSettings] = useState({
    // Push Notifications
    pushNotifications: true,
    emailNotifications: true,

    // Activity Notifications
    newFollowers: true,
    friendActivity: true,
    likes: true,
    comments: true,
    mentions: true,

    // Music Notifications
    newReleases: true,
    recommendations: true,
    playlistUpdates: true,

    // Frequency Settings
    emailFrequency: "daily",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="space-y-6">
      {/* General Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch checked={settings.pushNotifications} onCheckedChange={() => handleToggle("pushNotifications")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch checked={settings.emailNotifications} onCheckedChange={() => handleToggle("emailNotifications")} />
          </div>

          {settings.emailNotifications && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="emailFrequency">Email Frequency</Label>
              <Select
                value={settings.emailFrequency}
                onValueChange={(value) => handleSelectChange("emailFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Social Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Followers</Label>
              <p className="text-sm text-muted-foreground">When someone starts following you</p>
            </div>
            <Switch checked={settings.newFollowers} onCheckedChange={() => handleToggle("newFollowers")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Friend Activity</Label>
              <p className="text-sm text-muted-foreground">When friends rate music or create playlists</p>
            </div>
            <Switch checked={settings.friendActivity} onCheckedChange={() => handleToggle("friendActivity")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Likes
              </Label>
              <p className="text-sm text-muted-foreground">When someone likes your reviews or playlists</p>
            </div>
            <Switch checked={settings.likes} onCheckedChange={() => handleToggle("likes")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments
              </Label>
              <p className="text-sm text-muted-foreground">When someone comments on your posts</p>
            </div>
            <Switch checked={settings.comments} onCheckedChange={() => handleToggle("comments")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mentions</Label>
              <p className="text-sm text-muted-foreground">When someone mentions you in a post or comment</p>
            </div>
            <Switch checked={settings.mentions} onCheckedChange={() => handleToggle("mentions")} />
          </div>
        </CardContent>
      </Card>

      {/* Music Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Music Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Releases</Label>
              <p className="text-sm text-muted-foreground">When artists you follow release new music</p>
            </div>
            <Switch checked={settings.newReleases} onCheckedChange={() => handleToggle("newReleases")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recommendations</Label>
              <p className="text-sm text-muted-foreground">Weekly personalized music recommendations</p>
            </div>
            <Switch checked={settings.recommendations} onCheckedChange={() => handleToggle("recommendations")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Playlist Updates</Label>
              <p className="text-sm text-muted-foreground">When playlists you follow are updated</p>
            </div>
            <Switch checked={settings.playlistUpdates} onCheckedChange={() => handleToggle("playlistUpdates")} />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">Pause notifications during specified hours</p>
            </div>
            <Switch checked={settings.quietHours} onCheckedChange={() => handleToggle("quietHours")} />
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <Select value={settings.quietStart} onValueChange={(value) => handleSelectChange("quietStart", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <Select value={settings.quietEnd} onValueChange={(value) => handleSelectChange("quietEnd", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
