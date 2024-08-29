import { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,

} from "@mui/material";

//iconos

import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";

//componentes
import { transformObjectToFormData } from "../../../services/articulos";
import { putCompra } from "../../../services/compras";

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



  const handleClose = () => {
    if(item.id)setItem({})
    setOpenModal(false)
  };

  const compraSubmit = async (val) => {
    const {imagen_fac_compra, numero_factura, detalle_entrega} = val
    var dataToSubmit = {imagen_fac_compra, numero_factura, detalle_entrega}
    typeof dataToSubmit.imagen_fac_compra === 'string' && delete dataToSubmit.imagen_fac_compra
    var payload = transformObjectToFormData(dataToSubmit)
    try {
        await putCompra(item.id, payload);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se registro la factura",
        })
        if (item.id) setItem({});
        setRenderizar(!renderizar);
        render.current = true;
      }
      catch (error) {
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
      <Dialog open={openModal}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Añadir Factura
          </Typography>
        </DialogTitle>
        <DialogContent centered="true">
            <Formik initialValues={item} onSubmit={compraSubmit}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
            const [imagenURL, setImagenURL] = useState(values.imagen_fac_compra || '');
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Button
                      sx={{height:'100%'}}
                      fullWidth
                      component="label"
                      id="textfields"
                      size="small"
                      color="primary"
                      variant="outlined">
                        { values.imagen_fac_compra ? <img src={imagenURL} alt="Imagen seleccionada"/> : "Subir Imagen" }
                        <input type="file" accept="image/*" hidden 
                        name="imagen_fac_compra" onChange={(e)=>{
                          setFieldValue([e.target.name],e.target.files[0]);
                          setImagenURL(URL.createObjectURL(e.target.files[0]));
                        }}/>
                        
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <TextField
                      fullWidth
                      label="N° Factura"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="numero_factura"
                      type="number"
                      onChange={handleChange}
                      value={values.numero_factura != '-' ? values.numero_factura:0 }
                    />
                    <TextField
                      required
                      multiline
                      rows={4}
                      fullWidth
                      label="Detalle Entrega"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="detalle_entrega"
                      id="textfields"
                      onChange={handleChange}
                      value={values.detalle_entrega}
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
                      <span>Registrar</span>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
