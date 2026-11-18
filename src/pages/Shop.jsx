import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { selectProducts, selectProductsError, selectProductsStatus } from "../store/productsSlice";

export default function Shop() {
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("categorie") || "Toutes";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const categoryOptions = ["Toutes", "Diagnostic", "Mobilier", "Instruments", "Consommables"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "Toutes" || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <section className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">NOTRE CATALOGUE</span>
        <h1>La boutique</h1>
        <p>Explorez notre sélection d'équipements et de matériel médical.</p>
      </div>

      <div className="shop-toolbar">
        <div className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un produit..." /></div>
        <div className="filter-field"><SlidersHorizontal size={18} /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrer par catégorie">{categoryOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
      </div>

      <div className="results-line"><span>{filteredProducts.length} produit(s) trouvé(s)</span><span>Prix affichés en DZD</span></div>
      {status === "failed" ? (
        <div className="empty-state"><h3>Chargement impossible</h3><p>{error}</p></div>
      ) : status !== "succeeded" ? (
        <div className="empty-state"><h3>Chargement des produits...</h3></div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid shop-products">{filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      ) : (
        <div className="empty-state"><Search size={30} /><h3>Aucun produit trouvé</h3><p>Essayez un autre mot-clé ou une autre catégorie.</p></div>
      )}
    </section>
  );
}