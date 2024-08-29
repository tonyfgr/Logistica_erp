import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

//componentes
import {
  postAlmacen,
  putAlmacen,
} from "../../../services/mantenimiento";

import { Formik } from "formik";

import Swal from "sweetalert2";

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

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const InSubmit = async (val) => {
    try {
      !item.id ? await postAlmacen(val) : await putAlmacen(val, item.id);

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró el almacén",
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

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="large"
        onClick={handleOpenPost}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={openModal}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            {item.id ? "Editar Almacén" : "Nuevo Almacén"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <Formik initialValues={item} onSubmit={InSubmit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                      />
                      <TextField
                        fullWidth
                        label="Abreviación"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="abreviacion"
                        onChange={handleChange}
                        value={values.abreviacion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Ubicación"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="ubicacion"
                        onChange={handleChange}
                        value={values.ubicacion}
                      />
                      <TextField
                        fullWidth
                        label="Descripción"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="descripcion"
                        onChange={handleChange}
                        value={values.descripcion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="secondary"
                        className="navbar-btn-single"
                        variant="contained"
                        type="submit"
                      >
                        <span>{item.id ? "Editar" : "Registrar"}</span>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="error"
                        className="navbar-btn-single"
                        variant="contained"
                        onClick={handleClose}
                      >
                        <span>Cancelar</span>
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
