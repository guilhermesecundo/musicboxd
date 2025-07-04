// pages/api/albums/[albumId].ts

import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"  // importe do prisma singleton

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { albumId } = req.query

  // Validar que albumId existe e é uma string única
  if (!albumId || Array.isArray(albumId)) {
    return res.status(400).json({ error: "albumId is required and must be a single string" })
  }

  // Converter para inteiro
  const idNum = parseInt(albumId, 10)
  if (isNaN(idNum)) {
    return res.status(400).json({ error: "albumId must be a valid number" })
  }

  try {
    const album = await prisma.albums.findUnique({
      where: { id: idNum },
      include: {
        artists: true,
        musics: {
          include: {
            reviews: true,
            artists: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    })

    if (!album) {
      return res.status(404).json({ error: "Album not found" })
    }

    // Converter datas para string ISO para evitar problemas de serialização
    const albumResponse = {
      ...album,
      release_date: album.release_date.toISOString(),
      musics: album.musics.map(music => ({
        ...music,
        release_date: music.release_date.toISOString(),
        reviews: music.reviews.map(review => ({
          ...review,
          created_at: review.created_at ? review.created_at.toISOString() : null,
        })),
      })),
    }

    return res.status(200).json(albumResponse)
  } catch (error) {
    console.error("API error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
