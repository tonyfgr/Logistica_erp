import { useState, useEffect } from "react";
import { Fragment } from "react";
import { alpha } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";

//iconos
import DeleteIcon from "@mui/icons-material/Delete";

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
import { Grid } from "@mui/material";
import { ACTION_TYPES } from "./reducerCompra";
import CheckCircle from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Swal from "sweetalert2";

import { getBienes, patchOrdenBien } from "../../../services/Servicios/bienes";

export const Tabla = ({
  state,
  dispatch,
  fields,
  render,
}) => {
  const [bienes, setBienes] = useState([]);
  const [renderizar, setRenderizar] = useState(false)

  //carga de datos
  useEffect(() => {
    getBienes(setBienes);
  }, [renderizar]);

  function createCotizaciones(arrayOrdenBien) {
    return arrayOrdenBien.map((item, i) => {
      return {
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

  function createData(item, id,uso_en_compra, codigo, tipo_bien, estado, orden_bien) {
    return {
      item,
      id,
      uso_en_compra,
      codigo,
      tipo_bien,
      estado,
      cotizaciones: createCotizaciones(orden_bien),
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
   
    const handleSetOrdenBien = async (row) => {
      await patchOrdenBien(row.id, {uso_en_compra:!row.uso_en_compra})
      dispatch({
        type: ACTION_TYPES.SET_ORDEN_BIEN,
        payload: row.id,
      });
      setRenderizar(!renderizar)
    };

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
          <TableCell>{row.tipo_bien}</TableCell>
          <TableCell>{row.estado}</TableCell>
          <TableCell>
            <Grid item xs={8} sm={8} md={8} xl={8}>
              <Button
                fullWidth
                id="textfields"
                color={row.uso_en_compra ? "primary" : "secondary"}
                variant="contained"
                onClick={()=>handleSetOrdenBien(row)}
              >
                {row.uso_en_compra ? "En uso" : "Usar"}
              </Button>
            </Grid>
          </TableCell>
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
    return arrayBienes.map((item, i) =>
      createData(
        i + 1,
        item.id,
        item.uso_en_compra,
        item.codigo,
        item.bien_nombre,
        item.bien_estado,
        item.orden_bien
      )
    );
  }


  const rows = createRows(bienes.filter((item) => item.bien_estado == 'Aprobado'));

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
