import { forwardRef, useState } from "react";
import {
  List,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  AppBar,
  Toolbar,
  Paper,
  TableBody,
  Slide,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import CloseIcon from "@mui/icons-material/Close";
import NumbersIcon from "@mui/icons-material/Numbers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Detalles from "./detalles";

import { alpha } from "@mui/material/styles";
import { formateoFecha, deleteRemisionDetalle } from "../../../services/compras";
import Swal from "sweetalert2";



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Remisiones = ({
  itemView, 
  remisiones, 
  setRemisiones,
  render,
  renderizar,
  setRenderizar, }) => {
  const [openModal, setOpenModal] = useState(false);
  
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = async(remisionId, detalleRemisionId) => {
    var currentRemision = remisiones.find(item=> item.id == remisionId)
    var indexCurrentRemision = remisiones.indexOf(currentRemision)
    try {
      Swal.fire({
        title: '¿Desea eliminar la remision?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: `NO`,
        customClass: {
          container: 'my-swal',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          var res = await deleteRemisionDetalle(detalleRemisionId)
          if (!res.status) throw res.message
          if (currentRemision.remision_compra_detalle.length <= 1) {
            remisiones.splice(indexCurrentRemision, 1)
          }else {
            var currentDetalleRemision = currentRemision.remision_compra_detalle.find(item=>item.id == detalleRemisionId)
            var indexCurrentDetalleRemision = currentRemision.remision_compra_detalle.indexOf(currentDetalleRemision)
            currentRemision.remision_compra_detalle.splice(indexCurrentDetalleRemision, 1)
            remisiones.splice(indexCurrentRemision, 1, currentRemision)
          }
          setRemisiones([...remisiones])
          render.current = true
          setRenderizar(!renderizar)

          Swal.fire({title:'Eliminado', icon:'success',customClass: {
            container: 'my-swal',
          }})
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

  }

  var i = 0
  return (
    <>
      {itemView.id&&
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}
      >
        Ver remisiones
      </Button>}
      <Dialog
        fullScreen
        open={openModal}
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
              Remisiones
            </Typography>
            {/* <AddFormVariantes/> */}
          </Toolbar>
        </AppBar>
        <DialogContent centered="true">
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
                      Código Detalle
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Fecha
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Artículo
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Subtotal
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Almacén
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
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {remisiones.length > 0 ? (
                    
                    remisiones.map((item) =>{return(
                      item.remision_compra_detalle.map(detalle=>{i++; return(
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {i}
                          </TableCell>
                          <TableCell align="right">{item.codigo}</TableCell>
                          <TableCell align="right">{detalle.codigo}</TableCell>
                          <TableCell align="right">{formateoFecha(item.fecha)}</TableCell>
                          <TableCell align="right"> {detalle.compra_detalle.nombre_articulo}</TableCell>
                          <TableCell align="right">S/. {detalle.compra_detalle.cantidad*detalle.compra_detalle.precio_unitario}</TableCell>
                          <TableCell align="right">{detalle.compra_detalle.articulo.almacen?.nombre}</TableCell>
                          <TableCell align="right">{item.trabajador? item.trabajador.codigo: '-'}</TableCell>
                          <TableCell align="right" component="th" scope="row">

                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="error"
                              onClick={()=>handleDelete(item.id, detalle.id)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    )
                    )}
                    )
                  ) : (
                    <>Esta factura no tiene remisiones</>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
        </DialogContent>
      </Dialog>
      {/* <List
        className="list"
        sx={{
          width: "100%",
          maxWidth: 200,
          bgcolor: "#EDECEF",
          borderRadius: 5,
        }}
        onClick={handleOpenPost}
      >
        <Grid container>
          <Grid item lg={12}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <NumbersIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Codigo" secondary={item.id} />
            </ListItem>
          </Grid>

          <Grid item lg={12}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <NumbersIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nombre" secondary={item.nombre} />
            </ListItem>
          </Grid>
        </Grid>
      </List>
      <Dialog open={openModal} sx={{ minWidth: 500 }}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Detalles del Producto
          </Typography>
        </DialogTitle>
        <DialogContent>
                {item.producto_detalle !== undefined ? (
                    item.producto_detalle.map((item)=>(
                        <Detalles item={item}/>
                    ))
                ):(
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={120}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={120}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={120}
                      />
                    </>
                )}
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default Remisiones;
