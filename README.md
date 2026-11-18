# MediEquip — Frontend

**Étudiante :** Khadidja Ait Hocine — ENSTA, module WAMD (TD-TP 2 et intégration TD-TP 3)
**Boutique :** MediEquip — matériel médical professionnel

Boutique en ligne construite avec React, Vite et Redux Toolkit. Le catalogue vient de l'API (MongoDB) ; le panier est géré par Redux.

## Installation

```bash
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:3000/api
npm run dev               # http://localhost:5173
```

Le backend (dossier `MediEquip-backend`) doit être démarré pour afficher les produits.

## Pages

- `/` Accueil · `/boutique` Catalogue, recherche, filtre · `/produit/:id` Détails · `/panier` Panier · `/contact`
- `/connexion` et `/inscription` : authentification (JWT)
- `/admin` : gestion des produits (créer, modifier, supprimer) — réservé au rôle admin

## Composants principaux

`Navbar`, `Footer`, `ProductCard`, `SectionHeading`, `AdminRoute` (protège `/admin`) ; pages `Home`, `Shop`, `ProductDetails`, `Cart`, `Contact`, `Login`, `Register`, `Admin`, `NotFound`.

## État Redux (`src/store/`)

- `cart` : `items` (produits + `quantity`) — actions `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` ; sélecteurs `selectTotalItems`, `selectTotalPrice`.
- `products` : `items`, `status`, `error` — thunks `fetchProducts`, `createProduct`, `updateProduct`, `deleteProduct` (appels API).
- `auth` : `token`, `user`, `status`, `error` — thunks `login`, `register`, action `logout` ; session conservée dans `localStorage`.

## Fonctionnalités

Catalogue depuis l'API, recherche, filtre par catégorie, détails produit, stock (quantité limitée au stock), panier avec quantités et total, inscription / connexion, session persistante, espace admin protégé, design responsive.

## Code

`src/services/api.js` (appels HTTP), `src/store/` (Redux), `src/pages/`, `src/components/`, `src/styles/global.css`.
