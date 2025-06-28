// pages/api/users/[userId]/activities.ts
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const userId = parseInt(req.query.userId as string)
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" })
  }

  try {
    // Puxar atividades diferentes e normalizar para formato comum

    // Reviews do usuário (activity type: "review")
    const reviews = await prisma.reviews.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      take: 5,
      include: {
        musics: {
          include: {
            albums: true,
            artists: true,
          },
        },
      },
    })

    // Favoritos artistas (type: "favorite")
    const favoriteArtists = await prisma.user_favorite_artists.findMany({
      where: { user_id: userId },
      orderBy: { artist_id: "desc" },
      take: 5,
      include: { artists: true },
    })

    // Playlists criadas pelo usuário (type: "list")
    const playlists = await prisma.playlists.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      take: 5,
    })

    // Favoritos músicas (type: "like")
    const favoriteMusics = await prisma.user_favorite_musics.findMany({
      where: { user_id: userId },
      orderBy: { music_id: "desc" },
      take: 5,
      include: {
        musics: {
          include: {
            albums: true,
            artists: true,
          },
        },
      },
    })

    // Normalizar cada tipo para o formato esperado pelo frontend
    const activityList = []

    // Reviews
    for (const review of reviews) {
      activityList.push({
        id: review.id,
        action: "reviewed",
        target: review.musics.albums.title,
        review: review.comment,
        time: timeAgo(review.created_at),
        type: "review",
      })
    }

    // Favoritos artistas
    for (const fav of favoriteArtists) {
      activityList.push({
        id: fav.artist_id,
        action: "favorited artist",
        target: fav.artists.name,
        time: "some time ago", // ou calcule tempo real com created_at se disponível
        type: "favorite",
      })
    }

    // Playlists criadas
    for (const playlist of playlists) {
      activityList.push({
        id: playlist.id,
        action: "added to list",
        target: playlist.name,
        album: "", // opcional, ou deixe vazio
        time: timeAgo(playlist.created_at),
        type: "list",
      })
    }

    // Favoritos músicas (likes)
    for (const favMusic of favoriteMusics) {
      activityList.push({
        id: favMusic.music_id,
        action: "liked",
        target: `${favMusic.musics.title} by ${favMusic.musics.artists.name}`,
        time: "some time ago",
        type: "like",
      })
    }

    // Ordena tudo pelo tempo decrescente (mais recente primeiro)
    activityList.sort((a, b) => {
      const dateA = new Date(a.time).getTime()
      const dateB = new Date(b.time).getTime()
      return dateB - dateA
    })

    return res.status(200).json(activityList.slice(0, 10)) // limita a 10 atividades
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// Função simples para transformar date em string relativa
function timeAgo(date: Date | null | undefined): string {
  if (!date) return "some time ago"
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}
