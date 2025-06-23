// pages/api/users/[userId]/playlists.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const parsedUserId = parseInt(userId);

  try {
    if (req.method === "GET") {
      const playlists = await prisma.playlists.findMany({
        where: {
          user_id: parsedUserId,
        },
        include: {
          playlist_musics: true, // relação correta
        },
        orderBy: {
          created_at: "desc",
        },
      });

      const result = playlists.map((playlist) => ({
        id: playlist.id,
        title: playlist.nome,
        description: playlist.descricao,
        trackCount: playlist.playlist_musics.length,
        isPublic: playlist.publica ?? true, // ajuste conforme schema
        coverImages: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
        ],
        createdAt: new Date(playlist.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        likes: 0, // placeholder (adicione depois no schema)
      }));

      return res.status(200).json(result);
    }

    if (req.method === "POST") {
      const { title, description, isPublic } = req.body;

      if (!title || !description || typeof isPublic !== "boolean") {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newList = await prisma.playlists.create({
        data: {
          nome: title,
          descricao: description,
          publica: isPublic,
          user_id: parsedUserId,
        },
      });

      return res.status(201).json(newList);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
