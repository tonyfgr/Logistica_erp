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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { styled, useTheme, alpha } from "@mui/material/styles";

import { useState, useEffect } from "react";
import {
  get,
  searcherprov,
  post_put,
  del,
} from "../../../services/mantenimiento";
import { getRequermientos, postRequerimientos, delRequerimientos } from "../../../services/requerimientos";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
}) => {
  const URL = "api/mantenimientos/provincias/";
  const [provincias, setProvincias] = useState([]);
  const [req, setReq] = useState([])
  useEffect(() => {
    if (render.current) {
      render.current = false;
      // get(setProvincias, URL);
      getRequermientos(setReq)
    }
  }, [renderizar]);

  let data = searcherprov(fields, req);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleDelete = async (id) => {
    try {
      let res = await delRequerimientos(id);
      render.current = true;
      setRenderizar(!renderizar);
      return res;
    } catch (error) {
      return error;
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
              align="center"
            >
              Código
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="center"
            >
              Área solicitante
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="center"
            >
              Fecha de Registro
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="center"
            >
              Bien o servicio
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
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.area_solicitante.nombre}</TableCell>
              <TableCell align="center">{row.fecha_registro}</TableCell>
              {/* <TableCell align="center" sx={{ backgroundColor: "#633256", fontFamily: "inherit", color:'white' }} >
                {row.fecha_registro}
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{ color: 'white' }}
                  aria-describedby="Cambiar de estado"
                >
                  <ChangeCircleIcon fontSize="inherit" />
                </IconButton>
              </TableCell> */}
              <TableCell align="center">{row.tipo}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(row)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                {/* <IconButton
                  onClick={() => handlePut(row)}
                  aria-label="delete"
                  size="small"
                  color="success"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton> */}
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
