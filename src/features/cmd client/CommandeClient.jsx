import { useState, useEffect } from "react";
import { useCommandes } from "../../hooks/cmd client/useCommandes";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import KpiCards from "../../widgets/KpiCards";


const selectedKpis=[
      'nb_commandes',
      'otif',
      'taux_retards',
      'duree_cycle_moyenne_jours',
    ];

export default function CommandeClient() {
  const { kpis, loading, fetchKpis } = useCommandes();

  useEffect(() => {
    fetchKpis(["cmd_client"]);
  }, []);
  const [open, setOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState("");

  const handleSelectChange = (e) => {
    setSelectedKpi(e.target.value);
  };

 
  return (
    <>
      {!loading &&
        <div className="px-10 py-6">
          <h1 className="text-2xl font-bold">Bienvenue sur le CommandeClient</h1>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
            <KpiCards cards={kpis}  kpi={selectedKpis} />
          </div>
          <div className="py-6 right-16">
            <Button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setOpen(true)}
            >
              Ajouter un Graphe
            </Button>
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              title="Ajouter un graphique"
            >  
            <div className="flex flex-col gap-y-5">
            <Select
              label="Choisissez KPI"
              name="fruit"
              value={selectedKpi}
              onChange={handleSelectChange}
              
              required
              placeholder="Choisir KPI"
            />
            <Select
              label="Choisissez CHART"
              name="fruit"
              value={selectedKpi}
              onChange={handleSelectChange}
              options={kpis}
              required
              placeholder="Choisir Chart"
            /> 
            <Button className=" bg-blue-500 text-white px-3 py-1 rounded">
              Génerer
            </Button>
            </div>
            </Modal>
          </div>
        </div>
      }
   </>
  );
}

