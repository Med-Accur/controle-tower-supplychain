import { useEffect, useState, useRef } from "react";
import Button from "../../components/ui/Button";
import {ListFilterPlus} from "lucide-react";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function TableWidget({ tableInfo = [] }) {
  const { tableData, loading, fetchDataTable } = useDashboard();
  const fetchedTableRef = useRef(new Set());
  const [paginationStates, setPaginationStates] = useState({});

  useEffect(() => {
    const newItems = tableInfo.filter((item) => !fetchedTableRef.current.has(item.key));
    if (newItems.length === 0) return;

    newItems.forEach((item) => {
      fetchDataTable(item.rpc_name);
      fetchedTableRef.current.add(item.key);
    });
  }, [tableInfo]);

  
  const handlePageChange = (tableKey, newPage) => {
    setPaginationStates((prev) => ({
      ...prev,
      [tableKey]: {
        ...(prev[tableKey] || {}),
        currentPage: newPage,
      },
    }));
  };
 
  return (
    <>
      { tableInfo.map((table) => {
        const currentPage = paginationStates[table.key]?.currentPage || 1;
        const totalPages = Math.ceil(tableData[table.rpc_name]?.length / 7);
        const indexOfLastItem = currentPage * 7;
        const indexOfFirstItem = indexOfLastItem - 7;
        const currentItems = tableData[table.rpc_name]?.slice(indexOfFirstItem, indexOfLastItem);

        return (
          <div
            key={table.key}
            className="overflow-auto bg-white rounded-2xl border border-[#D6D6D6] bg-[#F9FAFB] p-5 shadow-sm md:p-6"
          >
            <div className="flex m-2 justify-between items-center mt-3 text-sm">
              <h2 className="text-xl font-semibold mb-2">{table.nom}</h2>
              <Button className="no-drag inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800">
                <ListFilterPlus className="w-5 h-5"/>Filter
              </Button>
            </div>
            <table className=" min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-[#f0eee9] text-left text-sm text-[#A79882] font-medium">
                  {table.colonnes.map((col, i) => (
                    <th key={i} className="px-3 py-2 text-left capitalize">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                { currentItems?.map((row, j) => (
                  <tr key={j} className="hover:bg-gray-50">
                    {table.colonnes.map((col, colIndex) => {
                      const cellValue = row[col.field];
                      if (col.field === "retard") {
                        const colorClass =
                          cellValue?.toLowerCase() === "oui"
                            ? " inline-flex items-center justify-center gap-1 rounded-full font-medium text-red-700 bg-red-100 font-semibold"
                            : cellValue?.toLowerCase() === "non"
                            ? " inline-flex items-center justify-center gap-1 rounded-full font-medium text-green-600 bg-green-100 font-semibold"
                            : "";
                        return (
                          <td key={colIndex} className={`px-3 py-2 rounded ${colorClass}`}>
                            {cellValue}
                          </td>
                        );
                      }
                      return (
                        <td key={colIndex} className="px-3 py-3">
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            
              <div className="flex justify-between items-center mt-3 text-sm">
                <Button
                  onClick={() => handlePageChange(table.key, currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 no-drag"
                >
                  Précédent
                </Button>

                <Button
                  onClick={() => handlePageChange(table.key, currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 no-drag"
                >
                  Suivant
                </Button>
              </div>
          </div>
        );
      })}
    </>
  );
}



