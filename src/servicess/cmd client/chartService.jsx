import { supabase } from "../../supabase/supabase";

export async function getChartsMeta(module) {
  const { data, error } = await supabase
    .from("TABLE_CHART")
    .select("nom_kpi, rpc_name, type_chart, filtre")
    .eq("module", module);

  if (error) throw new Error("Erreur récupération charts : " + error.message);
  return data;
}


export async function getChartData(rpcName, params = {}) {
  const {
    start_date,
    end_date,
    mode_livraison,
    statut,
  } = params;
console.log("Fetching chart data with params:", params);
  const payload = {};
  if (start_date) payload.p_start_date = start_date;
  if (end_date) payload.p_end_date = end_date;
  if (mode_livraison?.length) payload.p_mode_livraison = mode_livraison;
  if (statut?.length) payload.p_statut = statut;

  const { data, error } = await supabase.rpc(rpcName, payload);

  if (error) {
    console.error("Erreur appel RPC :", error.message);
    throw new Error("Erreur appel RPC : " + error.message);
  }
console.log("Chart data fetched successfully:", data);
  return data;
}
