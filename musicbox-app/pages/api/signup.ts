// /pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({ message: "User created", userId: user.id });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
}
