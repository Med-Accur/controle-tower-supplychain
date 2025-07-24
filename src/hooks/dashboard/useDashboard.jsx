import { useState } from "react";
import { getTable, getDataTable } from "../../servicess/dashboard/dashboardServices";


export function useDashboard() {
  const [table, setTable] = useState([]);
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTable = async () => {
        setLoading(true);
          try {
             const data = await getTable();
             setTable(data);
           } catch (err) {
           setError(err.message);
           } finally {
            setLoading(false);
        }
    };

    const fetchDataTable = async (rpcName) => {
        setLoading(true);
          try {
          const data = await getDataTable(rpcName);
          setTableData((prev) => ({
            ...prev,
            [rpcName]: data ?? null,
          }));
        } catch (err) {
          console.error(err.message);
        }
      };

    return {
    table,
    loading,
    error,
    tableData,
    fetchTable,
    fetchDataTable
  };
}