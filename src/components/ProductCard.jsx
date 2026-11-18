import { Link } from "react-router-dom";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { formatPrice } from "../data/products";
import { addToCart } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link to={`/produit/${product.id}`} className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="quick-view"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/produit/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-card-bottom">
          <div>
            <strong className="product-price">{formatPrice(product.price)}</strong>
            {product.oldPrice && <del className="old-price">{formatPrice(product.oldPrice)}</del>}
          </div>
          <button
            className="add-cart-button"
            onClick={() => dispatch(addToCart(product))}
            disabled={product.stock === 0}
            aria-label="Ajouter au panier"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
