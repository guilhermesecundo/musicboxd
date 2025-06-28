// pages/api/lists/[id]/tracks/index.ts
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const playlistId = parseInt(req.query.id as string)

  if (isNaN(playlistId)) {
    return res.status(400).json({ error: "Invalid playlist id" })
  }

  if (req.method === "GET") {
    try {
      const playlistTracks = await prisma.playlist_musics.findMany({
        where: { playlist_id: playlistId },
        orderBy: { ordem: "asc" },
        include: {
          musics: {
            include: {
              albums: true,
              artists: true,
            },
          },
        },
      })

      const tracks = playlistTracks.map(({ musics }) => ({
        id: musics.id,
        title: musics.title,
        artist: musics.artists.name,
        album: musics.albums.title,
        albumId: musics.album_id,
        duration: `${Math.floor(musics.duration / 60)}:${(musics.duration % 60)
          .toString()
          .padStart(2, "0")}`,
        coverArt: "/placeholder.svg",
        isLiked: false,
      }))

      return res.status(200).json(tracks)
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
