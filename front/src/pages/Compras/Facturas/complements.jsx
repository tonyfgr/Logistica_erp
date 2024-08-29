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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import Button from "@mui/material/MenuItem";

import { styled, useTheme, alpha } from "@mui/material/styles";

import { useState, useEffect } from "react";
import {
  get,
  searcherprov,
  post_put,
  del,
} from "../../../services/mantenimiento";
import AddForm from "../Remisiones/addform";

import {
  getCompras,
  formateoFecha,
  deleteCompra,
  searcherFacturas,
} from "../../../services/compras";
import Swal from "sweetalert2";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
  itemView,
}) => {
  const [facturaCompras, setFacturaCompras] = useState([]);

  let data = searcherFacturas(fields, facturaCompras);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleActiveDeactive = async (row) => {
    try {
      Swal.fire({
        title: row?.borrado
          ? "¿Desea activar la orden de compra?"
          : "¿Desea anular la orden de compra?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCompra(row.id);
          Swal.fire(
            row?.borrado
              ? "Orden de Compra Activada"
              : "Orden de Compra Anulada",
            "",
            "info"
          );
          render.current = true;
          setRenderizar(!renderizar);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getCompras(setFacturaCompras);
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
              N° de Orden Bien
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha de Compra
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Proveedor
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Remisión
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Estado
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
              <TableCell align="right">
                {row.orden_bien ? row.orden_bien : "-"}
              </TableCell>
              <TableCell align="right">{formateoFecha(row.fecha)}</TableCell>
              <TableCell align="right">{row.nombre_proveedor}</TableCell>
              <TableCell align="right">{row.estado_remision}</TableCell>
              <TableCell align="right">
                {row.borrado ? "Anulado" : "Vigente"}
              </TableCell>
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
                  disabled={row?.borrado ? true : false}
                  onClick={() => handlePut(row)}
                  aria-label="delete"
                  size="small"
                  color="success"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                  disabled={
                    row?.estado_remision == "-" ||
                    row?.estado_remision == "Por Hacer"
                      ? false
                      : true
                  }
                  onClick={() => handleActiveDeactive(row)}
                  aria-label="delete"
                  size="small"
                  color={row?.borrado ? "success" : "error"}
                >
                  {row.borrado ? (
                    <CheckCircleIcon fontSize="inherit" />
                  ) : (
                    <DeleteIcon fontSize="inherit" />
                  )}
                </IconButton>
                <AddForm
                  itemView={itemView}
                  setItemView={setItemView}
                  row={row}
                  idCompra={row.id}
                  detalle_compra={row.detalle_compra}
                  renderizar={renderizar}
                  setRenderizar={setRenderizar}
                  render={render}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
