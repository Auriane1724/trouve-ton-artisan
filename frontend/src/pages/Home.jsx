import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ searchQuery }) {
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
      .then((data) => setArtisans(Array.isArray(data) ? data : []))
      .catch(() => setError("Load failed"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return [];

    return artisans.filter((a) => {
      const nom = `${a.nom ?? ""}`.toLowerCase();
      const prenom = `${a.prenom ?? ""}`.toLowerCase();
      return nom.includes(q) || prenom.includes(q);
    });
  }, [artisans, searchQuery]);

  if (loading) return <p className="page">Chargement…</p>;
  if (error) return <p className="page">Erreur : {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">Trouver un artisan</h1>

      {!searchQuery?.trim() ? (
        <p className="muted">
          Utilisez la barre de recherche en haut pour trouver un artisan par
          nom.
        </p>
      ) : (
        <>
          <p className="muted">{filtered.length} artisan(s) trouvé(s)</p>

          <ul className="cards">
            {filtered.map((a) => (
              <li className="card" key={a.id}>
                <h2 className="card-title">
                  {(a.prenom ?? "").trim()} {a.nom}
                </h2>

                <p className="card-line">
                  <strong>Ville :</strong> {a.ville ?? "—"}{" "}
                  {a.code_postal ? `(${a.code_postal})` : ""}
                </p>

                <p className="card-line">
                  <strong>Métiers :</strong>{" "}
                  {a.Metiers?.map((m) => m.nom).join(", ") || "—"}
                </p>

                {a.description ? (
                  <p className="card-desc">{a.description}</p>
                ) : null}

                <Link className="btn" to={`/artisans/${a.id}`}>
                  Voir la fiche & contacter
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
