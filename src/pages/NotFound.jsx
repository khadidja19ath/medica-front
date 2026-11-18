import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-section container">
      <div className="empty-state">
        <h1>Page introuvable</h1>
        <p>La page demandée n'existe pas ou a été déplacée.</p>
        <Link to="/" className="button button-primary">Retour à l'accueil</Link>
      </div>
    </section>
  );
}