"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchAlbumsTabProps {
  albums: any[]
}

export function SearchAlbumsTab({ albums }: SearchAlbumsTabProps) {
  return (
    <div className="space-y-6">
      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Link key={album.id} href={`/album/${album.id}`}>
            <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={album.cover || "/placeholder.svg"}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white text-black"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium truncate">{album.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{album.artist}</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(album.releaseDate).getFullYear()}</span>
                    <span>•</span>
                    <span>{album.trackCount} tracks</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{album.rating}</span>
                    </div>
                    <div className="flex gap-1">
                      {album.genres.slice(0, 2).map((genre: string) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* List View */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">All Albums</h3>
        {albums.map((album) => (
          <Link key={`list-${album.id}`} href={`/album/${album.id}`}>
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={album.cover || "/placeholder.svg"}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{album.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{album.artist}</p>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(album.releaseDate).getFullYear()}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{album.trackCount} tracks</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{album.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                {album.genres.slice(0, 2).map((genre: string) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>

              <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}