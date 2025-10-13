import { useState } from "react";
import { X } from "lucide-react";

export default function ChartFilter({ filter = [], onClose, onApply }) {
  const [values, setValues] = useState({});

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed top-0 right-0 z-50 w-72 h-full bg-white shadow-xl border-l border-gray-200 flex flex-col p-4">
      {/* Header */}
      <div className="bg-[#f0ede5] h-16 flex justify-between items-center px-4 mb-4">
        <h2 className="text-lg font-bold">Filtres</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Champs dynamiques */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filter.map((f) => {
          if (f.type === "date") {
            return (
              <div key={f.label}>
                <label className="block text-sm mb-1 capitalize">
                  {f.label.replace("_", " ")}
                </label>
                <input
                  type="date"
                  className="border px-2 py-1 rounded w-full"
                  onChange={(e) => handleChange(f.label, e.target.value)}
                />
              </div>
            );
          }
          if (f.type === "select") {
            return (
              <div key={f.label}>
                <label className="block text-sm mb-1 capitalize">
                  {f.label.replace("_", " ")}
                </label>
                <select
                  className="border px-2 py-1 rounded w-full"
                  onChange={(e) => handleChange(f.label, e.target.value)}
                >
                  <option value="">Tous</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Footer */}
      <button
        onClick={() => onApply(values)}
        className="mt-4 px-4 py-2 bg-[#bfa76f] text-white rounded hover:bg-blue-700"
      >
        Appliquer
      </button>
    </div>
  );
}
