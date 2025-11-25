import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/User";

export interface AuthRequest extends Request {
  userEmail?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.substring(7);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Configuración del servidor faltante" });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.userEmail = decoded.email;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}