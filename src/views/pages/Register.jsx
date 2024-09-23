// import React, { startTransition } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';

// import { useAuth } from '../../store/AuthContext'; 
// import Logo from 'ui-component/Logo';





// // Snackbar Alert Component
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// // Registration validation schema
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

// const Register = () => {
//     const { login } = useAuth(); // Access the login function
//   const [snackbarOpen, setSnackbarOpen] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
//   const navigate = useNavigate();

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const userExists = existingUsers.some(user => user.email === values.email);
  
//     if (userExists) {
//       setSnackbarMessage('User already exists!');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     } else {
//       const newUser = {
//         email: values.email,
//         password: values.password,
//       };
//       existingUsers.push(newUser);
//       localStorage.setItem('users', JSON.stringify(existingUsers));
//       resetForm();
//       setSnackbarMessage('Registration successful!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
  
//       // Use startTransition to handle navigation smoothly
//       startTransition(() => {
//         navigate('/login');
//       });
//     }
//   };
//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         margin: 'auto',
//         padding: 3,
//         borderRadius: 2,
//         boxShadow: 3,
//         backgroundColor: 'background.paper',
//         marginTop:'10%'
//       }}
//     >
//       <Typography variant="h5" gutterBottom align="center">
//          <Logo />
//       </Typography>
//       <Formik
//         initialValues={{ email: '', password: '', confirmPassword: '' }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <Box mb={2}>
//               <Field
//                 as={TextField}
//                 name="email"
//                 type="email"
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 helperText={<ErrorMessage name="email" />}
//                 error={touched.email && Boolean(errors.email)}
//               />
//             </Box>
//             <Box mb={2}>
//               <Field
//                 as={TextField}
//                 name="password"
//                 type="password"
//                 label="Password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 helperText={<ErrorMessage name="password" />}
//                 error={touched.password && Boolean(errors.password)}
//               />
//             </Box>
//             <Box mb={2}>
//               <Field
//                 as={TextField}
//                 name="confirmPassword"
//                 type="password"
//                 label="Confirm Password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 helperText={<ErrorMessage name="confirmPassword" />}
//                 error={touched.confirmPassword && Boolean(errors.confirmPassword)}
//               />
//             </Box>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Register
//             </Button>
//             <p>Already have an account! <a href="/free/login">Login</a></p>
//           </Form>
//         )}
//       </Formik>

//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Register;



import React, { startTransition } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useAuth } from '../../store/AuthContext'; 
import Logo from 'ui-component/Logo';

// Snackbar Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Registration validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'), // Added validation for name
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const { login } = useAuth(); // Access the login function
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.email === values.email);
  
    if (userExists) {
      setSnackbarMessage('User already exists!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } else {
      const newUser = {
        name: values.name, // Include the name in the new user object
        email: values.email,
        password: values.password,
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      resetForm();
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
  
      // Use startTransition to handle navigation smoothly
      startTransition(() => {
        navigate('/login');
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
        marginTop: '10%',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        <Logo />
      </Typography>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} // Added name to initial values
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="name" />}
                error={touched.name && Boolean(errors.name)}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="email" />}
                error={touched.email && Boolean(errors.email)}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                error={touched.password && Boolean(errors.password)}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="confirmPassword" />}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            <p>Already have an account! <a href="/free/login">Login</a></p>
          </Form>
        )}
      </Formik>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
