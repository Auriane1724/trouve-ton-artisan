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
app.use(
  cors({
    origin: "http://localhost:5173",
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
