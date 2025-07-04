// /pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query

  if (!q || typeof q !== "string") {
    return res.status(400).json({ message: "Missing search query" })
  }

  try {
    const [music, artists, albums, users] = await Promise.all([
      prisma.musics.findMany({
        where: { title: { contains: q, mode: "insensitive" } },
        include: {
          albums: {
            select: {
              id: true,
              title: true,
            },
          },
          artists: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.artists.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
      }),
      prisma.albums.findMany({
        where: { title: { contains: q, mode: "insensitive" } },
        include: {
          artists: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.users.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
      }),
    ])

    res.status(200).json({ music, artists, albums, users })
  } catch (err) {
    console.error("Search error:", err)
    res.status(500).json({ message: "Internal server error" })
  }
}
