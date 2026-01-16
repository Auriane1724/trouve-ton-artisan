import { useParams } from "react-router-dom";

export default function Category() {
  const { slug } = useParams();

  return (
    <div className="page">
      <h1 className="page-title">Catégorie : {slug}</h1>
      <p className="muted">Page en construction.</p>
    </div>
  );
}
