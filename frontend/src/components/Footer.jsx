import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="legal-nav" aria-label="Pages légales">
          <Link className="legal-link" to="/legal/mentions-legales">
            Mentions légales
          </Link>
          <Link className="legal-link" to="/legal/donnees-personnelles">
            Données personnelles
          </Link>
          <Link className="legal-link" to="/legal/accessibilite">
            Accessibilité
          </Link>
          <Link className="legal-link" to="/legal/cookies">
            Cookies
          </Link>
        </nav>

        <div className="footer-address">
          <strong>Antenne de Lyon</strong>
          <div>101 cours Charlemagne</div>
          <div>CS 20033</div>
          <div>69269 LYON CEDEX 02</div>
          <div>France</div>
          <div className="footer-phone">+33 (0)4 26 73 40 00</div>
        </div>
      </div>
    </footer>
  );
}
