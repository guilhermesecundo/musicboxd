"use client"

import { useState } from "react"
import { Bell, Heart, MessageCircle, UserPlus, Music, Settings, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "liked your review of 'Midnights'",
    time: "2 minutes ago",
    read: false,
    link: "/profile/johndoe",
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Mike Chen",
      username: "mikechen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "started following you",
    time: "15 minutes ago",
    read: false,
    link: "/profile/mikechen",
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "commented on your playlist 'Summer Vibes'",
    time: "1 hour ago",
    read: true,
    link: "/profile/johndoe",
  },
  {
    id: 4,
    type: "release",
    content: "Taylor Swift released a new album 'The Tortured Poets Department'",
    time: "2 hours ago",
    read: true,
    link: "/artist/taylor-swift",
  },
  {
    id: 5,
    type: "like",
    user: {
      name: "Alex Rodriguez",
      username: "alexr",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "liked your playlist 'Indie Discoveries'",
    time: "3 hours ago",
    read: true,
    link: "/profile/johndoe",
  },
]

export function NotificationsDropdown() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "release":
        return <Music className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80" sideOffset={8}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/settings?tab=notifications")}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notificationList.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                }`}
                onClick={() => (window.location.href = notification.link)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {notification.user ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.name}
                        />
                        <AvatarFallback>
                          {notification.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm">
                          {notification.user && <span className="font-medium">{notification.user.name} </span>}
                          <span className={notification.user ? "" : "font-medium"}>{notification.content}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>

                      <div className="flex items-center gap-1 ml-2">
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notificationList.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/notifications")}>
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
