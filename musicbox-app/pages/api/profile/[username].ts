import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username } = req.query;

  if (!username || Array.isArray(username)) {
    return res.status(400).json({ message: "Invalid or missing username" });
  }

  try {
    const user = await prisma.users.findFirst({
      where: { nome: String(username) },
      include: {
        follows_follows_following_user_idTousers: true, // seguidores
        follows_follows_followed_user_idTousers: true,  // seguindo
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      id: user.id,
      username: user.nome,
      profilePicture: "/placeholder.svg",
      followers: user.follows_follows_following_user_idTousers.length,
      following: user.follows_follows_followed_user_idTousers.length,
      isCurrentUser: false, // ajustar com autenticação depois
      joinedDate: user.created_at?.toISOString().split("T")[0] || "",
    };

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Profile API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
