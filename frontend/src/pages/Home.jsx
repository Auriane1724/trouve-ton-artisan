import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Stars({ value }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span aria-label={`Note ${full} sur 5`} title={`Note ${full}/5`}>
      {"★★★★★".slice(0, full)}
      <span style={{ color: "#bbb" }}>{"★★★★★".slice(full)}</span>
    </span>
  );
}

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

  // ✅ Exigence : recherche sur les noms des artisans
  const filtered = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return [];
    return artisans.filter((a) => `${a.nom ?? ""}`.toLowerCase().includes(q));
  }, [artisans, searchQuery]);

  // ✅ "Artisans du mois" : on prend 3 artisans (tu peux changer l’ordre si tu veux)
  const artisansDuMois = useMemo(() => artisans.slice(0, 3), [artisans]);

  if (loading) return <p className="page">Chargement…</p>;
  if (error) return <p className="page">Erreur : {error}</p>;

  return (
    <div className="page">
      {/* ✅ Bloc obligatoire : étapes */}
      <section className="home-block">
        <h1 className="page-title">Comment trouver mon artisan ?</h1>

        <ol className="steps">
          <li className="step">
            <div className="step-num">1</div>
            <div className="step-text">
              Choisir la catégorie d’artisanat dans le menu.
            </div>
          </li>

          <li className="step">
            <div className="step-num">2</div>
            <div className="step-text">Choisir un artisan.</div>
          </li>

          <li className="step">
            <div className="step-num">3</div>
            <div className="step-text">
              Le contacter via le formulaire de contact.
            </div>
          </li>

          <li className="step">
            <div className="step-num">4</div>
            <div className="step-text">Une réponse sera apportée sous 48h.</div>
          </li>
        </ol>
      </section>

      {/* ✅ Bloc obligatoire : 3 artisans du mois */}
      <section className="home-block">
        <h2 className="section-title">Les artisans du mois</h2>

        <div className="month-grid">
          {artisansDuMois.map((a, index) => {
            const specialite =
              a.Metiers?.[0]?.nom || "Spécialité non renseignée";

            // Notes fixes (tu peux les modifier)
            const note = [5, 4, 4][index] ?? 4;

            return (
              <article className="month-card" key={a.id}>
                <div className="month-top">
                  <h3 className="month-name">
                    {(a.prenom ?? "").trim()} {a.nom}
                  </h3>
                  <div className="month-rating">
                    <Stars value={note} />{" "}
                    <span className="muted">({note}/5)</span>
                  </div>
                </div>

                <p className="month-line">
                  <strong>Spécialité :</strong> {specialite}
                </p>

                <p className="month-line">
                  <strong>Localisation :</strong> {a.ville ?? "—"}{" "}
                  {a.code_postal ? `(${a.code_postal})` : ""}
                </p>

                <Link className="btn" to={`/artisans/${a.id}`}>
                  Voir la fiche & contacter
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* ✅ Résultats de recherche (uniquement si recherche active) */}
      <section className="home-block">
        <h2 className="section-title">Résultats de recherche</h2>

        {!searchQuery?.trim() ? (
          <p className="muted">
            Utilisez la barre de recherche en haut pour trouver un artisan par
            nom.
          </p>
        ) : (
          <>
            <p className="muted">{filtered.length} artisan(s) trouvé(s)</p>

            {filtered.length === 0 ? (
              <p className="muted">
                Aucun artisan ne correspond à cette recherche.
              </p>
            ) : (
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

                    <Link className="btn" to={`/artisans/${a.id}`}>
                      Voir la fiche & contacter
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
