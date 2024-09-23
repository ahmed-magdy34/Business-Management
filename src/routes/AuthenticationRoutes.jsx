import React from 'react';
import { lazy } from 'react';
import MinimalLayout from 'layout/MinimalLayout';

// Lazy-loaded components for authentication pages
const Login = lazy(() => import('views/pages/Login'));
const Register = lazy(() => import('views/pages/Register'));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
  ]
};

export default AuthenticationRoutes;
