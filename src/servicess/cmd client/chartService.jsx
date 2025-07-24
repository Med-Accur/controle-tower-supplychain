import { supabase } from "../../supabase/supabase";

export async function getChartsMeta(module) {
  const { data, error } = await supabase
    .from("TABLE_CHART")
    .select("*")
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

  // Construction dynamique du payload
  const payload = {};
  if (start_date) payload.p_start_date = start_date;
  if (end_date) payload.p_end_date = end_date;
  if (mode_livraison && mode_livraison.length > 0) {
    payload.p_mode_livraison = mode_livraison;
  }
  if (statut && statut.length > 0) {
    payload.p_statut = statut;
  }

  // ici  Appel RPC apres avoir construit le payload
  console.log("📤 Envoi RPC vers", rpcName, "avec", payload);
  const { data, error } = await supabase.rpc(rpcName, payload);

  if (error) {
    console.error("Erreur appel RPC :", error.message);
    throw new Error("Erreur appel RPC : " + error.message);
  }

  return data;
}





