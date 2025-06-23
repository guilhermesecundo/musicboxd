"use client"

import { useState } from "react"
import { Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicPlayer } from "@/components/music-player"
import { MusicOptionsMenu } from "@/components/music-options-menu"
import { ReviewDialog } from "@/components/review-dialog"
import { AddToHistoryDialog } from "@/components/add-to-history-dialog"
import { CreateListDialog } from "@/components/create-list-dialog"

interface Track {
  id: number
  title: string
  duration: string
  preview: string
  explicit: boolean
  plays: string
}

interface Album {
  id: string
  title: string
  artist: string
  artistId: string
  cover: string
  tracks: Track[]
}

interface AlbumTracksProps {
  album: Album
}

export function AlbumTracks({ album }: AlbumTracksProps) {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [createListDialogOpen, setCreateListDialogOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const handleAddToList = (listId: string, trackTitle: string) => {
    console.log(`Added ${trackTitle} to list ${listId}`)
  }

  const handleLike = (trackTitle: string) => {
    console.log("Liked track:", trackTitle)
  }

  const handleFavorite = (trackTitle: string) => {
    console.log("Added to favorites:", trackTitle)
  }

  const handleShare = (trackTitle: string) => {
    console.log("Share track:", trackTitle)
  }

  const handleReview = (track: Track) => {
    setSelectedTrack(track)
    setReviewDialogOpen(true)
  }

  const handleAddToHistory = (track: Track) => {
    setSelectedTrack(track)
    setHistoryDialogOpen(true)
  }

  const handleCreateList = () => {
    setCreateListDialogOpen(true)
  }

  const handleSubmitReview = (reviewData: { rating: number; comment: string }) => {
    if (selectedTrack) {
      console.log(`Review submitted for ${selectedTrack.title}:`, reviewData)
    }
  }

  const handleSubmitHistory = (historyData: any) => {
    if (selectedTrack) {
      console.log(`History added for ${selectedTrack.title}:`, historyData)
    }
  }

  const handleCreateListSubmit = (listData: any) => {
    console.log("New list created:", listData)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Tracks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {album.tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-8 text-center text-sm text-muted-foreground font-medium">{index + 1}</div>

                <div className="flex-1 min-w-0">
                  <MusicPlayer
                    music={{
                      title: track.title,
                      artist: album.artist,
                      album: album.title,
                      cover: album.cover,
                      preview: track.preview,
                      artistId: album.artistId,
                    }}
                  >
                    <div className="cursor-pointer hover:text-primary transition-colors">
                      <p className="font-medium truncate">{track.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{track.plays} plays</span>
                        {track.explicit && <span className="bg-muted px-1 rounded text-xs">E</span>}
                      </div>
                    </div>
                  </MusicPlayer>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {track.duration}
                  </div>

                  <MusicPlayer
                    music={{
                      title: track.title,
                      artist: album.artist,
                      album: album.title,
                      cover: album.cover,
                      preview: track.preview,
                      artistId: album.artistId,
                    }}
                  >
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4" />
                    </Button>
                  </MusicPlayer>

                  <MusicOptionsMenu
                    music={{
                      title: track.title,
                      artist: album.artist,
                      album: album.title,
                      cover: album.cover,
                      preview: track.preview,
                      artistId: album.artistId,
                    }}
                    onAddToList={(listId) => handleAddToList(listId, track.title)}
                    onLike={() => handleLike(track.title)}
                    onFavorite={() => handleFavorite(track.title)}
                    onShare={() => handleShare(track.title)}
                    onReview={() => handleReview(track)}
                    onAddToHistory={() => handleAddToHistory(track)}
                    onCreateList={handleCreateList}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      {selectedTrack && (
        <ReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          music={{
            title: selectedTrack.title,
            artist: album.artist,
            album: album.title,
            cover: album.cover,
            preview: selectedTrack.preview,
          }}
          onSubmitReview={handleSubmitReview}
          type="music"
        />
      )}

      {/* Add to History Dialog */}
      {selectedTrack && (
        <AddToHistoryDialog
          open={historyDialogOpen}
          onOpenChange={setHistoryDialogOpen}
          music={{
            title: selectedTrack.title,
            artist: album.artist,
            album: album.title,
            cover: album.cover,
            preview: selectedTrack.preview,
          }}
          onAddToHistory={handleSubmitHistory}
        />
      )}

      {/* Create List Dialog */}
      <CreateListDialog
        open={createListDialogOpen}
        onOpenChange={setCreateListDialogOpen}
        onCreateList={handleCreateListSubmit}
      />
    </>
  )
}
