import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useDashboard } from "../../hooks/dashboard/useDashboard";


export default function Stock({tableInfo = []}) {
 const { tableData, loading, fetchDataTable } = useDashboard();
const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [dateFilterDays, setDateFilterDays] = useState(null);

useEffect(() => {
  const newItems = tableInfo.map((item) => item.rpc_name);
  fetchDataTable(newItems);
  
  const key = newItems[0]; 
  const tableContent = tableData[key];

  if (tableContent) {
    const rows = tableContent.map((row, index) => ({
      id: index,
      ...row,
    }));
    setData(rows);
    setFilteredData(rows);
  }
}, [tableData]);

const columns = tableInfo.flatMap((table) =>
  table.colonnes.map((col) => ({
    field: col.label,
    headerName: col.label.replace(/_/g, " ").toUpperCase(),
    width: 160,
    
  }))
);

  const applyDateFilter = (days) => {
    const now = dayjs();
    const filtered = data.filter((row) => {
      const createdAt = dayjs(row.created_at);
      return now.diff(createdAt, "day") <= days;
    });

    setDateFilterDays(days);
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilteredData(data);
    setDateFilterDays(null);
  };


console.log( columns)

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tableau avec colonnes de dates et filtres (MUI)
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={dateFilterDays === 1 ? "contained" : "outlined"}
          onClick={() => applyDateFilter(1)}
        >
          Dernier 1 jour
        </Button>
        <Button
          variant={dateFilterDays === 7 ? "contained" : "outlined"}
          onClick={() => applyDateFilter(7)}
        >
          Derniers 7 jours
        </Button>
        <Button
          variant={dateFilterDays === 15 ? "contained" : "outlined"}
          onClick={() => applyDateFilter(15)}
        >
          Derniers 15 jours
        </Button>
        <Button
          variant={dateFilterDays === 30 ? "contained" : "outlined"}
          onClick={() => applyDateFilter(30)}
        >
          Derniers 30 jours
        </Button>
        <Button variant="text" onClick={resetFilter}>
          Réinitialiser
        </Button>
      </Stack>

      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </Container>
  );
}
