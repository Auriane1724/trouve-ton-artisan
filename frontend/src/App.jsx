import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ArtisanDetail from "./pages/ArtisanDetail.jsx";
import Legal from "./pages/Legal.jsx";
import Category from "./pages/Category.jsx";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() =>
        setCategories([
          // fallback si l’API est indispo
          { slug: "batiment", label: "Bâtiment" },
          { slug: "services", label: "Services" },
          { slug: "fabrication", label: "Fabrication" },
          { slug: "alimentation", label: "Alimentation" },
        ])
      );
  }, []);

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
