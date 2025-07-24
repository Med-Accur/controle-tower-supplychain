import { supabase } from "../../supabase/supabase"; // Assure-toi que cette instance est bien configurée

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function resetPassword(newPassword) {
  return await supabase.auth.updateUser({ password: newPassword });
}

export async function sendResetEmail(email) {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
  });
}

export async function getCurrentSession() {
  return await supabase.auth.getSession();
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
