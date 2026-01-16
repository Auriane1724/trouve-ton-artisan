require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/database");
const { Artisan, Metier } = require("./models");

const app = express();
app.set("trust proxy", 1);

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
app.post("/contact", async (req, res) => {
  try {
    const { artisanId, name, email, type, message } = req.body;

    if (!artisanId || !name || !email || !type || !message) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    // Insertion SQL simple via Sequelize (connexion existante)
    await sequelize.query(
      `INSERT INTO contact_message (artisan_id, requester_name, requester_email, request_type, message)
       VALUES (?, ?, ?, ?, ?)`,
      {
        replacements: [artisanId, name, email, type, message],
      }
    );

    return res.json({ status: "Demande enregistrée" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});
app.get("/categories", async (req, res) => {
  try {
    const [rows] = await sequelize.query(
      "SELECT id, label, slug FROM categorie ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
