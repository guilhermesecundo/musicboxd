"use client"

import Image from "next/image"
import { Play, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MusicPlayer } from "@/components/music-player"

interface SearchMusicTabProps {
  music: any[]
}

export function SearchMusicTab({ music }: SearchMusicTabProps) {
  return (
    <div className="space-y-6">
      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {music.map((track) => (
          <MusicPlayer key={track.id} music={track}>
            <Card className="group hover:bg-muted/50 transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={track.cover || "/placeholder.svg"}
                    alt={track.title}
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
                  <h3 className="font-medium truncate">{track.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.album}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{track.duration}</span>
                    <span>{track.plays}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MusicPlayer>
        ))}
      </div>

      {/* List View Alternative */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">All Songs</h3>
        {music.map((track, index) => (
          <MusicPlayer key={`list-${track.id}`} music={track}>
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-center w-8 text-sm text-muted-foreground group-hover:hidden">
                {index + 1}
              </div>
              <Button size="icon" variant="ghost" className="w-8 h-8 hidden group-hover:flex">
                <Play className="h-4 w-4" />
              </Button>

              <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                <Image src={track.cover || "/placeholder.svg"} alt={track.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{track.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </div>

              <div className="hidden md:block text-sm text-muted-foreground">{track.album}</div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <Heart className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground w-12 text-right">{track.duration}</span>
                <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </MusicPlayer>
        ))}
      </div>
    </div>
  )
}
