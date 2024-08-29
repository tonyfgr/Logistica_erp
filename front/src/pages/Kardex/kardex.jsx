import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import axios from "axios";

// Importa la función getAllKardexProductos
import { getAllKardexProductos } from "../../services/produccion";

const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
}) => {
  // Inicializa la referencia render
  const renderRef = useRef(true);
  
  const [kardex, setKardex] = useState([]);

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      // Llama a la función para obtener todos los datos del Kardex
      getAllKardexProductos(setKardex);
    }
  }, [renderizar]);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead
          sx={{
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit", fontStyle: "italic" }}>Item</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">ID</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Fecha</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Acción</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Motivo</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Cantidad</TableCell>
            
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Saldo</TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Producto</TableCell>
            
          </TableRow>
        </TableHead>
        <ClickAwayListener
          onClickAway={() => {
            // Manejar clics fuera de la fila seleccionada
          }}
        >
          <TableBody>
            {kardex.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
    {new Date(row.created_at).toLocaleString()}
  </TableCell>
                <TableCell align="right">{row.accion}</TableCell>
                <TableCell align="right">{row.motivo}</TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.saldo}</TableCell>
                <TableCell align="right">{row.nombre_producto}</TableCell>
                

              </TableRow>
            ))}
          </TableBody>
        </ClickAwayListener>
      </Table>
    </TableContainer>
  );
};

export default Tabla;