import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../features/dashboard/Dashboard";
import Fournisseurs from "../features/fournisseurs/fournisseurs"
import CommandeClient from "../features/cmd client/CommandeClient";
import Stock from "../features/stock/Stock";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commandes" element={<CommandeClient />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/fournisseurs" element={<Fournisseurs />} />
      </Route>
    </Routes>
  );
}
