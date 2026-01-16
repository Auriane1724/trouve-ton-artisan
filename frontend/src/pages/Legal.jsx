import { useParams } from "react-router-dom";

export default function Legal() {
  const { slug } = useParams();
  const titleMap = {
    "mentions-legales": "Mentions légales",
    "donnees-personnelles": "Données personnelles",
    accessibilite: "Accessibilité",
    cookies: "Cookies",
  };

  return (
    <div className="page">
      <h1 className="page-title">{titleMap[slug] || "Page légale"}</h1>
      <p className="muted">Page en construction.</p>
    </div>
  );
}
