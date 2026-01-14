import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ArtisanDetail from "./pages/ArtisanDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artisans/:id" element={<ArtisanDetail />} />
    </Routes>
  );
}
