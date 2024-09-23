// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate, Link } from 'react-router-dom';
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

// // Login validation schema
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// const Login = () => {
//     const { login } = useAuth(); // Access the login function

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const navigate = useNavigate();

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = (values) => {
//     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const user = existingUsers.find(
//       user => user.email === values.email && user.password === values.password
//     );

//     if (user) {
//       localStorage.setItem('loggedInUser', JSON.stringify(user));
//       login(); // Call login from AuthContext
//       setSnackbarMessage('Login successful!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       navigate('/dashboard/default');
//     } else {
//       setSnackbarMessage('Invalid email or password!');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
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
//         initialValues={{ email: '', password: '' }}
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
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Login
//             </Button>
//             <p>Don't have an account? <Link to="/register">Register</Link></p>
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

// export default Login;



import React, { useState, startTransition } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
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

// Login validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const { login } = useAuth(); // Access the login function

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = existingUsers.findIndex(
      user => user.email === values.email && user.password === values.password
    );
  
    if (userIndex !== -1) {
      const user = existingUsers[userIndex];
      
      // Generate a unique ID if the user doesn't have one
      if (!user.id) {
        user.id = Date.now(); // You can also use a UUID library if needed for more unique IDs
        existingUsers[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(existingUsers)); // Update localStorage
      }
  
      // Save the logged-in user to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      login(); // Call login from AuthContext
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
  
      // Use startTransition to defer navigation
      startTransition(() => {
        navigate('/dashboard/default');
      });
    } else {
      setSnackbarMessage('Invalid email or password!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
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

export default Login;
