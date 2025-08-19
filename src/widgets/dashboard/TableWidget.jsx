import { useEffect, useState, useRef } from "react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import {ListFilterPlus, RotateCw } from "lucide-react";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import Select from "../../components/ui/Select";

export default function TableWidget({ tableInfo = [] }) {
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const [act, setAct] = useState(false);
  const [filterData, setFilterData] = useState({});
  const { tableData, fetchDataTable } = useDashboard();
  const [paginationStates, setPaginationStates] = useState({});
  const fetchedTablesRef = useRef(new Set());
  
  useEffect(() => {
        const newTable = tableInfo.map((item) => item.key).filter((key) => !fetchedTablesRef.current.has(key));
        if (newTable.length === 0 && Object.keys(filterData).length === 0 && !act) return;
         
        const newItems = tableInfo.map((item) => item.rpc_name);
        fetchDataTable(newItems, filterData);
        fetchedTablesRef.current.add(...newTable);
        setFilterData({});
        setAct(false);
    }, [tableInfo, send]); 

  const filtreTable = () => {
     setOpen(false);
     setSend(!send);
    };

  const handlePageChange = (tableKey, newPage) => {
        setPaginationStates((prev) => ({
        ...prev,
        [tableKey]: {
            ...(prev[tableKey] || {}),
            currentPage: newPage,
        },
        }));
   };

   console.log(filterData)
   
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
            className="bg-white rounded-2xl border border-[#D6D6D6] bg-[#F9FAFB] p-5 shadow-sm"
          >
            <div className="flex m-1 justify-between items-center mt-1 text-sm">
              <h2 className="text-xl font-semibold mb-2">{table.nom}</h2>
              <div className="flex space-x-1">
                <Button 
                onClick={() => {const today = new Date().toISOString().split('T')[0];
                                    setFilterData(prev => ({...prev,
                                                [`date_min`]: today
                                    }));;
                                    setAct(true);filtreTable()}} 
                className="no-drag inline-flex items-center rounded-lg border border-gray-300 bg-white p-1 font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50">
                    Aujourd'hui
                </Button>
                <Button  
                    onClick={() => {const last15days = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
;
                                    setFilterData(prev => ({...prev,
                                                [`date_min`]: last15days
                                    }));;
                                    setAct(true);filtreTable()}}
                className="no-drag inline-flex items-center rounded-lg border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50">
                    Derniers 15 jours
                </Button>
                <Button  
                 onClick={() => {const last30days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
;
                                    setFilterData(prev => ({...prev,
                                                [`date_min`]: last30days
                                    }));;
                                    setAct(true);filtreTable()}}
                className="no-drag inline-flex items-center rounded-lg border border-gray-300 bg-white p-1 font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50">
                    Derniers 30 jours
                </Button>
              <Button onClick={() => setOpen(true)} className="no-drag inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 ">
                <ListFilterPlus className="w-5 h-5"/>Filtre
              </Button>
              <Button onClick={() => { setAct(true); filtreTable(); }} className="no-drag inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 ">
                <RotateCw  className="w-5 h-5"/>
              </Button>
              </div>
            </div>
            <table className="no-drag min-w-full text-sm text-gray-700">
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

            <Modal 
              isOpen={open}
              onClose={() => setOpen(false)}
              title={`Filtrer ${tableInfo[0].nom}`}
            >
                {tableInfo.map((col, i) => {
                  return ( 
                    <div key={i}>
                      {col.filtre.map((k, i) => (
                        <div key={i}>
                          {k.type === "select" ? (
                            <Select
                              key={i}
                              value={filterData[k.label] || ""}
                              label={k.label}
                              options={k.options}
                              onChange={(e) => {
                                setFilterData(prev => ({
                                  ...prev,
                                  [`${k.label}`]: e.target.value
                                }));
                              }}
                            />
                          ) : (
                            <Input
                              type={k.type}
                              label={k.label}
                              placeholder={`${k.label}`}
                              className="mb-4"
                              onChange={(e) => {
                                setFilterData(prev => ({
                                ...prev,
                                [`${k.label}`]: e.target.value
                                }));
                            }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
                <Button className='w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={() => { filtreTable()}}>Filtrer</Button>
            </Modal>
    </>
  );
}



