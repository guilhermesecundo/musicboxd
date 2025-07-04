import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query;
  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const albums = await prisma.user_favorite_albums.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        albums: {
          include: {
            artists: true,
            musics: true,
          },
        },
      },
    });

    const data = albums.map((fav) => {
      const album = fav.albums;
      return {
        id: album.id,
        title: album.title,
        artist: album.artists.name,
        year: album.release_date.getFullYear(),
        tracks: album.musics.length,
        rating: 5, // ajuste conforme dados reais
        cover: "/placeholder.svg",
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
