"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Play,
  Heart,
  Share,
  MoreHorizontal,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  Headphones,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Artist {
  id: string
  name: string
  bio: string
  image: string
  backgroundImage: string
  genres: string[]
  monthlyListeners: string
  followers: string
  verified: boolean
  formed: string
  location: string
  website: string
  socialMedia: {
    instagram: string
    twitter: string
    spotify: string
  }
}

interface ArtistHeaderProps {
  artist: Artist
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Card className="overflow-hidden mb-6">
      {/* Background Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-500 to-pink-500">
        <Image
          src={artist.backgroundImage || "/placeholder.svg"}
          alt={`${artist.name} background`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Artist Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Artist Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden flex-shrink-0">
              <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
            </div>

            {/* Artist Details */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                {artist.verified && <CheckCircle className="h-6 w-6 text-blue-400" />}
                <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">Artist</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{artist.name}</h1>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Bio and Details */}
          <div className="flex-1 space-y-6">
            {/* Action Buttons */}
            

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
            </div>
          </div>

          {/* Right Column - Artist Info */}
          
        </div>
      </div>
    </Card>
  )
}
