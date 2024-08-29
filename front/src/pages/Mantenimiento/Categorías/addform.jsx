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
import { get, searcher, post_put, del } from "../../../services/mantenimiento";



import Swal from "sweetalert2";


const AddForm = ({render, renderizar, setRenderizar, openModal, setOpenModal, item, setItem}) => {
  
  const URL = "api/mantenimientos/categoriaarticulos/";
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if(item.id)setItem({})
    setOpenModal(false)
  };

  const handlePostPut = async(e) => {
    try {
      const {nombre,} = e.target
      await post_put(e, nombre, URL)
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la categoría de artículos",
      });
      if(item.id)setItem({})
      setRenderizar(!renderizar)
      render.current = true
      
    }
    catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false)
  }

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
            {item.id ? "Editar Categoría (Artículos)" : "Nueva Categoría (Artículos)"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <form onSubmit={handlePostPut}>
                {item.id?<input type="hidden" name="cod" value={item.id}/>:''
                }
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombre"
                      defaultValue={item.id ? item.nombre:''}
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
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
