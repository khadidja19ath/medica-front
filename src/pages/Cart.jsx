import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCartItems, selectTotalPrice, updateQuantity } from "../store/cartSlice";
import { formatPrice } from "../data/products";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <section className="page-section container">
        <div className="page-intro"><span className="eyebrow">VOTRE SÉLECTION</span><h1>Votre panier</h1></div>
        <div className="empty-state cart-empty"><ShoppingBag size={36} /><h2>Votre panier est vide</h2><p>Parcourez notre boutique pour trouver les équipements dont vous avez besoin.</p><Link to="/boutique" className="button button-primary">Découvrir la boutique</Link></div>
      </section>
    );
  }

  return (
    <section className="page-section container">
      <div className="page-intro"><span className="eyebrow">VOTRE SÉLECTION</span><h1>Votre panier</h1><p>Vérifiez les produits sélectionnés avant de continuer.</p></div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info"><strong>{item.name}</strong><span>{formatPrice(item.price)}</span></div>
              <div className="quantity-control">
                <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} aria-label="Diminuer"><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} aria-label="Augmenter"><Plus size={14} /></button>
              </div>
              <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))} aria-label="Supprimer"><Trash2 size={17} /></button>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Récapitulatif</h2>
          <div className="summary-line"><span>Sous-total</span><strong>{formatPrice(totalPrice)}</strong></div>
          <div className="summary-line"><span>Livraison</span><span>À confirmer</span></div>
          <div className="summary-total"><span>Total estimé</span><strong>{formatPrice(totalPrice)}</strong></div>
          <Link to="/contact" className="button button-primary checkout-button">Demander un devis</Link>
          <p>La commande et le paiement en ligne seront ajoutés dans une prochaine version.</p>
        </aside>
      </div>
    </section>
  );
}