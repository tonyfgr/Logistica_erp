import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

//componentes
import { get, post_put, del } from "../../../services/mantenimiento";
import { postProduccion, patchProduccion } from "../../../services/produccion";

import Swal from "sweetalert2";

import { Field, Formik } from "formik";

import { getProd } from "../../../services/producto";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const [producto, setProducto] = useState([]);

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const handlePost = async (e) => {
    try {
      !item.id ? await postProduccion(e) : await patchProduccion(e, item.id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la nueva producción",
      });
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };

  useEffect(() => {
    getProd(setProducto);
  }, []);

  const estadosProduccion = [
    { id: 'pendiente', nombre: "No Iniciado" },
    { id: 'en_proceso', nombre: "En proceso" },
    { id: 'completado', nombre: "Terminado" },
  ];

  return (
    <>
      <IconButton
        aria-label="add"
        color="secondary"
        size="large"
        onClick={handleOpenPost}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>
          <IconButton aria-label="close" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            {item.id ? "Editar Producción" : "Nueva Producción"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={item} onSubmit={handlePost}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                {item.id && (
                  <input type="hidden" name="id" value={item.id} />
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                      name="fecha_inicio"
                      label="Fecha Inicio"
                      onChange={handleChange}
                      value={values.fecha_inicio}
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                      name="fecha_fin"
                      label="Fecha Fin"
                      onChange={handleChange}
                      value={values.fecha_fin}
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense" size="small" color="secondary">
                      <InputLabel>Producto</InputLabel>
                      <Select
                        label="Producto"
                        name="id_producto"
                        onChange={handleChange}
                        value={values.id_producto}
                      >
                        {producto.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                      variant="filled"
                      name="cantidad"
                      label="Cantidad"
                      onChange={handleChange}
                      value={values.cantidad}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth margin="dense" size="small" color="secondary">
                      <InputLabel>Estado</InputLabel>
                      <Select
                        label="Estado"
                        name="estado"
                        onChange={handleChange}
                        value={values.estado}
                      >
                        {estadosProduccion.map((estado) => (
                          <MenuItem key={estado.id} value={estado.id}>
                            {estado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      size="medium"
                      color="secondary"
                      variant="contained"
                      type="submit"
                    >
                      {item.id ? "Editar" : "Registrar"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      size="medium"
                      color="error"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
