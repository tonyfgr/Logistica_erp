import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab, Box,
  Autocomplete, Modal
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import './index.css';
//componentes
import Swal from "sweetalert2";
import { get} from "../../../services/mantenimiento";
import { Formik } from "formik";
import { useEffect } from "react";
import { postArticulosVariantes, putArticulosVariantes } from "../../../services/articulos";

const AddFormVariantes = ({
  openAddModal, 
  setOpenAddModal, 
  itemView, 
  item, 
  setItem, 
  almacenes,
  embalajes,
  variantes,
  setVariantes
}) => {
  const handleOpen = () => {
    setOpenAddModal(true);
  };
  const handleClose = () => {
    setOpenAddModal(false);
    setItem({})
  };

  const artVarSubmit = async (val) => {
    let {embalaje, almacen} = val
    var dataToSubmit = {
      "embalaje":embalaje ? embalaje.id : null, 
      "almacen":almacen ? almacen.id : null
    }
    dataToSubmit = {...val,...dataToSubmit, "articulo":itemView.id};
    try {
      if (!item.id) {
        var res = await postArticulosVariantes(dataToSubmit)
        itemView.variantes.push(res.content)
      } else {
        var res = await putArticulosVariantes(item.id, dataToSubmit)
        var varianteEditando = variantes.find(i=>i.id == item.id)
        var indexVarianteEditando = variantes.indexOf(varianteEditando)
        variantes.splice(indexVarianteEditando, 1, res.content)
      }
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro la variante",
        customClass: {
          container: 'my-swal',
        },
      })
      if (item.id) setItem({});
    }
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        customClass: {
          container: 'my-swal',
        },
      });
    }
    setOpenAddModal(false)
  }

  console.log(item)

  return (
    <>
        <Button 
        color="secondary"
        variant="contained"
        onClick={handleOpen}>Añadir</Button>
        <Modal
            open={openAddModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                
            <Box maxWidth={'md'} sx={{ position: 'absolute', top: '50%', left: '50%', backgroundColor:'white' , transform: 'translate(-50%, -50%)', p:5}}>
            <h2 id="parent-modal-title">
              {item.id ? "Editar Variante" : "Nueva Variante"}
            </h2>

            <Formik initialValues={item} onSubmit={artVarSubmit}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
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
                      value={values.nombre}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Precio unitario"
                      type="number"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="precio_unitario"
                      inputProps={{
                        step: "0.1"
                      }}
                      value={values.precio_unitario}
                      onChange={handleChange}
                    />
                    <Autocomplete
                      disablePortal
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Embalaje" 
                          margin="dense" 
                          color="secondary" 
                          fullWidth 
                        />}
                      options={embalajes}
                      getOptionLabel={(option)=>{
                        if (option) return option.nombre 
                        return ''}}
                      value={values.embalaje}
                      onChange={(e, value) => {setFieldValue("embalaje", value)}}
                    />
                    <TextField
                      fullWidth
                      label="Cantidad"
                      type="number"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="cantidad"
                      value={values.cantidad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  
                    <TextField
                      fullWidth
                      label="Talla"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="ubicacion"
                      id="textfields"
                      value={values.ubicacion}
                      onChange={handleChange}
                    />
                    <Autocomplete
                      disablePortal
                      options={almacenes}
                      getOptionLabel={(option)=>{
                        if (option) return option.nombre 
                        return ''}}
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="horas_manufactura"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Almacen" 
                          margin="dense" 
                          color="secondary" 
                          fullWidth 
                        />}
                      value={values.almacen}
                      onChange={(e, value) => {setFieldValue("almacen", value)}}
                    />
                    <TextField
                      fullWidth
                      label="Descripción"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="descripcion"
                      id="textfields"
                      value={values.descripcion}
                      onChange={handleChange}
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
                      type="submit">
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
                </form> )}}
              </Formik>
            </Box>
        </Modal>
    </>
  );
};

export default AddFormVariantes;