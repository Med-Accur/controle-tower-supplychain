
import * as authService from "../../servicess/auth/authService";
import { useState, useCallback } from "react";

export function useAuthLogic() {
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setError("");
    const { data, error } = await authService.signIn(email, password);
    if (error) throw error;
    return data.user;
  };

  const logout = async () => {
    await authService.signOut();
  };

  const resetPwd = async (newPassword) => {
    const { error } = await authService.resetPassword(newPassword);
    if (error) throw error;
  };

 const sendResetLink = useCallback(async (email) => {
  const { error } = await authService.sendResetEmail(email);
  if (error) throw error;
}, []);


  

  return {
    login,
    logout,
    resetPwd,
    sendResetLink,
    error,
  };
}
