import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {ShoppingCart}  from "@mui/icons-material";

import LocalAtmIcon from '@mui/icons-material/LocalAtm';



// constant
const icons = {
  DashboardIcon,
  PersonIcon,
  AssignmentIcon,
  ShoppingCart,
  LocalAtmIcon

};

// ==============================|| Tasks MENU ITEMS ||============================== //

const Tasks = {
  id: 'tasks',
  title: 'Tasks',
  type: 'group',
  children: [
    {
      id: 'user',
      title: 'User',
      type: 'item',
      url: '/utils/users-view',
      icon: icons.PersonIcon,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/utils/order-view',
      icon: icons.AssignmentIcon,
      breadcrumbs: false
    },

    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/utils/products-view',
      icon: icons.ShoppingCart,
      breadcrumbs: false
    },
  ]
};

export default Tasks;
