import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Headset, CreditCard, Activity, Armchair, Stethoscope, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { useSelector } from "react-redux";
import { categories } from "../data/products";
import { selectProducts } from "../store/productsSlice";

const categoryIcons = {
  Diagnostic: Activity,
  Mobilier: Armchair,
  Instruments: Stethoscope,
  Consommables: Package
};

export default function Home() {
  const products = useSelector(selectProducts);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span></span> AU SERVICE DES PROFESSIONNELS DE SANTÉ</span>
            <h1>L'équipement médical qui accompagne <em>vos soins.</em></h1>
            <p>Découvrez une sélection de matériel médical pensée pour les cabinets, les cliniques et les professionnels de santé.</p>
            <div className="hero-actions">
              <Link to="/boutique" className="button button-primary">Découvrir la boutique <ArrowRight size={18} /></Link>
              <Link to="/contact" className="button button-outline">Nous contacter</Link>
            </div>
            <div className="hero-note"><ShieldCheck size={17} /> Une sélection dédiée aux professionnels</div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1100&q=90" alt="Matériel médical professionnel" />
            <div className="hero-floating-card">
              <span className="floating-icon"><Activity size={20} /></span>
              <div><strong>Matériel sélectionné</strong><small>Pour votre activité médicale</small></div>
            </div>
          </div>
        </div>
        <div className="hero-background-shape"></div>
      </section>

      <section className="benefits-section">
        <div className="container benefits-grid">
          <div className="benefit-item"><span><Truck /></span><div><strong>Livraison disponible</strong><small>Selon votre localisation</small></div></div>
          <div className="benefit-item"><span><ShieldCheck /></span><div><strong>Produits sélectionnés</strong><small>Une offre pour les professionnels</small></div></div>
          <div className="benefit-item"><span><Headset /></span><div><strong>Accompagnement</strong><small>Une équipe à votre écoute</small></div></div>
          <div className="benefit-item"><span><CreditCard /></span><div><strong>Paiement sécurisé</strong><small>Modalités à confirmer</small></div></div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="PARCOURIR LA BOUTIQUE" title="Nos catégories" description="Trouvez rapidement les équipements adaptés à vos besoins." action={<Link className="text-link" to="/boutique">Toutes les catégories <ArrowRight size={16} /></Link>} />
        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name];
            return (
              <Link to={`/boutique?categorie=${encodeURIComponent(category.name)}`} className="category-card" key={category.name}>
                <span className="category-icon"><Icon size={25} /></span>
                <span className="category-text"><strong>{category.name}</strong><small>{category.description}</small></span>
                <ArrowRight className="category-arrow" size={18} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <SectionHeading eyebrow="NOTRE SÉLECTION" title="Produits populaires" description="Une sélection de produits pour équiper votre espace de soins." action={<Link className="text-link" to="/boutique">Voir tous les produits <ArrowRight size={16} /></Link>} />
          <div className="products-grid">
            {products.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>
      </section>

      <section className="cta-section container">
        <div className="cta-content">
          <span className="eyebrow">UN BESOIN PARTICULIER ?</span>
          <h2>Vous recherchez un équipement spécifique ?</h2>
          <p>Contactez notre équipe pour obtenir des informations sur les produits et leur disponibilité.</p>
          <Link to="/contact" className="button button-light">Parler à notre équipe <ArrowRight size={18} /></Link>
        </div>
        <div className="cta-decoration"><Activity size={190} strokeWidth={0.7} /></div>
      </section>
    </>
  );
}