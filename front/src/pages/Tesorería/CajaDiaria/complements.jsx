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

import { alpha } from "@mui/material/styles";
import {formatearFechaTabla } from "../../../services/caja";
import { searcherRegistros } from "../../../services/caja";

export const Tabla = ({
  itemCaja,
  fields
}) => {


  const data = searcherRegistros(fields, itemCaja.registros_caja)

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
              Código
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha Registro
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Hora Registro
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Tipo Registro
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Responsable
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Monto
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemCaja.estado_caja && data.map((item, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{item.codigo}</TableCell>
              <TableCell align="right">{formatearFechaTabla(item.fecha)}</TableCell>
              <TableCell align="right">{item.hora?.slice(0, 5)}</TableCell>
              <TableCell align="right">{item.tipo}</TableCell>
              <TableCell align="right">{item.responsable}</TableCell>
              <TableCell align="right">S/. {item.monto.toFixed(2)}</TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
};
