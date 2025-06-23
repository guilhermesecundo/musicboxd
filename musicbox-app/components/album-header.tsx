"use client"

import Link from "next/link"
import { Calendar, Clock, Disc, Play, Heart, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlbumOptionsMenu } from "@/components/album-options-menu"
import Image from "next/image"

interface Album {
  id: string
  title: string
  artist: string
  artistId: string
  releaseDate: string
  cover: string
  backgroundImage: string
  genres: string[]
  duration: string
  trackCount: number
  label: string
  producer: string
  description: string
  rating: number
  reviewCount: number
  plays: string
  likes: string
}

interface AlbumHeaderProps {
  album: Album
}

export function AlbumHeader({ album }: AlbumHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleLike = () => {
    console.log("Liked album:", album.title)
  }

  const handleFavorite = () => {
    console.log("Added to favorites:", album.title)
  }

  const handleReview = () => {
    console.log("Review album:", album.title)
  }

  const handleShare = () => {
    console.log("Share album:", album.title)
  }

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={album.backgroundImage || "/placeholder.svg"}
          alt={album.title}
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 py-8">
        {/* Album Cover - Removed hover animations */}
        <div className="flex-shrink-0">
          <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
            <Image src={album.cover || "/placeholder.svg"} alt={album.title} fill className="object-cover" />
          </div>
        </div>

        {/* Album Info */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                <Disc className="h-3 w-3 mr-1" />
                Album
              </Badge>
              {album.genres.map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {album.title}
            </h1>

            <div className="flex items-center gap-4 text-lg mb-4">
              <Link href={`/artist/${album.artistId}`} className="font-semibold hover:text-primary transition-colors">
                {album.artist}
              </Link>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(album.releaseDate)}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {album.duration}
              </div>
              <span>•</span>
              <span>{album.trackCount} tracks</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{album.rating}</span>
                <span className="text-muted-foreground">({album.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{album.plays} plays</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{album.likes} likes</span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl">{album.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Label:</span> {album.label}
              </div>
              <div>
                <span className="font-semibold">Producer:</span> {album.producer}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              <Play className="h-5 w-5 mr-2" />
              Play Album
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>
            <AlbumOptionsMenu
              album={album}
              onLike={handleLike}
              onFavorite={handleFavorite}
              onReview={handleReview}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
