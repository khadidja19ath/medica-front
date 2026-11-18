import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "lucide-react";
import { clearAuthError, login } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  // On efface l'ancienne erreur à l'ouverture de la page
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      // Admin => tableau de bord ; sinon retour à la page demandée ou à la boutique
      const destination = result.payload.user.role === "admin" ? "/admin" : location.state?.from || "/boutique";
      navigate(destination, { replace: true });
    }
  }

  return (
    <section className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">ESPACE CLIENT</span>
        <h1>Connexion</h1>
        <p>Connectez-vous pour accéder à votre compte.</p>
      </div>
      <form className="contact-form auth-card" onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        <label>Adresse e-mail<input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="nom@exemple.com" /></label>
        <label>Mot de passe<input required type="password" name="password" value={form.password} onChange={handleChange} placeholder="Votre mot de passe" /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="button button-primary" type="submit" disabled={status === "loading"}>
          <LogIn size={17} /> {status === "loading" ? "Connexion..." : "Se connecter"}
        </button>
        <p className="auth-switch">Pas encore de compte ? <Link to="/inscription">Créer un compte</Link></p>
      </form>
    </section>
  );
}
