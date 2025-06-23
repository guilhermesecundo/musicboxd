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
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Headphones className="h-4 w-4" />
                  <span>{artist.monthlyListeners} monthly listeners</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{artist.followers} followers</span>
                </div>
              </div>
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
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                <Play className="h-5 w-5 mr-2" />
                Play
              </Button>
              <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollowToggle}>
                <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

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
          <div className="lg:w-80 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Artist Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Active since:</span>
                  <span>{artist.formed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Social Media</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Instagram</span>
                  <span>{artist.socialMedia.instagram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Twitter</span>
                  <span>{artist.socialMedia.twitter}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Spotify</span>
                  <span className="text-xs font-mono">{artist.socialMedia.spotify}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  )
}
