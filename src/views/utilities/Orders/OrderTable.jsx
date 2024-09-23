import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false); // Modal control state
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order details

  useEffect(() => {
    // Load orders from localStorage on component mount
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  // Handle view order: show modal with order details
  const handleView = (id) => {
    const orderToView = orders.find(order => order.id === id);
    setSelectedOrder(orderToView);
    setOpen(true);
  };

  // Handle close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null); // Clear selected order after closing
  };

  // Handle delete order
  const handleDelete = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/utils/orders-form"
        >
          Add Order
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.product}</TableCell> {/* Use order.product */}
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(order.id)} color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Modal for viewing order details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <>
              <DialogContentText>
                <strong>Order ID:</strong> {selectedOrder.id}
              </DialogContentText>
              <br />

              <DialogContentText>
                <strong>Product Name:</strong> {selectedOrder.product}
              </DialogContentText>
              <br />


              <DialogContentText>
                <strong>Customer Name:</strong> {selectedOrder.customerName}
              </DialogContentText>
              <br />

              <DialogContentText>
                <strong>Total Amount:</strong> {selectedOrder.totalAmount}
              </DialogContentText>
              {/* Add more details here if necessary */}
            </>
          ) : (
            <DialogContentText>No details available.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderTable;
