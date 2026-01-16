import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ArtisanDetail from "./pages/ArtisanDetail.jsx";
import Legal from "./pages/Legal.jsx";
import Category from "./pages/Category.jsx";

export default function App() {
  // ⚠️ Pour l’instant en dur. Étape suivante : alimenté depuis la BDD.
  const categories = useMemo(
    () => [
      { slug: "batiment", label: "Bâtiment" },
      { slug: "services", label: "Services" },
      { slug: "fabrication", label: "Fabrication" },
      { slug: "alimentation", label: "Alimentation" },
    ],
    []
  );

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-shell">
      <Header categories={categories} onSearch={setSearchQuery} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
          <Route path="/categorie/:slug" element={<Category />} />
          <Route path="/legal/:slug" element={<Legal />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
