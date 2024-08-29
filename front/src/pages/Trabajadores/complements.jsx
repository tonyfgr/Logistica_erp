import { useState, useContext, useEffect } from "react";

//para la tabla
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled, useTheme, alpha } from "@mui/material/styles";

import { getTrabajadores, searcher, delTrabajadores } from "../../services/trabajadores";

import Swal from "sweetalert2";

export const Tabla = ({
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
  setValue,
  fields
}) => {

  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getTrabajadores(setTrabajadores);
    }
  }, [renderizar]);

  let data = searcher(fields, trabajadores);

  const handlePut = (row) => {
    setItem(row);
    console.log(row);
    setOpenModal(true);
    setValue("1")
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: '¿Desea eliminar el el trabajador',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: `NO`,
        customClass: {
          container: 'my-swal',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          var res = await delTrabajadores(id);
          render.current = true;
          setRenderizar(!renderizar);
        } 
      })
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        customClass: {
          container: 'my-swal',
        },
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
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' , fontStyle: "italic"}}>Item</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Código</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Nombre Completo</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">DNI</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Telefono</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Tipo</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Área</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
          data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.codigo}</TableCell>
              <TableCell align="right">
                {row.persona.nombre}
              </TableCell>
              <TableCell align="right">
                {row.persona.dni}
              </TableCell>
              <TableCell align="right">
                {row.persona.telefono}
              </TableCell>
              <TableCell align="right">
                {row.tipo_trabajador}
              </TableCell>
              <TableCell align="right">
                {row.area_info?.nombre}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(row)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="success"
                  onClick={() => handlePut(row)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(row.id)}
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