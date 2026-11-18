import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">RESTONS EN CONTACT</span>
        <h1>Contactez-nous</h1>
        <p>Une question sur un produit ou un besoin particulier ? Écrivez-nous.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-details">
          <h2>Notre équipe est à votre écoute.</h2>
          <p>Nous pouvons vous renseigner sur les produits, les caractéristiques et les disponibilités.</p>
          <div className="contact-detail"><span><Phone /></span><div><small>Téléphone</small><strong>+213 555 00 00 00</strong></div></div>
          <div className="contact-detail"><span><Mail /></span><div><small>E-mail</small><strong>contact@mediequip.dz</strong></div></div>
          <div className="contact-detail"><span><MapPin /></span><div><small>Adresse</small><strong>Alger, Algérie</strong></div></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Envoyer un message</h2>
          <label>Nom complet<input required placeholder="Votre nom" /></label>
          <label>Adresse e-mail<input required type="email" placeholder="nom@exemple.com" /></label>
          <label>Sujet<input required placeholder="Objet de votre demande" /></label>
          <label>Votre message<textarea required rows="5" placeholder="Comment pouvons-nous vous aider ?" /></label>
          <button className="button button-primary" type="submit"><Send size={17} /> Envoyer le message</button>
          {submitted && <p className="form-success">Formulaire de démonstration envoyé. Le backend sera connecté plus tard.</p>}
        </form>
      </div>
    </section>
  );
}