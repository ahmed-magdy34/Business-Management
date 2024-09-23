import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Snackbar Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Validation schema using Yup
const validationSchema = Yup.object({
  product: Yup.string().required('Product is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer'),
  customerName: Yup.string().required('Customer name is required'),
  customerEmail: Yup.string()
    .email('Invalid email address')
    .required('Customer email is required'),
});

const OrderForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [products, setProducts] = useState([]); // Store products

  // Close Snackbar handler
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    // Load products from localStorage on component mount
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  // Initial form values
  const initialValues = {
    product: '',
    quantity: '',
    customerName: '',
    customerEmail: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const newOrder = {
      id: uuidv4(),
      product: values.product, // This is the product name
      quantity: values.quantity,
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      totalAmount: values.quantity, // Assuming quantity is the total amount for simplicity
    };


    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);

    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Set the success message and show the snackbar
    setSnackbarMessage('Order placed successfully!');
    setSnackbarOpen(true);

    // Reset form
    resetForm();

    // Navigate to the order view page after a short delay
    setTimeout(() => {
      navigate('/utils/order-view');
    }, 2000);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" component={Link} to="/utils/order-view">
          Back
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Order Form
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormControl fullWidth margin="normal">
              <InputLabel id="product-label">Product</InputLabel>
              <Field
                as={Select}
                labelId="product-label"
                id="product"
                name="product"
                label="Product"
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products.length > 0
                  ? products.map((product) => (
                    <MenuItem key={product.id} value={product.name}>
                      {product.name}
                    </MenuItem>
                  ))
                  : (
                    <MenuItem disabled>No products available</MenuItem>
                  )}
              </Field>
              <ErrorMessage name="product" component="div" style={{ color: 'red' }} />
            </FormControl>

            <Field
              as={TextField}
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
            />
            <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />

            <Field
              as={TextField}
              id="customerName"
              name="customerName"
              label="Customer Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="customerName" component="div" style={{ color: 'red' }} />

            <Field
              as={TextField}
              id="customerEmail"
              name="customerEmail"
              label="Customer Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
            />
            <ErrorMessage name="customerEmail" component="div" style={{ color: 'red' }} />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {/* Snackbar for showing success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >

          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderForm;
