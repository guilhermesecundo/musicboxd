"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, CheckCircle, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MusicPlayer } from "@/components/music-player"

interface SearchAllTabProps {
  results: {
    music: any[]
    artists: any[]
    albums: any[]
    users: any[]
  }
}

export function SearchAllTab({ results }: SearchAllTabProps) {
  // Função para formatar duração de música (segundos => mm:ss)
  function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-8">
      {/* Music */}
      {results.music.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Music</h2>
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.music.slice(0, 8).map((track) => {
              const releaseYear = track.release_date
                ? new Date(track.release_date).getFullYear()
                : "Unknown"
              const albumId = track.albums?.id
              const artistName = track.artists?.name || "Unknown Artist"

              return (
                <Link key={track.id} href={`/album/${albumId}`}>
                  <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="space-y-1">
                        <h3 className="font-medium truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{artistName}</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDuration(track.duration)}</span>
                          <span>•</span>
                          <span>{releaseYear}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Artists */}
      {results.artists.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Artists</h2>
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.artists.slice(0, 8).map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.name}`}>
                <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-medium">{artist.name}</h3>
                        {artist.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">Artist</p>
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {(artist.genres ?? []).slice(0, 2).map((genre: string) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {results.albums.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Albums</h2>
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.albums.slice(0, 8).map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium truncate">{album.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{album.release_date ? new Date(album.release_date).getFullYear() : "Unknown"}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>{album.artists.name ?? "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Users */}
      {results.users.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.users.slice(0, 8).map((user) => (
              <Link key={user.id} href={`/profile/${user.name}`}>
                <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                      <Image
                        src={user.profilePicture || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-medium">{user.name}</h3>
                        {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span>{(user.followers ?? 0).toLocaleString()} followers</span>
                        <span>•</span>
                        <span>{(user.following ?? 0).toLocaleString()} following</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
