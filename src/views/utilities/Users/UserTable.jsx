import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { Block, CheckCircle, Delete } from "@mui/icons-material"; 
import { Link } from "react-router-dom"; 

const UserTable = () => {
  const [users, setUsers] = useState([]);

  // Helper function to update local storage
  const updateLocalStorage = (updatedUsers) => {
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to update local storage:", error);
    }
  };

  useEffect(() => {
    try {
      // Fetch users from local storage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }, []);

  // Memoized delete handler
  const handleDelete = useCallback((userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  }, [users]);

  // Memoized block handler
  const handleBlock = useCallback((userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: "Blocked" } : user
    );
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  }, [users]);

  // Memoized unblock handler
  const handleUnblock = useCallback((userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: "Active" } : user
    );
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  }, [users]);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/utils/user-form"
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {users.length > 0 ? (
    users.map((user) => (
      <TableRow key={String(user.id)}> {/* Ensure key is a string */}
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.status}</TableCell>
        <TableCell>
          <Tooltip title={user.status === "Blocked" ? "Unblock" : "Block"}>
            <IconButton
              color={user.status === "Blocked" ? "default" : "secondary"}
              onClick={() =>
                user.status === "Blocked"
                  ? handleUnblock(user.id)
                  : handleBlock(user.id)
              }
            >
              {user.status === "Blocked" ? <CheckCircle /> : <Block />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(user.id)} color="secondary">
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No users found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
