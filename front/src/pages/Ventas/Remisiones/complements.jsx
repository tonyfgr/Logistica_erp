//para la tabla
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

import { styled, useTheme, alpha } from "@mui/material/styles";

import { useState, useEffect } from "react";
import {
  get,
  searcherprov,
  post_put,
  del,
} from "../../../services/mantenimiento";

import { formateoFecha } from "../../../services/compras";
import { getRemisiones, deleteRemision, searcherRemisiones } from "../../../services/ventas";
import Swal from "sweetalert2";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
}) => {

  const [remisiones, setRemisiones] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      getRemisiones(setRemisiones);
    }
  }, [renderizar]);

  let data = searcherRemisiones(fields, remisiones);


  const handleView = (row) => {
    setItemView(row);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: '¿Desea eliminar la remisión y subremisiones?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: `NO`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteRemision(id);
          Swal.fire('Eliminado', '', 'success')
          render.current = true;
          setRenderizar(!renderizar);
          setItem({});
        } 
      })
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

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
            <TableCell
              sx={{
                color: "#633256",
                fontFamily: "inherit",
                fontStyle: "italic",
              }}
            >
              Item
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Código
            </TableCell> <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              N° de Factura
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Cliente
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Trabajador
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha de Remision
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Total Remisión
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.codigo}</TableCell>
              <TableCell align="right">{row.numero_factura}</TableCell>
              <TableCell align="right">{row.cliente}</TableCell>
              <TableCell align="right">{row.trabajador?row.trabajador.codigo:'-'}</TableCell>
              <TableCell align="right">{formateoFecha(row.fecha)}</TableCell>
              <TableCell align="right">S/. {row.totalRemision}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(row)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(row.id)}
                  aria-label="delete"
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};