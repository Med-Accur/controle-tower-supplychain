import { supabase } from "../../supabase/supabase"; 
import api from "../../api/axios";



export async function getWidget() {
  const {data} = await api.get("api/pre/config/me");

  return data;
}

//test
export async function getDataWidget(rpc_name, widget_id = "2") {

  const {data} = await api.post("api/pre/acceuil/widgets", {
    rpcs: [
      {
        widget_id,
        rpc_name,
      },
    ],
  });

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
