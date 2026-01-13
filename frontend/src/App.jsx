import { useEffect, useState } from "react";

export default function App() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    fetch(`${API_URL}/artisans`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setArtisans(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Chargement…</p>;
  if (error) return <p style={{ padding: 20 }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Trouve ton artisan</h1>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {artisans.map((a) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}
