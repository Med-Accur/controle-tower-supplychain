import { supabase } from "../../supabase/supabase"; // Assure-toi que cette instance est bien configurée

export async function getTable() {
  const { data, error } = await supabase.from("TABLE_TABLEAUX").select("nom,filtre,key,colonnes,rpc_name");
  if (error) throw new Error("Erreur récupération des kpi : " + error.message);
  return data;
}


export async function getDataTable(rpcName) {
  const { data, error } = await supabase.rpc(rpcName);
  if (error) throw new Error("Erreur récupération des données : " + error.message);
  return data;
}

