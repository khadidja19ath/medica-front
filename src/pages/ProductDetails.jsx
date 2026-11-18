import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../data/products";
import { addToCart } from "../store/cartSlice";
import { selectProducts, selectProductsStatus } from "../store/productsSlice";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const product = products.find((item) => item.id === id);

  // Pendant le chargement de l'API, on n'affiche pas "page introuvable"
  if (!product && (status === "idle" || status === "loading")) {
    return <section className="page-section container"><div className="empty-state"><h3>Chargement du produit...</h3></div></section>;
  }
  if (!product) return <NotFound />;

  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <section className="page-section container">
      <Link to="/boutique" className="back-link"><ArrowLeft size={16} /> Retour à la boutique</Link>
      <div className="product-detail">
        <div className="detail-image"><img src={product.image} alt={product.name} /></div>
        <div className="detail-content">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <strong className="detail-price">{formatPrice(product.price)}</strong>
          <p className="detail-description">{product.description}</p>
          <div className="availability">{inStock ? <CheckCircle2 size={18} /> : <XCircle size={18} />} {inStock ? `En stock (${product.stock} disponible(s))` : "Rupture de stock"}</div>
          <button className="button button-primary detail-add" onClick={() => dispatch(addToCart(product))} disabled={!inStock}><ShoppingCart size={18} /> Ajouter au panier</button>
          <div className="detail-note">Les prix et la disponibilité présentés sont des données de démonstration.</div>
        </div>
      </div>
    </section>
  );
}