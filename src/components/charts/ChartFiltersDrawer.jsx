import { useState, useEffect } from "react";

// Ce composant affiche un panneau latéral (drawer) contenant des filtres dynamiques
export default function ChartFiltersDrawer({ isOpen, onClose, onApply, filterSchema = [] }) {
  // État local pour stocker les valeurs des filtres sélectionnés
  const [localFilters, setLocalFilters] = useState({});

  // À chaque changement de filterSchema, on initialise les filtres avec des valeurs vides
  useEffect(() => {
    const empty = {};

    // Si filterSchema est une chaîne JSON, on la parse
    if (filterSchema && typeof filterSchema === "string") {
      try {
        filterSchema = JSON.parse(filterSchema);
      } catch (e) {
        console.error("Erreur parsing filtreSchema", e);
      }
    }

    // On initialise chaque filtre selon son type ("" pour date, [] pour select multiple)
    filterSchema?.forEach((f) => {
      empty[f.label] = f.type === "select" ? [] : "";
    });

    setLocalFilters(empty);
  }, [filterSchema]);

  // Gère les changements pour les inputs simples (comme les dates)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Gère les changements pour les champs "select multiple"
  const handleArrayChange = (name, values) => {
    setLocalFilters((prev) => ({ ...prev, [name]: values }));
  };

  // Applique les filtres sélectionnés (envoie les données au parent)
  const handleApply = () => {
    onApply(localFilters);
  };

  // Réinitialise les filtres à leurs valeurs vides et les applique
  const handleReset = () => {
    const empty = {};
    filterSchema?.forEach((f) => {
      empty[f.label] = f.type === "select" ? [] : "";
    });
    setLocalFilters(empty);
    onApply(empty);
  };

  // Si le drawer est fermé, on n'affiche rien
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[350px] h-full bg-white shadow-xl z-50 border-l border-gray-200 overflow-y-auto">
      {/* En-tête avec le titre et le bouton de fermeture */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Filtres du graphique</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-lg">✕</button>
      </div>

      {/* Contenu du drawer : champs de filtres dynamiques */}
      <div className="p-5 space-y-6 text-sm">
        {filterSchema?.map((f) => {
          // Champ de type date
          if (f.type === "date") {
            return (
              <div key={f.label}>
                <label>{f.label}</label>
                <input
                  type="date"
                  name={f.label}
                  value={localFilters[f.label] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            );
          }

          // Champ de type select multiple
          if (f.type === "select") {
            return (
              <div key={f.label}>
                <label>{f.label}</label>
                <select
                  multiple
                  name={f.label}
                  value={localFilters[f.label] || []}
                  onChange={(e) =>
                    handleArrayChange(f.label, Array.from(e.target.selectedOptions, (opt) => opt.value))
                  }
                  className="w-full border px-3 py-2 rounded h-32"
                >
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return null; // Si le type n'est pas reconnu
        })}

        {/* Boutons Appliquer et Réinitialiser */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handleApply}
            className="w-[48%] bg-blue-600 text-white py-2 rounded"
          >
            Appliquer
          </button>
          <button
            onClick={handleReset}
            className="w-[48%] bg-gray-300 text-gray-800 py-2 rounded"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
