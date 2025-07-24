import React from 'react';
import { supabase } from "../../supabase/supabase"

// ici je  recupere les enum existantes dans DBbb
export const getEnumValues = async (enumName) => {
  const { data, error } = await supabase.rpc("get_enum_values", {
    enum_name: enumName,
  });

  if (error) {
    console.error(`Erreur récupération de l'énumération ${enumName}`, error);
    return [];
  }

  return data.map((value) => ({ label: value, value }));
};

// ici je recupere  les noms des modes de livraison (a discuter avec amine)
export const getModeLivraisonNoms = async () => {
  const { data, error } = await supabase.from("modelivraison").select("nom");

  if (error) {
    console.error("Erreur récupération des modes de livraison :", error);
    return [];
  }

  return data.map((item) => ({ label: item.nom, value: item.nom }));
};
