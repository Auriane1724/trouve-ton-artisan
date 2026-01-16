import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Category() {
  const { slug } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    setLoading(true);
    setError("");

    fetch(`${API_URL}/categories/${slug}/artisans`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setArtisans(Array.isArray(data) ? data : []))
      .catch(() => setError("Load failed"))
      .finally(() => setLoading(false));
  }, [slug]);

  const labelMap = {
    batiment: "Bâtiment",
    services: "Services",
    fabrication: "Fabrication",
    alimentation: "Alimentation",
  };

  if (loading) return <p className="page">Chargement…</p>;
  if (error) return <p className="page">Erreur : {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">{labelMap[slug] || "Catégorie"}</h1>
      <p className="muted">{artisans.length} artisan(s)</p>

      {artisans.length === 0 ? (
        <p className="muted">Aucun artisan trouvé pour cette catégorie.</p>
      ) : (
        <ul className="cards">
          {artisans.map((a) => (
            <li className="card" key={a.id}>
              <h2 className="card-title">
                {(a.prenom ?? "").trim()} {a.nom}
              </h2>
              <p className="card-line">
                <strong>Ville :</strong> {a.ville ?? "—"}{" "}
                {a.code_postal ? `(${a.code_postal})` : ""}
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
      )}
    </div>
  );
}
