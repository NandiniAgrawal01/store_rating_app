import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Box, Rating,
} from "@mui/material";

const StoreTable = ({ stores }) => {
  const [filter, setFilter] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filtered = stores.filter((store) =>
    Object.values(store).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[orderBy]?.toString().toLowerCase();
    const valB = b[orderBy]?.toString().toLowerCase();
    return order === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <TextField
        label="Filter by Name, Email or Address"
        fullWidth
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["name", "email", "address", "rating"].map((field) => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : "asc"}
                    onClick={() => handleSort(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((store, idx) => (
              <TableRow key={idx}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.email}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                <Box mt={2}>
                  <Rating
                    name={`rating-${store.id}`}
                    value={parseFloat(store.rating)}
                    precision={0.5}
                    readOnly
                  />
                </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StoreTable;
