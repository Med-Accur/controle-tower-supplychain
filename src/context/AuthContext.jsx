import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../servicess/auth/authService";
import { getWidget } from "../servicess/dashboard/dashboardServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [meData, setMeData] = useState(null); // ⚡ données /config/me
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndMe = async () => {
      try {
          const configData = await getWidget();
          setUser({ id: configData.id, email: configData.email });
          setMeData(configData);
        
      } catch (err) {
        console.error("Erreur récupération user ou config:", err);
        setUser(null);
        setMeData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndMe();
  }, []);

  const login = async (email, password) => {
    const data = await authService.signIn(email, password);
    setUser(data || null);
    if (data) {
      const configData = await getWidget();
      setMeData(configData || null);
    }

    return data;
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
    setMeData(null);
  };

  return (
    <AuthContext.Provider value={{ user, meData, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
