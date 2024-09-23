import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from '../store/ProtectedRoute'; // Protect routes
import { Navigate } from 'react-router-dom';

// Lazy-loaded components
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const OrderTable = Loadable(lazy(() => import('views/utilities/Orders/OrderTable')));
const ProductsForm = Loadable(lazy(() => import('views/utilities/Products/ProductForm')));
const OrdersForm = Loadable(lazy(() => import('views/utilities/Orders/OrderForm')));
const UserForm = Loadable(lazy(() => import('views/utilities/Users/UserForm')));
const UserTable = Loadable(lazy(() => import('views/utilities/Users/UserTable')));
const ProductTable = Loadable(lazy(() => import('views/utilities/Products/ProductTable')));

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute><MainLayout /></ProtectedRoute>, // Protect MainLayout
  children: [
    // Redirect to login if no route matches
    { path: '/', element: <Navigate to="/login" /> },

    // Dashboard routes
    {
      path: 'dashboard',
      children: [
        { path: 'default', element: <ProtectedRoute><DashboardDefault /></ProtectedRoute> }
      ]
    },

    // Utilities routes
    {
      path: 'utils',
      children: [
        // Tables
        { path: 'order-view', element: <ProtectedRoute><OrderTable /></ProtectedRoute> },
        { path: 'users-view', element: <ProtectedRoute><UserTable /></ProtectedRoute> },
        { path: 'products-view', element: <ProtectedRoute><ProductTable /></ProtectedRoute> },

        // Forms for creating/updating
        { path: 'orders-form', element: <ProtectedRoute><OrdersForm /></ProtectedRoute> },
        { path: 'products-form', element: <ProtectedRoute><ProductsForm /></ProtectedRoute> },
        { path: 'user-form', element: <ProtectedRoute><UserForm /></ProtectedRoute> },

        // Editing existing products (with dynamic ID parameter)
        { path: 'products-form/:id', element: <ProtectedRoute><ProductsForm /></ProtectedRoute> }
      ]
    }
  ]
};

export default MainRoutes;
