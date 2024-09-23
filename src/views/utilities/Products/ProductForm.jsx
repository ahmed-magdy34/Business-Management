import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams, Link } from "react-router-dom";

// Snackbar Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductForm = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    productName: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(true); // Loading state for fetching product data
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  useEffect(() => {
    if (id) {
      // If editing, load the product data from localStorage
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const productToEdit = savedProducts.find((product) => product.id === parseInt(id));
      if (productToEdit) {
        setInitialValues({
          productName: productToEdit.name,
          price: productToEdit.price,
          category: productToEdit.category,
        });
      }
    }
    setLoading(false); // Stop loading once product data is fetched or no product to edit
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // This will reinitialize formik when initialValues change
    validationSchema: Yup.object({
      productName: Yup.string()
        .required("Product Name is required")
        .min(3, "Product Name must be at least 3 characters"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number")
        .min(1, "Price must be greater than 0"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      if (id) {
        // If editing, update the existing product
        const updatedProducts = savedProducts.map((product) =>
          product.id === parseInt(id)
            ? { ...product, name: values.productName, price: values.price, category: values.category }
            : product
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setSnackbarMessage("Product updated successfully!"); // Set snackbar message
      } else {
        // If adding a new product
        const newProduct = {
          id: savedProducts.length ? Math.max(...savedProducts.map(p => p.id)) + 1 : 1,
          name: values.productName,
          price: values.price,
          category: values.category,
        };
        savedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(savedProducts));
        setSnackbarMessage("Product added successfully!"); // Set snackbar message
      }

      setSnackbarOpen(true); // Show the snackbar
      setTimeout(() => {
        navigate("/utils/products-view"); // Redirect back to the products table after a short delay
      }, 2000);
    },
  });

  // Close Snackbar handler
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Display a loading spinner while fetching product data
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      {id && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/utils/products-view"
          >
            Back
          </Button>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        {id ? "Edit Product" : "Add Product"}
      </Typography>
      <TextField
        id="product-name"
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="productName"
        value={formik.values.productName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.productName && Boolean(formik.errors.productName)}
        helperText={formik.touched.productName && formik.errors.productName}
      />
      <TextField
        id="price"
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        name="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Category"
          error={formik.touched.category && Boolean(formik.errors.category)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
        </Select>
        {formik.touched.category && formik.errors.category ? (
          <Typography variant="body2" color="error">
            {formik.errors.category}
          </Typography>
        ) : null}
      </FormControl>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        {id ? "Update Product" : "Submit"}
      </Button>

      {/* Snackbar for showing success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
