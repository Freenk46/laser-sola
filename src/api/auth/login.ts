import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "/shared/api/mongoClient";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export default async function handler(req: Request, res: Response) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("laserSola");

        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { id: user._id, email: user.email };

        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

        // Set refresh token in HttpOnly cookie
        res.setHeader("Set-Cookie", [
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`,
        ]);

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
