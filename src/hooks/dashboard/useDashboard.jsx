import { useState } from "react";
import { getTable,getMap, getDataMap, getDataTable } from "../../servicess/dashboard/dashboardServices";


export function useDashboard() {
  const [table, setTable] = useState([]);
  const [map, setMap] = useState([]);
  const [mapData, setMapData] = useState({});
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

    const fetchDataTable = async (rpcName, params = {}) => {
        setLoading(true);
          try {
          const data = await getDataTable(rpcName, params);
          setTableData((prev) => ({
            ...prev,
            [rpcName]: data ?? null,
          }));
        } catch (err) {
          console.error(err.message);
        }
      };

      const fetchMap = async () => {
        setLoading(true);
          try {
             const data = await getMap();
             setMap(data);
           } catch (err) {
           setError(err.message);
           } finally {
            setLoading(false);
        }
    };

    const fetchDataMap = async (rpcName, params = {}) => {
        setLoading(true);
          try {
          const data = await getDataMap(rpcName, params);
          setMapData((prev) => ({
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
    map,
    mapData,
    fetchTable,
    fetchDataTable,
    fetchMap,
    fetchDataMap
  };
}