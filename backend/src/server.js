require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/database");
const { Artisan, Metier } = require("./models");

const app = express();

/**
 * Sécurité HTTP (headers)
 */
app.use(helmet());

/**
 * Limitation du nombre de requêtes (anti-abus / brute force léger)
 */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // 200 requêtes par IP sur 15 minutes
  })
);

/**
 * CORS : autoriser uniquement le frontend local
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://trouve-ton-artisan-navy.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // autorise les requêtes sans origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

/**
 * Test API
 */
app.get("/", (req, res) => {
  res.json({ status: "API OK" });
});

/**
 * Connexion DB (log au démarrage)
 */
console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_PORT =", process.env.DB_PORT);
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_USER =", process.env.DB_USER);

sequelize
  .authenticate()
  .then(() => console.log("Connexion MySQL OK"))
  .catch((err) => console.error("Erreur MySQL :", err));

/**
 * Liste des artisans + métiers
 */
app.get("/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({ include: Metier });
    res.json(artisans);
  } catch (err) {
    console.error("Erreur /artisans :", err);
    res.status(500).json({
      error: err.name,
      message: err.message,
      sqlMessage: err?.original?.sqlMessage,
      code: err?.original?.code,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
