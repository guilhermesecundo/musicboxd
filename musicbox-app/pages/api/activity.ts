import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

function timeAgo(date: Date | null | undefined): string {
  if (!date) return "some time ago"
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

async function getActivitiesByUserIds(userIds: number[]) {
  if (userIds.length === 0) return []

  // Reviews
  const reviews = await prisma.reviews.findMany({
    where: { user_id: { in: userIds } },
    orderBy: { created_at: "desc" },
    take: 5,
    include: {
      musics: {
        include: {
          albums: true,
          artists: true,
        },
      },
      users: true, // user que fez a review
    },
  })

  // Favoritos artistas
  const favoriteArtists = await prisma.user_favorite_artists.findMany({
    where: { user_id: { in: userIds } },
    orderBy: { artist_id: "desc" },
    take: 5,
    include: {
      artists: true,
      users: true, // usuário que favoritou
    },
  })

  // Playlists criadas
  const playlists = await prisma.playlists.findMany({
  where: { user_id: { in: userIds } },
  orderBy: { created_at: "desc" },
  take: 5,
  include: {
    users: true,
    playlist_musics: true,
  },
})

  // Favoritos músicas
  const favoriteMusics = await prisma.user_favorite_musics.findMany({
    where: { user_id: { in: userIds } },
    orderBy: { music_id: "desc" },
    take: 5,
    include: {
      musics: {
        include: {
          albums: true,
          artists: true,
        },
      },
      users: true, // usuário que favoritou a música
    },
  })

  const activities: any[] = []

  for (const review of reviews) {
    activities.push({
      id: review.id,
      user: {
        id: review.users.id,
        name: review.users.name,
        username: review.users.email.split("@")[0], // Não tem username? usa email prefix
        avatar: null, // FIXME: Não tem avatar no schema, deixar null ou placeholder
      },
      action: "reviewed",
      target: review.musics.albums.title,
      review: review.comment,
      createdAt: review.created_at,
      type: "review",
      music: {
        title: review.musics.title,
        album: review.musics.albums.title,
        artist: review.musics.artists.name,
        cover: null,
      },
    })
  }

  for (const fav of favoriteArtists) {
    activities.push({
      id: fav.artist_id,
      user: {
        id: fav.users.id,
        name: fav.users.name,
        username: fav.users.email.split("@")[0],
        avatar: null,
      },
      action: "favorited artist",
      target: fav.artists.name,
      createdAt: null,
      type: "favorite_artist",
      artist: {
        name: fav.artists.name,
        cover: null,
      },
    })
  }

  for (const playlist of playlists) {
    activities.push({
      id: playlist.id,
      user: {
        id: playlist.users.id,
        name: playlist.users.name,
        username: playlist.users.email.split("@")[0],
        avatar: null,
      },
      action: "added playlist",
      target: playlist.name,
      createdAt: playlist.created_at,
      type: "playlist",
      playlist: {
        title: playlist.name,
        trackCount: playlist.playlist_musics.length,
        cover: null,
      },
    })
  }

  for (const favMusic of favoriteMusics) {
    activities.push({
      id: favMusic.music_id,
      user: {
        id: favMusic.users.id,
        name: favMusic.users.name,
        username: favMusic.users.email.split("@")[0],
        avatar: null,
      },
      action: "liked music",
      target: `${favMusic.musics.title} by ${favMusic.musics.artists.name}`,
      createdAt: null,
      type: "favorite_music",
      music: {
        title: favMusic.musics.title,
        artist: favMusic.musics.artists.name,
        album: favMusic.musics.albums.title,
        cover: null,
      },
    })
  }

  return activities
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" })

  const scope = (req.query.scope as string) || "general"

  // userId só é obrigatório para scope "followed"
  let userId: number | null = null
  if (scope === "followed") {
    userId = parseInt(req.query.userId as string)
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid or missing user ID for followed scope" })
    }
  }

  try {
    let userIds: number[] = []

    if (scope === "followed" && userId !== null) {
      const follows = await prisma.follows.findMany({
        where: { following_user_id: userId },
        select: { followed_user_id: true },
      })
      userIds = follows.map(f => f.followed_user_id)
      if (userIds.length === 0) return res.status(200).json([])
    } else {
      // General scope: pega até 50 usuários quaisquer
      const users = await prisma.users.findMany({
        select: { id: true },
        take: 50,
      })
      userIds = users.map(u => u.id)
    }

    const activities = await getActivitiesByUserIds(userIds)

    activities.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return timeB - timeA
    })

    return res.status(200).json(activities.slice(0, 10))
  } catch (error) {
    console.error("Activity API error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
