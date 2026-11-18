// Couche d'accès à l'API REST (backend Node.js / Express / MongoDB)
const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3000/api";

// Requête générique : renvoie le JSON, ou lève une erreur { message, status, errors }
async function request(path, { method = "GET", body, token } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw { message: "Impossible de joindre le serveur. Vérifiez que le backend est démarré.", status: 0 };
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw { message: data.message || "Une erreur est survenue", status: response.status, errors: data.errors || [] };
  }
  return data;
}

// Le backend renvoie _id et imageUrl ; les composants utilisent id et image
export function normalizeProduct(product) {
  return { ...product, id: product._id, image: product.imageUrl };
}

export const authApi = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
};

export const productsApi = {
  getAll: async () => (await request("/products")).products.map(normalizeProduct),
  create: async (payload, token) => normalizeProduct((await request("/products", { method: "POST", body: payload, token })).product),
  update: async (id, payload, token) => normalizeProduct((await request(`/products/${id}`, { method: "PUT", body: payload, token })).product),
  remove: async (id, token) => {
    await request(`/products/${id}`, { method: "DELETE", token });
    return id;
  },
};
