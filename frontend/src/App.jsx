import { useEffect, useMemo, useState } from "react";
import logoRegion from "./assets/Logo.png";

export default function App() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    fetch(`${API_URL}/artisans`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setArtisans(data))
      .catch(() => setError("Load failed"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return artisans;

    return artisans.filter((a) => {
      const metiers = (a.Metiers || []).map((m) => m.nom).join(" ");
      const blob =
        `${a.nom} ${a.prenom} ${a.ville} ${a.code_postal} ${metiers}`.toLowerCase();
      return blob.includes(q);
    });
  }, [artisans, query]);

  if (loading) return <p style={{ padding: 20 }}>Chargement…</p>;
  if (error) return <p style={{ padding: 20 }}>Erreur : {error}</p>;

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 20px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <img
          src={logoRegion}
          alt="Région Auvergne-Rhône-Alpes"
          style={{ height: 42 }}
        />
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>
            Plateforme des artisans – Auvergne-Rhône-Alpes
          </h1>
          <p style={{ margin: 0, color: "#666" }}>
            Trouvez un artisan et demandez un renseignement / prestation / tarif
          </p>
        </div>
      </header>

      <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Rechercher un artisan (nom, ville, métier)
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: plombier, Grenoble, Dupont…"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 16,
          }}
        />

        <p style={{ marginTop: 10, color: "#666" }}>
          {filtered.length} artisan(s) trouvé(s)
        </p>

        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {filtered.map((a) => (
            <li
              key={a.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <h2 style={{ margin: 0 }}>
                {a.prenom} {a.nom}
              </h2>

              <p style={{ margin: "6px 0" }}>
                <strong>Ville :</strong> {a.ville} ({a.code_postal})
              </p>

              <p style={{ margin: "6px 0" }}>
                <strong>Métiers :</strong>{" "}
                {a.Metiers?.map((m) => m.nom).join(", ") || "—"}
              </p>

              <p style={{ margin: "6px 0" }}>{a.description}</p>

              <button
                style={{
                  marginTop: 8,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  background: "white",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedArtisan(a)}
              >
                Contacter cet artisan
              </button>
            </li>
          ))}
        </ul>

        {selectedArtisan && (
          <section
            style={{
              marginTop: 40,
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              maxWidth: 600,
              marginInline: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ marginTop: 0 }}>
                Contacter {selectedArtisan.prenom} {selectedArtisan.nom}
              </h2>
              <button
                onClick={() => setSelectedArtisan(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 18,
                }}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Formulaire OK. Étape suivante : envoi email via le backend."
                );
              }}
            >
              <input
                required
                name="name"
                placeholder="Votre nom"
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Votre email"
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              />
              <select
                required
                name="type"
                defaultValue=""
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              >
                <option value="" disabled>
                  Type de demande
                </option>
                <option value="renseignement">Renseignement</option>
                <option value="prestation">Prestation</option>
                <option value="tarif">Tarif</option>
              </select>
              <textarea
                required
                name="message"
                placeholder="Votre message"
                rows={4}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Envoyer la demande
              </button>
            </form>
          </section>
        )}
      </main>

      <footer
        style={{
          marginTop: 40,
          padding: 20,
          borderTop: "1px solid #eee",
          color: "#666",
          textAlign: "center",
        }}
      >
        © Région Auvergne-Rhône-Alpes — Plateforme artisans (projet étudiant)
      </footer>
    </div>
  );
}
