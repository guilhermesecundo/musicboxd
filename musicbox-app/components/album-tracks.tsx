"use client"

import React from "react"

interface Track {
  id: number
  title: string
  duration: number
}

interface Album {
  title: string
  tracks?: Track[]
}

interface AlbumTracksProps {
  album: Album
}

export function AlbumTracks({ album }: AlbumTracksProps) {
  if (!album || !album.tracks) return <p>Loading tracks...</p>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{album.title} - Tracks</h2>
      <div className="space-y-2">
        {album.tracks.length === 0 && (
          <p>No tracks available for this album.</p>
        )}
        {album.tracks.map((track) => (
          <div
            key={track.id}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <span>{track.title}</span>
            <span>{formatDuration(track.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
