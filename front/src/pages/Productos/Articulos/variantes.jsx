import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

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
import Swal from "sweetalert2";
import { DialogContent } from '@mui/material';
import AddFormVariantes from './addformvariantes';
import { deleteArticuloVariante } from '../../../services/articulos';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Variantes = ({
  itemView, 
  variantes, 
  setVariantes, 
  almacenes,
  embalajes,
  setFullProduct,
  fullProduct
}) => {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [item, setItem] = useState({});


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePut = (item) => {
    setItem(item);
    setOpenAddModal(true);
  }

  const handleDelete = async (item) => {
    var varianteEliminada = variantes.find(i=>i.id==item.id)
    var indexVarianteEliminada = variantes.indexOf(varianteEliminada)
    try {
      Swal.fire({
        title: '¿Desea eliminar el la variante?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: `NO`,
        customClass: {
          container: 'my-swal',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          var res = await deleteArticuloVariante(item.id)
          if (!res.status) throw res.message
          variantes.splice(indexVarianteEliminada, 1)
          Swal.fire({
            icon: "success",
            title: "Ok",
            text: "Se eliminó la variante",
            customClass: {
              container: 'my-swal',
            },
          })
          setItem({});
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
    <div>
        
      {itemView.id && 
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}>
            Ver variantes
        </Button>}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' , backgroundColor: alpha("#633256", 0.2)}}>
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
              {`Variantes - ${itemView.nombre}`}
            </Typography>
            
            <AddFormVariantes
              openAddModal={openAddModal}
              setOpenAddModal={setOpenAddModal}
              item={item}
              setItem={setItem}
              almacenes={almacenes}
              itemView={itemView}
              variantes={variantes}
              setVariantes={setVariantes}
              embalajes={embalajes}/>

          </Toolbar>
        </AppBar>
        <DialogContent centered={"true"}>
            <TableContainer component={Paper} sx={{ mt: 0 }} elevation={0}>
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
                        Nombre
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Precio Unitario
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Embalaje
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
                        Ubicación
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
                        Descripción
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
                        {variantes.map((item, i) => { return (
                            <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell>
                            <TableCell align="right">{item.codigo}</TableCell>
                            <TableCell align="right">{item.nombre}</TableCell>
                            <TableCell align="right">{item.precio_unitario}</TableCell>
                            <TableCell align="right">{item.embalaje ? item.embalaje.nombre : "-"}</TableCell>
                            <TableCell align="right">{item.cantidad}</TableCell>
                            <TableCell align="right">{item.ubicacion}</TableCell>
                            <TableCell align="right">{ item.almacen ? item.almacen.nombre : "-"}</TableCell>
                            <TableCell align="right">{item.descripcion}</TableCell>
                            <TableCell align="right" component="th" scope="row">
                                <IconButton
                                aria-label="delete"
                                size="small"
                                color="success"
                                onClick={()=>handlePut(item)}
                                >
                                <EditIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton
                                aria-label="delete"
                                size="small"
                                color="error"
                                onClick={()=>handleDelete(item)}
                                >
                                <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                </TableContainer>
            </DialogContent>
      </Dialog>
    </div>
  );
}

export default Variantes;