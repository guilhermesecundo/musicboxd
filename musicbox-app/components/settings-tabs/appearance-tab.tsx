"use client"

import { useState } from "react"
import { Palette, Monitor, Sun, Moon, Type, Layout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

export function AppearanceTab() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    fontSize: "medium",
    compactMode: false,
    accentColor: "blue",
    language: "en",
  })

  const handleSelectChange = (setting: string, value: string) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const accentColors = [
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Red", value: "red", color: "bg-red-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="flex items-center gap-2 justify-start"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2 justify-start"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className="flex items-center gap-2 justify-start"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="grid grid-cols-3 gap-3">
              {accentColors.map((color) => (
                <Button
                  key={color.value}
                  variant={settings.accentColor === color.value ? "default" : "outline"}
                  onClick={() => handleSelectChange("accentColor", color.value)}
                  className="flex items-center gap-2 justify-start"
                >
                  <div className={`w-4 h-4 rounded-full ${color.color}`} />
                  {color.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select value={settings.fontSize} onValueChange={(value) => handleSelectChange("fontSize", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Layout Density</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={!settings.compactMode ? "default" : "outline"}
                onClick={() => handleSelectChange("compactMode", "false")}
                className="flex items-center gap-2 justify-start"
              >
                <Layout className="h-4 w-4" />
                Comfortable
              </Button>
              <Button
                variant={settings.compactMode ? "default" : "outline"}
                onClick={() => handleSelectChange("compactMode", "true")}
                className="flex items-center gap-2 justify-start"
              >
                <Type className="h-4 w-4" />
                Compact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Display Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg" />
              <div>
                <h3 className="font-medium">Sample Song Title</h3>
                <p className="text-sm text-muted-foreground">Sample Artist</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This is how your interface will look with the current settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
