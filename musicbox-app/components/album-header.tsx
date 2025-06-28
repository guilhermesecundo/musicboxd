"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Disc, Play, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlbumOptionsMenu } from "@/components/album-options-menu"

interface Artist {
  id: number
  name: string
}

interface Review {
  id: number
  rate?: number | null
  comment?: string | null
  created_at?: string | null
  user_id: number
  music_id: number
}

interface Music {
  id: number
  title: string
  release_date: string
  duration: number
  artist_id: number
  album_id: number
  artists: Artist
  reviews: Review[]
}

interface Album {
  id: number
  title: string
  release_date: string
  artists: Artist
  musics: Music[]
}

interface AlbumHeaderProps {
  albumId: number
}

export function AlbumHeader({ albumId }: AlbumHeaderProps) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlbum() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/albums/${albumId}`)
        if (!res.ok) {
          throw new Error(`Error fetching album: ${res.status}`)
        }
        const data: Album = await res.json()
        setAlbum(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAlbum()
  }, [albumId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) return <p>Loading album...</p>
  if (error) return <p>Error: {error}</p>
  if (!album) return <p>Album not found</p>

  return (
    <div className="relative">
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 py-8">
        {/* Album Cover */}
        <div className="w-full max-w-xs">
          <Image
            src="/placeholder.svg" // você pode substituir por album.capa se existir
            alt={album.title}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Album Info */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                <Disc className="h-3 w-3 mr-1" />
                Album
              </Badge>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {album.title}
            </h1>

            <div className="flex items-center gap-4 text-lg mb-4">
              <Link
                href={`/artist/${album.artists.id}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {album.artists.name}
              </Link>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(album.release_date)}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {/* Duration total calculada pela soma das durações das músicas */}
                {formatDuration(album.musics.reduce((sum, m) => sum + m.duration, 0))}
              </div>
              <span>•</span>
              <span>{album.musics.length} tracks</span>
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
            <Button variant="outline" size="lg" onClick={() => alert("Liked!")}>
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>
            <AlbumOptionsMenu album={album} onLike={() => {}} onFavorite={() => {}} onReview={() => {}} onShare={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Função auxiliar para formatar duração (em segundos) em mm:ss
function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
