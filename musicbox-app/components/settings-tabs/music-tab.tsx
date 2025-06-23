"use client"

import { useState } from "react"
import { Music, Volume2, Headphones, Radio, Shuffle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MusicTab() {
  const [settings, setSettings] = useState({
    // Playback Settings
    autoplay: true,
    crossfade: false,
    gaplessPlayback: true,
    normalizeVolume: true,

    // Quality Settings
    streamingQuality: "high",
    downloadQuality: "highest",

    // Discovery Settings
    showExplicitContent: true,
    autoAddToLibrary: false,
    smartShuffle: true,

    // Social Settings
    shareListening: true,
    showFriendActivity: true,

    // Audio Settings
    crossfadeDuration: [3],
    volumeLevel: [75],
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSliderChange = (setting: string, value: number[]) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Playback Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Playback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autoplay</Label>
              <p className="text-sm text-muted-foreground">Automatically play similar songs when your music ends</p>
            </div>
            <Switch checked={settings.autoplay} onCheckedChange={() => handleToggle("autoplay")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Crossfade</Label>
              <p className="text-sm text-muted-foreground">Fade between tracks for seamless listening</p>
            </div>
            <Switch checked={settings.crossfade} onCheckedChange={() => handleToggle("crossfade")} />
          </div>

          {settings.crossfade && (
            <div className="space-y-2 ml-6">
              <Label>Crossfade Duration: {settings.crossfadeDuration[0]}s</Label>
              <Slider
                value={settings.crossfadeDuration}
                onValueChange={(value) => handleSliderChange("crossfadeDuration", value)}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Gapless Playback</Label>
              <p className="text-sm text-muted-foreground">
                Remove gaps between tracks for albums meant to flow together
              </p>
            </div>
            <Switch checked={settings.gaplessPlayback} onCheckedChange={() => handleToggle("gaplessPlayback")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Normalize Volume</Label>
              <p className="text-sm text-muted-foreground">Keep volume levels consistent across different tracks</p>
            </div>
            <Switch checked={settings.normalizeVolume} onCheckedChange={() => handleToggle("normalizeVolume")} />
          </div>
        </CardContent>
      </Card>

      {/* Audio Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Audio Quality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="streamingQuality">Streaming Quality</Label>
            <Select
              value={settings.streamingQuality}
              onValueChange={(value) => handleSelectChange("streamingQuality", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (96 kbps) - Save data</SelectItem>
                <SelectItem value="normal">Normal (160 kbps) - Balanced</SelectItem>
                <SelectItem value="high">High (320 kbps) - Best quality</SelectItem>
                <SelectItem value="lossless">Lossless - Premium only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadQuality">Download Quality</Label>
            <Select
              value={settings.downloadQuality}
              onValueChange={(value) => handleSelectChange("downloadQuality", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal (160 kbps)</SelectItem>
                <SelectItem value="high">High (320 kbps)</SelectItem>
                <SelectItem value="highest">Highest Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Default Volume: {settings.volumeLevel[0]}%</Label>
            <Slider
              value={settings.volumeLevel}
              onValueChange={(value) => handleSliderChange("volumeLevel", value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Discovery & Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Discovery & Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Explicit Content</Label>
              <p className="text-sm text-muted-foreground">
                Include explicit tracks in search results and recommendations
              </p>
            </div>
            <Switch
              checked={settings.showExplicitContent}
              onCheckedChange={() => handleToggle("showExplicitContent")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-add to Library</Label>
              <p className="text-sm text-muted-foreground">Automatically save liked songs to your library</p>
            </div>
            <Switch checked={settings.autoAddToLibrary} onCheckedChange={() => handleToggle("autoAddToLibrary")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Shuffle className="h-4 w-4" />
                Smart Shuffle
              </Label>
              <p className="text-sm text-muted-foreground">Mix in recommended songs when shuffling playlists</p>
            </div>
            <Switch checked={settings.smartShuffle} onCheckedChange={() => handleToggle("smartShuffle")} />
          </div>
        </CardContent>
      </Card>

      {/* Social Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Social Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Listening Activity</Label>
              <p className="text-sm text-muted-foreground">Let friends see what you're currently listening to</p>
            </div>
            <Switch checked={settings.shareListening} onCheckedChange={() => handleToggle("shareListening")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Friend Activity</Label>
              <p className="text-sm text-muted-foreground">Display what your friends are listening to in your feed</p>
            </div>
            <Switch checked={settings.showFriendActivity} onCheckedChange={() => handleToggle("showFriendActivity")} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
