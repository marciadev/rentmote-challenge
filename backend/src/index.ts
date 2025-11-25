import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OK", message: "Auth API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});