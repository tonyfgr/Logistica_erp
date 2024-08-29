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
import { formatearFechaTabla, getCaja, searcherCajas } from "../../../services/caja";
import { useEffect, useState } from "react";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  itemView,
  setItemView
}) => {

  const [cajas, setCajas] = useState([])
  let data = searcherCajas(fields, cajas)

  const handleView = (item) => {
    setItemView(item)
  }

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getCaja(setCajas);
    }
  }, [renderizar])

  return (
    <TableContainer component={Paper} sx={{ mt: 0 }} elevation={10}>
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
              Código de Caja
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha Apertura
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha Cierre
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Saldo Apertura
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Saldo Cierre
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
              {data.map((item, i) => (
                <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell align="right">{item.codigo}</TableCell>
                <TableCell align="right">{formatearFechaTabla(item.fecha_apertura)}</TableCell>
                <TableCell align="right">{formatearFechaTabla(item.fecha_cierre)}</TableCell>
                <TableCell align="right">S/. {item.monto_inicial.toFixed(2)}</TableCell>
                <TableCell align="right">{item.monto_final != null ? `S/. ${item.monto_final.toFixed(2)}` : "Aún abierta"}</TableCell>
                <TableCell align="right" component="th" scope="row">
                  <IconButton aria-label="delete" size="small" color="primary">
                    <VisibilityIcon
                      fontSize="inherit"
                      onClick={() => handleView(item)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
