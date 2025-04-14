import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Collapse,
  Box,
  Typography,
  Rating,
  TableSortLabel,
} from "@mui/material";

const UserTable = ({ users, onViewDetails, selectedUser }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleToggleExpand = (userId) => {
    const isExpanding = expandedUserId !== userId;
    setExpandedUserId(isExpanding ? userId : null);

    if (isExpanding && onViewDetails) {
      onViewDetails(userId);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase();
    const valB = b[sortBy]?.toString().toLowerCase();

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          {["name", "email", "role", "address"].map((col) => (
            <TableCell key={col}>
              <TableSortLabel
                active={sortBy === col}
                direction={sortBy === col ? sortDirection : "asc"}
                onClick={() => handleSort(col)}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedUsers.map((user) => (
          <React.Fragment key={user.id}>
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => handleToggleExpand(user.id)}
                >
                  {expandedUserId === user.id ? "Hide Details" : "View Details"}
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} style={{ padding: 0 }}>
                <Collapse in={expandedUserId === user.id}>
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">User Details</Typography>
                    <Typography>
                      <strong>Name:</strong> {selectedUser?.name}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {selectedUser?.email}
                    </Typography>
                    <Typography>
                      <strong>Address:</strong> {selectedUser?.address}
                    </Typography>
                    <Typography>
                      <strong>Role:</strong> {selectedUser?.role}
                    </Typography>
                    {selectedUser?.role === "storeowner" && (
                      <Box>
                        <Typography>
                          <strong>Rating:</strong>{" "}
                          <Rating
                            name={`rating-${user.id}`}
                            value={
                              selectedUser.rating
                                ? parseFloat(selectedUser.rating)
                                : 0
                            }
                            precision={0.5}
                            readOnly
                            sx={{ verticalAlign: "middle" }}
                          />{" "}
                          (
                          {selectedUser.rating
                            ? parseFloat(selectedUser.rating).toFixed(1)
                            : "0.0"}
                          )
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
