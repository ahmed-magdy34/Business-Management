// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// const ProductTable = ({ onEdit, onDelete }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Load products from localStorage on component mount
//     const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     setProducts(savedProducts);
//   }, []);

//   const handleDelete = (id) => {
//     const updatedProducts = products.filter((product) => product.id !== id);
//     setProducts(updatedProducts);
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <Button
//           variant="contained"
//           color="primary"
//           component={Link}
//           to="/utils/Products-form"
//         >
//           Add Product
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Product ID</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.id}</TableCell>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => onEdit(product.id)} color="primary">
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product.id)} color="secondary">
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ProductTable;

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load products from localStorage on component mount
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleEdit = (id) => {
    // Redirect to the form with the product ID for editing
    navigate(`/utils/Products-form/${id}`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/utils/Products-form"
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product.id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
