import { Link } from "react-router-dom";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark"><Activity size={22} /></span>
            <span>Medi<span>Equip</span></span>
          </Link>
          <p>Votre partenaire pour l'équipement et le matériel médical professionnel.</p>
        </div>
        <div>
          <h3>Navigation</h3>
          <Link to="/">Accueil</Link>
          <Link to="/boutique">Boutique</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p><Phone size={15} /> +213 555 00 00 00</p>
          <p><Mail size={15} /> contact@mediequip.dz</p>
          <p><MapPin size={15} /> Alger, Algérie</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 MediEquip. Tous droits réservés.</span>
        <span>Matériel médical professionnel</span>
      </div>
    </footer>
  );
}