// pages/api/users/[userId]/favorites/artists.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const artists = await prisma.user_favorite_artists.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        artists: {
          include: {
            albums: true,
          },
        },
      },
    });

    const data = artists.map((fav) => {
      const artist = fav.artists;
      return {
        id: artist.id,
        name: artist.name,
        image: "/placeholder.svg", // ou artist.image se tiver
        albums: artist.albums.length,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching favorite artists:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
