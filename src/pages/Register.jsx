import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus } from "lucide-react";
import { clearAuthError, register } from "../store/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");

    // Validations côté client (le backend revalide de toute façon)
    if (form.password.length < 8) return setLocalError("Le mot de passe doit contenir au moins 8 caractères.");
    if (form.password !== form.confirm) return setLocalError("Les deux mots de passe ne correspondent pas.");

    const result = await dispatch(register({ name: form.name, email: form.email, password: form.password }));
    if (register.fulfilled.match(result)) navigate("/boutique", { replace: true });
  }

  return (
    <section className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">ESPACE CLIENT</span>
        <h1>Créer un compte</h1>
        <p>Inscrivez-vous pour accéder à votre espace MediEquip.</p>
      </div>
      <form className="contact-form auth-card" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <label>Nom complet<input required name="name" value={form.name} onChange={handleChange} placeholder="Votre nom" /></label>
        <label>Adresse e-mail<input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="nom@exemple.com" /></label>
        <label>Mot de passe<input required type="password" name="password" value={form.password} onChange={handleChange} placeholder="8 caractères minimum" /></label>
        <label>Confirmer le mot de passe<input required type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Répétez le mot de passe" /></label>
        {(localError || error) && <p className="form-error">{localError || error}</p>}
        <button className="button button-primary" type="submit" disabled={status === "loading"}>
          <UserPlus size={17} /> {status === "loading" ? "Création..." : "Créer mon compte"}
        </button>
        <p className="auth-switch">Déjà inscrit ? <Link to="/connexion">Se connecter</Link></p>
      </form>
    </section>
  );
}
