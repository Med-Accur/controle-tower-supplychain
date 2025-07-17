import KpiCards from "../../widgets/KpiCards";

export default function CommandeClient() {
  const cards = [
    { title: "Commandes totales", key: "nb_commandes", value: "1 230", icon: "📦" },
    { title: "Commandes livrées", key: "otif", value: "980", icon: "✅" },
    { title: "Annulations", key: "taux_retards", value: "34", icon: "❌" },
    { title: "En attente", key: "duree_cycle_moyenne_jours", value: "216", icon: "⏳" },
  ];
  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold">Bienvenue sur le CommandeClient</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
        <KpiCards cards={cards} />
      </div>
    </div>
  );
}

