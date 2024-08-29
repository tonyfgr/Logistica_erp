import { forwardRef, useState, useEffect } from "react";
import {FormControl, Select, MenuItem} from '@mui/material'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

//para la tabla
import { alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import { DialogContent } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import AddFormDetalles from "./addformdetalles";
import { delProduccionDetalle, patchProduccionDetalle } from "../../../services/produccion";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Detalles = ({ detalle, completo }) => {
  const [open, setOpen] = useState(false);
  const [nuevoDetalle, setNuevoDetalle] = useState([])
  console.log(detalle);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const estadosProduccion = [
    { id: 1, nombre: "No Iniciado" },
    { id: 2, nombre: "En proceso" },
    { id: 3, nombre: "Terminado" },
    { id: 4, nombre: "Saliendo" },
  ];

  const cambioEstado = async (row,value) => {
    console.log(row);
    row.cod_producto_id = row.cod_producto_id.id
    row.estdo_produccion_prod = value
    console.log(row)
    setNuevoDetalle(row.filter(r => r.estdo_produccion_prod === "No Iniciado"))
    await patchProduccionDetalle(row, row.id);
  };

  const delDetalle = async (id) => {
    await delProduccionDetalle(id)
  }

  return (
    <div>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}
        sx={{ mt: 3 }}
      >
        Ver detalles de la producción
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: alpha("#633256", 0.2) }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detalles de esta producción
            </Typography>
            <AddFormDetalles nuevoDetalle={nuevoDetalle} detalle={detalle} completo={completo}/>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TabContext centered>
            <TableContainer component={Paper} sx={{ mt: 0 }} elevation={0}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
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
                      Nombre del producto
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Estado de producción
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                {detalle ? (
                  detalle.filter(r => r.estdo_produccion_prod !== "No Iniciado").map((row) => (
                    <TableBody>
                      <TableRow key={1}>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell align="right">
                          {row.cod_producto_id.id}
                        </TableCell>
                        <TableCell align="right">
                          {row.cod_producto_id.nombre}
                        </TableCell>
                        <TableCell align="right">
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
                              name={"estado"}
                              onChange={(e) =>
                                cambioEstado(row, e.target.value)
                              }
                              value={row.estdo_produccion_prod}
                            >
                              {estadosProduccion.map((item, i) => (
                                <MenuItem key={i} value={item.nombre}>
                                  {item.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>

                        <TableCell align="right" component="th" scope="row">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                            onClick={()=>delDetalle(row.id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                ) : (
                  <></>
                )}
              </Table>
            </TableContainer>
          </TabContext>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Detalles;
