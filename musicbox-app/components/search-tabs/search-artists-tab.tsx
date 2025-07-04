"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchArtistsTabProps {
  artists: any[]
}

export function SearchArtistsTab({ artists }: SearchArtistsTabProps) {
  return (
    <div className="space-y-6">
      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <Card key={artist.id} className="group hover:bg-muted/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Link href={`/artist/${artist.id}`}>
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden cursor-pointer">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>

              <div className="space-y-2">
                <Link href={`/artist/${artist.id}`}>
                  <div className="flex items-center justify-center gap-2 cursor-pointer hover:text-primary">
                    <h3 className="font-semibold">{artist.name}</h3>
                    {artist.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                  </div>
                </Link>

                <p className="text-sm text-muted-foreground">Artist</p>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>{artist.monthlyListeners} monthly listeners</p>
                  <p>{artist.followers} followers</p>
                </div>

                <div className="flex flex-wrap justify-center gap-1">
                  {artist.genres.slice(0, 3).map((genre: string) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" className="mt-3">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List View */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">All Artists</h3>
        {artists.map((artist) => (
          <div
            key={`list-${artist.id}`}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Link href={`/artist/${artist.id}`}>
              <div className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer">
                <Image
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            <div className="flex-1">
              <Link href={`/artist/${artist.id}`}>
                <div className="flex items-center gap-2 mb-1 cursor-pointer hover:text-primary">
                  <h4 className="font-semibold">{artist.name}</h4>
                  {artist.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{artist.monthlyListeners} monthly listeners</span>
                <span>•</span>
                <span>{artist.followers} followers</span>
              </div>

              <div className="flex gap-1 mt-1">
                {artist.genres.slice(0, 3).map((genre: string) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
