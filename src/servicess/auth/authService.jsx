import api from "../../api/axios";

// Connexion
export async function signIn(email, password) {
  const {data} = await api.post("/api/auth/login", { email, password });
  return data; 
}


// Déconnexion
export async function signOut() {
  const {data} = await api.get("/api/auth/logout");
  return data;
}


