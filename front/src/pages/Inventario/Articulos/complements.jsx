// complements.jsx
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { getAllKardexProductos } from "../../../services/produccion";

export const Tabla = () => {
  const [kardex, setKardex] = useState([]);
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    getAllKardexProductos(setKardex);
  }, []);

  useEffect(() => {
    const productosUnicos = {};
    kardex.forEach((item) => {
      productosUnicos[item.nombre_producto] = item;
    });
    setInventario(Object.values(productosUnicos));
  }, [kardex]);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead
          sx={{
            backgroundColor: "#f0f0f0",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit", fontStyle: "italic" }}>Item</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">ID</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Producto</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventario.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.nombre_producto}</TableCell>
              <TableCell align="right">{row.saldo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
