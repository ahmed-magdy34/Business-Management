import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
});

// Snackbar Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Reusable TextField component to avoid repetition
const CustomTextField = ({ name, label, type = "text", touched, errors }) => (
  <Field
    as={TextField}
    id={name}
    name={name}
    label={label}
    variant="outlined"
    fullWidth
    margin="normal"
    type={type}
    error={touched[name] && !!errors[name]}
    helperText={touched[name] && errors[name]}
    aria-describedby={touched[name] && errors[name] ? `${name}-error` : undefined}
  />
);

// Function to save user to local storage
const saveUser = (values) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const newUserId = storedUsers.length ? storedUsers[storedUsers.length - 1].id + 1 : 1;

  const newUser = {
    id: newUserId,
    name: values.userName,
    email: values.email,
    password: values.password,
    role: values.role,
    status: values.status,
  };

  storedUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(storedUsers));
};

const UserForm = () => {
  const navigate = useNavigate();
  
  // State to manage snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    saveUser(values);
    resetForm();
    setSnackbarOpen(true);
    
    // Navigate back to the products table after snackbar
    setTimeout(() => {
      navigate("/utils/users-view");
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        status: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/utils/users-view"
            >
              Back
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            User Information
          </Typography>

          <CustomTextField name="userName" label="User Name" touched={touched} errors={errors} />
          <CustomTextField name="email" label="Email Address" type="email" touched={touched} errors={errors} />
          <CustomTextField name="password" label="Password" type="password" touched={touched} errors={errors} />
          <CustomTextField name="confirmPassword" label="Confirm Password" type="password" touched={touched} errors={errors} />

          <FormControl fullWidth margin="normal" error={touched.role && !!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="role-label"
              id="role"
              name="role"
              label="Role"
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Field>
            <ErrorMessage name="role" component="div" style={{ color: 'red' }} />
          </FormControl>

          <FormControl fullWidth margin="normal" error={touched.status && !!errors.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Field
              as={Select}
              labelId="status-label"
              id="status"
              name="status"
              label="Status"
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Field>
            <ErrorMessage name="status" component="div" style={{ color: 'red' }} />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Submit
          </Button>

          {/* Snackbar for feedback */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              User added successfully!
            </Alert>
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
