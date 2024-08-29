import { useState, useEffect } from "react";
import { Fragment } from "react";
import { alpha } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";

//iconos
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircle from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//AHORA
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { FormControl, Select, MenuItem } from "@mui/material";

import Swal from "sweetalert2";

import {
  getBienes,
  deleteBien,
  searcher,
  patchOrdenBien,
  patchOrdenBienCotizacion
} from "../../../services/Servicios/bienes";

export const Tabla = ({ fields, render, renderizar, setRenderizar }) => {
  const [bienes, setBienes] = useState([]);

  console.log(bienes)

  const cambioEstadoOrdenBien = async (row, value) => {
    var payload = { bien_estado: value };
    
    await patchOrdenBien(row.id, payload);
    render.current = true;
    setRenderizar(!renderizar);
  };

  const cambioEstadoOrdenBienCotizacion = async (row) => {
    console.log(row.id, "<==================")
    var payload = { estado: !row.estado };
    await patchOrdenBienCotizacion(row.id, payload);
    render.current = true;
    setRenderizar(!renderizar);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "¿Desea eliminar la cotización?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
        customClass: {
          container: "my-swal",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBien(id);
          Swal.fire({
            title: "Eliminado",
            icon: "success",
            customClass: {
              container: "my-swal",
            },
          });
          render.current = true;
          setRenderizar(!renderizar);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  //carga de datos
  useEffect(() => {
    if (render.current) {
      render.current = false;
      getBienes(setBienes);
    }
  }, [renderizar]);

  const stateList = [
    "Solicitando cotización",
    "Aprobado",
    "En progreso",
    "Denegado",
    "Ninguno",
  ];

  function createCotizaciones(arrayOrdenBien) {
    console.log(arrayOrdenBien)
    return arrayOrdenBien.map((item, i) => {
      return {
        id: item.id,
        estado : item.estado,
        cotizaciones_: (
          <div>
            {" "}
            Cotización {i + 1}
            <a
              href={item.propuesta_documentos_bien.bien_cotizacion_documento}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                sx={{
                  backgroundColor: "#633256",
                  fontFamily: "inherit",
                  color: "white",
                  mx: 2,
                  "&:hover": {
                    backgroundColor: alpha("#633256", 0.25),
                    color: "#633256",
                  },
                }}
                size="small"
              >
                <span>Ver</span>
              </Button>
            </a>
          </div>
        ),
        propuestas_tecnicas: (
          <div>
            {" "}
            Propuesta técnica {i + 1}
            <a
              href={item.propuesta_documentos_bien.propuesta_tecnica_documento}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                sx={{
                  backgroundColor: "#633256",
                  fontFamily: "inherit",
                  color: "white",
                  mx: 2,
                  "&:hover": {
                    backgroundColor: alpha("#633256", 0.25),
                    color: "#633256",
                  },
                }}
                size="small"
              >
                <span>Ver</span>
              </Button>
            </a>
          </div>
        ),
        propuestas_economicas: (
          <div>
            {" "}
            Propuesta econónica {i + 1}
            <a
              href={
                item.propuesta_documentos_bien.propuesta_economica_documento
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                sx={{
                  backgroundColor: "#633256",
                  fontFamily: "inherit",
                  color: "white",
                  mx: 2,
                  "&:hover": {
                    backgroundColor: alpha("#633256", 0.25),
                    color: "#633256",
                  },
                }}
                size="small"
              >
                <span>Ver</span>
              </Button>
            </a>
          </div>
        ),
      };
    });
  }

  function createData(
    item,
    id,
    codigo,
    requerimiento,
    tipo_bien,
    estado,
    acciones,
    orden_bien
  ) {
    return {
      item,
      id,
      codigo,
      requerimiento,
      tipo_bien,
      estado,
      acciones,
      cotizaciones: createCotizaciones(orden_bien),
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    console.log(row)
    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.item}
          </TableCell>
          <TableCell>{row.codigo}</TableCell>
          <TableCell>{row.requerimiento.codigo}</TableCell>
          <TableCell>{row.tipo_bien}</TableCell>
          <TableCell>
            {
              row.estado == 'Completado' ?
              row.estado:
              <FormControl
              fullWidth
              margin="dense"
              size="small"
              color="secondary"
            >
              <Select
                size="small"
                color="secondary"
                id="textfields"
                name={"bien_estado"}
                onChange={(e) => cambioEstadoOrdenBien(row, e.target.value)}
                value={row.estado}
              >
                {stateList.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            }
          </TableCell>
          <TableCell>{row.acciones}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead
                    sx={{
                      backgroundColor: alpha("#633256", 0.2),
                      "&:hover": {
                        backgroundColor: alpha("#633256", 0.25),
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell align="center">
                        {" "}
                        <span>Cotización</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>Propuesta técnica</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>Propuesta económica</span>
                      </TableCell>
                      <TableCell align="center">
                        <span></span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cotizaciones.map((cotizacionesRow, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row" align="center">
                          {cotizacionesRow.cotizaciones_}
                        </TableCell>
                        <TableCell align="center">
                          {cotizacionesRow.propuestas_tecnicas}
                        </TableCell>
                        <TableCell align="center">
                          {cotizacionesRow.propuestas_economicas}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            // disabled={cotizacionesRow.estado ? false : true}
                            onClick={() => cambioEstadoOrdenBienCotizacion(cotizacionesRow)}
                            aria-label="delete"
                            size="small"
                            color="success"
                          >
                            {
                              cotizacionesRow.estado == true?
                              <CheckCircle fontSize="inherit" />
                              :
                              <RemoveCircleIcon color="primary" fontSize="inherit"/>
                            }
                            
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  function createRows(arrayBienes) {
    console.log(arrayBienes)
    return arrayBienes.map((item, i) =>
      createData(
        i + 1,
        item.id,
        item.codigo,
        item.requerimiento,
        item.bien_nombre,
        item.bien_estado,
        <>
          <IconButton size="small" color="error">
            <DeleteIcon
              fontSize="inherit"
              onClick={() => handleDelete(item.id)}
            />
          </IconButton>
          {/* Funcionalidad a futuro: Registrar orden de compra <AddForm/> */}
        </>,
        item.orden_bien
      )
    );
  }

  const rows = createRows(searcher(fields, bienes));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead
          sx={{
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          <TableRow>
            <TableCell />
            <TableCell>
              <span>Item</span>
            </TableCell>
            <TableCell>
              <span>Código</span>
            </TableCell>
            <TableCell>
              <span>Codigo Requerimiento</span>
            </TableCell>
            <TableCell>
              <span>Tipo de bien</span>
            </TableCell>
            <TableCell>
              <span>Estado</span>
            </TableCell>
            <TableCell>
              <span>Acciones</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
