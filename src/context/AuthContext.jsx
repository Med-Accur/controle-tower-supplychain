import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../servicess/auth/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: listener } = authService.onAuthChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    const { data, error } = await authService.signIn(email, password);
    if (error) throw error;
    setUser(data.user);
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
  };

  const resetPassword = async (newPassword) => {
    await authService.resetPassword(newPassword);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
