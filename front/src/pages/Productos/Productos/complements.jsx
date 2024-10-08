//para la tabla
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

import { styled, useTheme, alpha } from "@mui/material/styles";

import { getProd, postProd, putProd, delProd, searcher } from "../../../services/producto";
// import { get, searcher, post_put, del } from "../../../services/mantenimiento";
import { useState, useEffect } from "react";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
  setFullProduct
}) => {
  const URL = "api/productos/";
  const [producto, setProducto] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      getProd(setProducto, URL);
    }
  }, [renderizar]);

  let data = searcher(fields, producto);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
    setFullProduct(producto)
  };

  const handleDelete = async (id) => {
    try {
      let res = await delProd(`${URL}${id}/`);
      render.current = true;
      setRenderizar(!renderizar);
      return res;
    } catch (error) {
      return error;
    }
  };

  console.log(data)

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table size="small" aria-label="a dense table">
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
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Nombre
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Catogoria
            </TableCell>
            
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Acciones
            </TableCell>
            <TableCell sx={{ color: "#633256", fontFamily: "inherit" }} align="right">Ver</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.codigo}</TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.nombre_categoria}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton aria-label="delete" size="small" color="primary">
                  <VisibilityIcon
                    fontSize="inherit"
                    onClick={() => handleView(row)}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handlePut(row)}
                  aria-label="delete"
                  size="small"
                  color="success"
                >
                  <EditIcon fontSize="inherit" />
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
              <TableCell align="right">
                <IconButton 
                  component={Link}
                  to={`/productos/productos/kardex/${row.id}`}
                  aria-label="kardex"
                  size="small"
                  sx={{ color: "green" }}
                >
                  <ListAltIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="inventario" size="small" sx={{ color: 'orange' }}>
                  <InventoryIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};