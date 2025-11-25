import { Router } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../data/userRepo";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email y password son requeridos" });
  }

  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Configuración del servidor faltante" });
  }

  const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });
  return res.json({ token });
});

export default router;