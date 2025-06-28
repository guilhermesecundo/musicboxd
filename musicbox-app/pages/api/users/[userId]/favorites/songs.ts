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
    // Ajuste a consulta conforme seu schema para pegar músicas favoritas do usuário
    const musics = await prisma.user_favorite_musics.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        musics: {
          include: {
            artists: true,
            albums: true,
          },
        },
      },
    });

    const data = musics.map((fav) => {
      const music = fav.musics;
      return {
        id: music.id,
        title: music.title,
        artist: music.artists.name,
        album: music.albums.title,
        year: music.release_date.getFullYear(),
        duration: formatDuration(music.duration), // implemente a função se quiser formatar segundos para mm:ss
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

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
