import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { findUserByEmail, toPublicUser } from "../data/userRepo";

const router = Router();

router.get("/profile", authMiddleware, async (req: AuthRequest, res) => {
  if (!req.userEmail) {
    return res.status(401).json({ message: "No autenticado" });
  }
  const user = await findUserByEmail(req.userEmail);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.json({ user: toPublicUser(user) });
});

export default router;