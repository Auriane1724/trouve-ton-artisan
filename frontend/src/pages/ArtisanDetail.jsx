import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    fetch(`${API_URL}/artisans`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        const found = (Array.isArray(data) ? data : []).find(
          (a) => String(a.id) === String(id)
        );
        setArtisan(found || null);
      })
      .catch(() => setError("Load failed"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Chargement…</p>;
  if (error) return <p style={{ padding: 20 }}>Erreur : {error}</p>;
  if (!artisan) return <p style={{ padding: 20 }}>Artisan introuvable.</p>;

  return (
    <div
      style={{
        fontFamily: "system-ui",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        ← Retour à la recherche
      </Link>

      <h1 style={{ marginTop: 12 }}>
        {(artisan.prenom ?? "").trim()} {artisan.nom}
      </h1>

      <p>
        <strong>Ville :</strong> {artisan.ville ?? "—"}{" "}
        {artisan.code_postal ? `(${artisan.code_postal})` : ""}
      </p>

      <p>
        <strong>Métiers :</strong>{" "}
        {artisan.Metiers?.map((m) => m.nom).join(", ") || "—"}
      </p>

      {artisan.description ? <p>{artisan.description}</p> : null}

      <hr style={{ margin: "20px 0" }} />

      <h2>Formulaire de contact</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = new FormData(e.currentTarget);

          const payload = {
            artisanId: artisan.id,
            name: form.get("name"),
            email: form.get("email"),
            type: form.get("type"),
            message: form.get("message"),
          };

          const API_URL =
            import.meta.env.VITE_API_URL || "http://localhost:3001";

          try {
            setSending(true);
            const res = await fetch(`${API_URL}/contact`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Erreur envoi");

            alert("✅ Demande envoyée !");
            e.currentTarget.reset();
          } catch (err) {
            alert("❌ Erreur : impossible d’envoyer la demande.");
          } finally {
            setSending(false);
          }
        }}
        style={{ maxWidth: 600 }}
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
            fontSize: 16,
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
            fontSize: 16,
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
            fontSize: 16,
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
          rows={5}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 16,
          }}
        />

        <button
          type="submit"
          disabled={sending}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ccc",
            background: "#fff",
            cursor: sending ? "not-allowed" : "pointer",
            fontSize: 16,
          }}
        >
          {sending ? "Envoi en cours..." : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
}
