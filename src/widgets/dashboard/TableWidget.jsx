import { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import Select from "../../components/ui/Select";

export default function TableWidget({ tableInfo = [] }) {
  const [t, setT] = useState(null);
  const { tableData, fetchDataTable } = useDashboard();
  console.log("tableData", tableData)

  console.log("tableInfo", tableInfo)
  useEffect(() => {
     setT(tableInfo[0]?.rpc_name);
    if (t) {
        fetchDataTable(t);
    }
  }, [t]);

console.log("t", t)
   const rows = (tableData?.[tableInfo[0]?.rpc_name] || []).map((row, index) => ({
  ...row,
  _rowId: index, // clé unique générée
}));
const columnLabels = tableInfo[0]?.colonnes.map(col => ({
  field: col.field,          
  headerName: col.label, 
}));
console.log("columnLabels", columnLabels)
  return (
    <>
 
    {tableData && tableInfo[0]?.colonnes.length > 0 && (
     <div className="overflow-auto bg-white rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 shadow-md md:p-6 cursor-move handle">
  <Box className="no-drag" sx={{ height: 400, width: "100%" }}>
    <DataGrid
      key={(row) => row._rowId}
      rows={rows}
      columns={columnLabels || []}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      getRowId={(row) => row._rowId}
      disableSelectionOnClick
      sx={{
        border: "none",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F3F4F6",
          color: "#374151",
          fontWeight: "bold",
          fontSize: "0.95rem",
          borderBottom: "1px solid #E5E7EB",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #F3F4F6",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#F9FAFB",
        },
        "& .MuiCheckbox-root": {
          color: "#4F46E5 !important", // Indigo accent pour les checkboxes
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#F9FAFB",
        },
        "& .MuiTablePagination-root": {
          color: "#6B7280",
        },
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          backgroundColor: "#FAFAFA", // zebra stripes
        },
      }}
    />
  </Box>
</div>

    )}
  </>
  );
}



