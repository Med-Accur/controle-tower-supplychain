import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../features/dashboard/Dashboard";
import Fournisseurs from "../features/fournisseurs/Fournisseurs";
import Production from "../features/Production/Production"; 
import CommandeClient from "../features/cmd client/CommandeClient";
import Stock from "../features/stock/Stock";
import Login from "../features/auth/Login";
import ResetPassword from "../features/auth/ResetPassword";
import ProtectedRoute from "../routes/ProtectedRoute";
import ForgetPassword from "../features/auth/ForgetPassword";
import CapaciteCharge from "../features/capacite_charge/CapaciteCharge";
import PublicRoute from "./PublicRoute";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Route publique */}
       <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      
      
      {/* Routes protégées */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commandes" element={<CommandeClient />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/fournisseurs" element={<Fournisseurs />} />
        <Route path="/production" element={<Production />} />
        <Route path="/capacite-charge" element={<CapaciteCharge />} />

      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
