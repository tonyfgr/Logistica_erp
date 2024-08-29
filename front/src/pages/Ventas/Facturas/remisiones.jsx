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
import "./index.css";

import { alpha } from "@mui/material/styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Remisiones = ({ item, open, setOpen }) => {
  const [openModal, setOpenModal] = useState(false);
  const [detalle, setDetalle] = useState();
  const [variante, setVariante] = useState([]);
  const handleOpenPost = () => {
    setOpenModal(true);
    setDetalle(item.producto_detalle);
  };
  const handleClickOpen = () => {
    setOpen(true);
    item !== undefined ? setVariante(item) : variante;
  };

  const handleClose = () => {
    setOpen(false);
    setVariante({});
  };

  return (
    <>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}
      >
        Ver remisiones
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
              Remisiones
            </Typography>
            {/* <AddFormVariantes/> */}
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
                      Nombre
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Producto
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Cantidad
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Importe
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Descuento
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
                  {variante.length > 0 ? (
                    variante.map((variante) => (
                      <TableRow key={1}>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell align="right">{variante.id}</TableCell>
                        <TableCell align="right">{variante.nombre}</TableCell>
                        <TableCell align="right">
                          {variante.precio_final}
                        </TableCell>
                        <TableCell align="right">{variante.color}</TableCell>
                        <TableCell align="right">{variante.talla}</TableCell>
                        <TableCell align="right">
                          <Detalles
                            item={variante.producto_detalle[0]}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                          />
                        </TableCell>
                        <TableCell align="right" component="th" scope="row">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="success"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <>Esta factura no tiene remisiones</>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabContext>
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
