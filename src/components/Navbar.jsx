import { Link, NavLink } from "react-router-dom";
import { Activity, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems } from "../store/cartSlice";
import { logout, selectIsAdmin, selectUser } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
    dispatch(logout());
    closeMenu();
  }

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Équipements médicaux pour les professionnels de santé</span>
          <span>Service client : +213 555 00 00 00</span>
        </div>
      </div>

      <div className="container nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><Activity size={23} /></span>
          <span>Medi<span>Equip</span></span>
        </Link>

        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <NavLink to="/" onClick={closeMenu}>Accueil</NavLink>
          <NavLink to="/boutique" onClick={closeMenu}>Boutique</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          {isAdmin && <NavLink to="/admin" onClick={closeMenu}>Administration</NavLink>}
          {user ? (
            <button type="button" className="nav-logout" onClick={handleLogout}>Déconnexion ({user.name})</button>
          ) : (
            <NavLink to="/connexion" onClick={closeMenu}>Connexion</NavLink>
          )}
        </nav>

        <Link to="/panier" className="cart-link" aria-label="Voir le panier">
          <ShoppingBag size={19} />
          <span>Panier</span>
          <span className="cart-count">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}
