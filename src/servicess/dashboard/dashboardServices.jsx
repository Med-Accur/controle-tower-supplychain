import { supabase } from "../../supabase/supabase"; // Assure-toi que cette instance est bien configurée


const url = "http://localhost:8000"

export async function getTable() {
  const res = await fetch(`${url}/api/dashboard/config`,{
    method:"GET"
  });
  const data = await res.json()
  if (!res.ok) throw new Error("Erreur récupération des tableaux");
  return data;

}
//test
export async function getDataTable(rpcName, params = {}) {
  
  const {
    statut_filter,
    client_filter,
    date_min,
    date_max,
  } = params;

  
  const { data, error } = await supabase.rpc(rpcName, {
    statut_filter,
    client_filter,
    date_min,
    date_max,
  });
  if (error) throw new Error("Erreur récupération des données : " + error.message);
  return data;
}

export async function getMap() {
  const { data, error } = await supabase.from("TABLE_MAP").select("nom,filtre,key,rpc_name");
  if (error) throw new Error("Erreur récupération des kpi : " + error.message);
  return data;
}

export async function getDataMap(rpcName, params = {}) {
  
  const {
    statut_filter,
    client_filter,
    date_min,
    date_max,
  } = params;

  
  const { data, error } = await supabase.rpc(rpcName, {
    statut_filter,
    client_filter,
    date_min,
    date_max,
  });
  if (error) throw new Error("Erreur récupération des données : " + error.message);
  return data;
}
