import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { authApi } from "../services/api";

const STORAGE_KEY = "mediequip_auth";

// Restaure la session au rechargement de la page (try/catch : le stockage peut être indisponible)
function loadSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.token && saved?.user) return saved;
  } catch {
    // session absente ou illisible
  }
  return { token: null, user: null };
}

function saveSession(session) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignoré
  }
}

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { token, user } = await authApi.login(credentials);
    return { token, user };
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Inscription puis connexion automatique
export const register = createAsyncThunk("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    await authApi.register({ name, email, password });
    const { token, user } = await authApi.login({ email, password });
    return { token, user };
  } catch (error) {
    return rejectWithValue(error);
  }
});

// État : { token, user: { name, email, role }, status, error }
const authSlice = createSlice({
  name: "auth",
  initialState: { ...loadSession(), status: "idle", error: null },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      saveSession(null);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const onPending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const onFulfilled = (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveSession({ token: state.token, user: state.user });
    };
    const onRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message || "Erreur de connexion";
    };

    builder
      .addCase(login.pending, onPending)
      .addCase(login.fulfilled, onFulfilled)
      .addCase(login.rejected, onRejected)
      .addCase(register.pending, onPending)
      .addCase(register.fulfilled, onFulfilled)
      .addCase(register.rejected, onRejected)
      // Jeton expiré ou invalide pendant une action admin (401) : on déconnecte l'utilisateur
      .addMatcher(isRejectedWithValue, (state, action) => {
        if (action.type.startsWith("products/") && action.payload?.status === 401 && state.token) {
          state.token = null;
          state.user = null;
          state.error = "Session expirée, veuillez vous reconnecter.";
          saveSession(null);
        }
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";

export default authSlice.reducer;
