import { useEffect, useState } from "react";
import useChartFilters from "../../hooks/cmd client/useChartFilters";
import Modal from "../ui/Modal"; 

export default function ChartFiltersModal({ isOpen, onClose, onApply, rpc_name, initialFilters }) {
  const { allStatuts, allModes } = useChartFilters();
  const [localFilters, setLocalFilters] = useState(initialFilters || {});
  const showStatut = rpc_name === "get_nb_commandes";
 // const showModeLivraison = !["get_otif_moyenne_par_mode", "get_taux_retards_par_mode"].includes(rpc_name);

  useEffect(() => {
    if (isOpen) setLocalFilters(initialFilters);
  }, [isOpen, initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, values) => {
    setLocalFilters((prev) => ({ ...prev, [name]: values }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtres">
      <div className="space-y-4 text-sm">
        {/* 📅 Dates */}
        <div>
          <label>Date de début :</label>
          <input
            type="date"
            name="start_date"
            value={localFilters.start_date || ""}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <input
            type="date"
            name="end_date"
            value={localFilters.end_date || ""}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {/* 🚚 Mode de livraison */}
        {/*showModeLivraison && */(
          <div>
            <label>Mode de livraison :</label>
            <select
              multiple
              name="mode_livraison"
              value={localFilters.mode_livraison || []}
              onChange={(e) =>
                handleArrayChange("mode_livraison", Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              className="w-full border px-2 py-1 rounded h-24"
            >
              {allModes.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
       //
        )}

        {/* 📦 Statuts */}
        {showStatut && (
          <div>
            <label>Statuts :</label>
            <select
              multiple
              name="statut"
              value={localFilters.statut || []}
              onChange={(e) =>
                handleArrayChange("statut", Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              className="w-full border px-2 py-1 rounded h-24"
            >
              {allStatuts.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleApply}
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Appliquer les filtres
        </button>
      </div>
    </Modal>
  );
}
