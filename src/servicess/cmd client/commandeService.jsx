// src/services/commandeService.js
import { supabase } from "../../supabase/supabase"; // Assure-toi que cette instance est bien configurée

export async function getKpi(kpi) {
  const { data, error } = await supabase.from("TABLE_KPI").select("nom,icon,key,unit,rpc_name").eq("module",kpi);
  if (error) throw new Error("Erreur récupération des kpi : " + error.message);
  return data;
}



export async function getCommandeKpis(kpiName) {
  const { data, error } = await supabase.rpc("get_kpi_cmd_clients",{
    kpi_name: kpiName
  });
  if (error) throw new Error("Erreur récupération KPI : " + error.message);
  return data;
}