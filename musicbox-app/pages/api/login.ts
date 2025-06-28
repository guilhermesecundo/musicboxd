// /pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Aqui você pode gerar um token JWT ou setar um cookie se quiser login persistente
    return res.status(200).json({
      message: "Login successful",
      userId: user.id,
      name: user.name,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
}
