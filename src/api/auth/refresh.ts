import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES_IN = "15m";

export default async function handler(req: Request, res: Response) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
        const payload = jwt.verify(refreshToken, JWT_SECRET) as { id: string; email: string };

        const newAccessToken = jwt.sign(
            { id: payload.id, email: payload.email },
            JWT_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Refresh token error:", error);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
}
