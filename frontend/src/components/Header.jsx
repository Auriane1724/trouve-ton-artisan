import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoRegion from "../assets/Logo.png";

export default function Header({ categories, onSearch }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const value = q.trim();
    if (!value) return;
    onSearch(value); // déclenche la recherche
    navigate("/"); // ramène sur l'accueil (résultats visibles)
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img className="brand-logo" src={logoRegion} alt="Région AURA" />
        </Link>

        <nav className="main-nav" aria-label="Menu principal">
          {categories.map((c) => (
            <NavLink
              key={c.slug}
              to={`/categorie/${c.slug}`}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              {c.label}
            </NavLink>
          ))}
        </nav>

        <form className="search" onSubmit={submit} role="search">
          <input
            className="search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un artisan (nom)…"
            aria-label="Rechercher un artisan par nom"
          />
          <button className="search-btn" type="submit">
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
}
