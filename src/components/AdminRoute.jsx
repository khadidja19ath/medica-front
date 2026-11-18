import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShieldAlert } from "lucide-react";
import { selectIsAdmin, selectToken } from "../store/authSlice";

// Protège une page : non connecté => /connexion ; connecté mais non admin => accès refusé
export default function AdminRoute({ children }) {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();

  if (!token) return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;

  if (!isAdmin) {
    return (
      <section className="page-section container">
        <div className="empty-state">
          <ShieldAlert size={36} />
          <h2>Accès refusé</h2>
          <p>Cette page est réservée aux administrateurs.</p>
          <Link to="/" className="button button-primary">Retour à l'accueil</Link>
        </div>
      </section>
    );
  }

  return children;
}
