import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { categories, formatPrice } from "../data/products";
import { createProduct, deleteProduct, selectProducts, selectProductsStatus, updateProduct } from "../store/productsSlice";

const emptyForm = { name: "", category: "Diagnostic", price: "", oldPrice: "", stock: "", badge: "", imageUrl: "", description: "" };

export default function Admin() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = mode création
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }

  // Charge un produit dans le formulaire pour le modifier
  function startEdit(product) {
    setEditingId(product.id);
    setMessage("");
    setError("");
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      stock: String(product.stock),
      badge: product.badge || "",
      imageUrl: product.imageUrl,
      description: product.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    // Conversion des champs numériques ; oldPrice vide => null
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      oldPrice: form.oldPrice === "" ? null : Number(form.oldPrice),
    };

    const action = editingId ? updateProduct({ id: editingId, data }) : createProduct(data);
    const result = await dispatch(action);
    setSaving(false);

    if (result.meta.requestStatus === "fulfilled") {
      setMessage(editingId ? "Produit mis à jour." : "Produit créé.");
      resetForm();
    } else {
      const payload = result.payload;
      setError([payload?.message, ...(payload?.errors || [])].filter(Boolean).join(" — "));
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Supprimer « ${product.name} » ?`)) return;
    setMessage("");
    const result = await dispatch(deleteProduct(product.id));
    if (result.meta.requestStatus === "fulfilled") {
      setMessage("Produit supprimé.");
      if (editingId === product.id) resetForm();
    } else {
      setError(result.payload?.message || "Suppression impossible.");
    }
  }

  return (
    <section className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">ADMINISTRATION</span>
        <h1>Gestion des produits</h1>
        <p>Ajoutez, modifiez ou supprimez les produits de la boutique.</p>
      </div>

      <div className="admin-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Modifier le produit" : "Nouveau produit"}</h2>
          <label>Nom<input required name="name" value={form.name} onChange={handleChange} placeholder="Nom du produit" /></label>
          <label>Catégorie
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          </label>
          <div className="form-row">
            <label>Prix (DA)<input required type="number" min="0" name="price" value={form.price} onChange={handleChange} /></label>
            <label>Ancien prix (DA)<input type="number" min="0" name="oldPrice" value={form.oldPrice} onChange={handleChange} /></label>
          </div>
          <div className="form-row">
            <label>Stock<input required type="number" min="0" step="1" name="stock" value={form.stock} onChange={handleChange} /></label>
            <label>Badge<input name="badge" value={form.badge} onChange={handleChange} placeholder="Nouveau, Offre..." /></label>
          </div>
          <label>URL de l'image<input required type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." /></label>
          <label>Description<textarea required rows="4" name="description" value={form.description} onChange={handleChange} /></label>
          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}
          <div className="admin-form-actions">
            <button className="button button-primary" type="submit" disabled={saving}>
              {editingId ? <Save size={17} /> : <Plus size={17} />} {saving ? "Enregistrement..." : editingId ? "Enregistrer" : "Ajouter le produit"}
            </button>
            {editingId && <button className="button button-outline" type="button" onClick={resetForm}><X size={17} /> Annuler</button>}
          </div>
        </form>

        <div className="admin-table-wrap">
          <h2>Produits ({products.length})</h2>
          {status === "loading" && <p>Chargement...</p>}
          <table className="admin-table">
            <thead>
              <tr><th></th><th>Produit</th><th>Prix</th><th>Stock</th><th></th></tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><img src={product.image} alt="" /></td>
                  <td><strong>{product.name}</strong><small>{product.category}</small></td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td className="admin-actions">
                    <button onClick={() => startEdit(product)} aria-label="Modifier"><Pencil size={16} /></button>
                    <button className="danger" onClick={() => handleDelete(product)} aria-label="Supprimer"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
