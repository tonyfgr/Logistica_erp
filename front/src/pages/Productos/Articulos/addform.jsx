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
  Box,
  Divider,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, Formik } from "formik";

//componentes
import { variantesInitialValue } from "../../../services/articulos";
import { get } from "../../../services/mantenimiento";
import { getProveedores } from "../../../services/Proveedores";
import { postArticulo, putArticulo, transformObjectToFormData } from "../../../services/articulos";
import Swal from "sweetalert2";


const AddForm = ({
  render, 
  renderizar, 
  setRenderizar, 
  openModal, 
  setOpenModal, 
  item, 
  setItem,
  proveedores,
  setProveedores,
  categorias,
  setCategorias,
  almacenes,
  embalajes
}) => {

  
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if(item.id)setItem({"variantes":[{...variantesInitialValue}]})
    setOpenModal(false)
  };

  const artSubmit = async (val) => { 
    console.log(val)   
    let {proveedor, categoria} = val
    let dataToSubmit
    dataToSubmit = {
      "proveedor":proveedor ? proveedor.id : null, 
      "categoria":categoria ? categoria.id : null
    }
    if (!item.id){
      dataToSubmit = {...val, ...dataToSubmit}
    } 
    else {
      let {nombre, descripcion, marca, imagen} = val
      dataToSubmit =  {nombre, descripcion, marca, imagen, ...dataToSubmit}
      typeof dataToSubmit.imagen === 'string' && delete dataToSubmit.imagen
    }
    console.log(dataToSubmit)
    try {
      var payload = transformObjectToFormData(dataToSubmit)
      !item.id
        ? await postArticulo(payload)
        : await putArticulo(item.id, payload);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el artículo",
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


  useEffect(()=>{
    const URL_C = "api/mantenimientos/categoriaarticulos/";
    getProveedores(setProveedores)
    get(setCategorias, URL_C)
  },[])


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
            {item.id ? "Editar Artículo" : "Nuevo Artículo"}
          </Typography>
        </DialogTitle>
        <DialogContent centered="true">
            <Formik initialValues={item} onSubmit={artSubmit}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
            const [imagenURL, setImagenURL] = useState(values.imagen || '');
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
                        { values.imagen ? <img src={imagenURL} alt="Imagen seleccionada"/> : "Subir Imagen" }
                        <input type="file" accept="image/*" hidden 
                        name="imagen" onChange={(e)=>{
                          setFieldValue([e.target.name],e.target.files[0]);
                          setImagenURL(URL.createObjectURL(e.target.files[0]));
                        }}/>
                        
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
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
                      label="Descripción"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="descripcion"
                      id="textfields"
                      onChange={handleChange}
                      value={values.descripcion}
                    />
                    <Autocomplete
                      disablePortal
                      options={proveedores}
                      getOptionLabel = {(option) => {
                        if (option.persona) return option.persona.nombre 
                        if (option.empresa) return option.empresa.nombre
                        return ''
                      }}
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Proveedor" 
                          margin="dense" 
                          color="secondary"
                          fullWidth />}
                      value={values.proveedor}
                      onChange={(e, value) => {setFieldValue("proveedor", value)}}
                    />
                    <TextField
                      fullWidth
                      label="Marca"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="marca"
                      id="textfields"
                      onChange={handleChange}
                      value={values.marca}
                    />
                    <Autocomplete
                      disablePortal
                      options={categorias}
                      getOptionLabel={(option)=>{if (option) return option.nombre 
                                                return ''}}
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Categoría" 
                          margin="dense" 
                          color="secondary" 
                          fullWidth 
                        />}
                      value={values.categoria}
                      onChange={(e, value) => {setFieldValue("categoria", value)}}
                    />
                  </Grid>
                  
                  {!item.id && 
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name="variantes"
                      render={(arrayHelpers) => (
                        <>
                          <Box sx={{ p: 2, border: "1px dashed purple" }}>
                          {values.variantes.map((variante, index) => (
                              <div  key={index}>
                              <Grid container>
                                <Grid item xs={12} sm={6} md={6} mb={1} pr={0.5}>
                                  <TextField
                                    fullWidth
                                    label="Nombre"
                                    size="small"
                                    color="secondary"
                                    id="textfields"
                                    margin="dense"
                                    name={`variantes.${index}.nombre`}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Descripcion"
                                    size="small"
                                    color="secondary"
                                    id="textfields"
                                    margin="dense"
                                    name={`variantes.${index}.descripcion`}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Precio"
                                    size="small"
                                    type="number"
                                    color="secondary"
                                    id="textfields"
                                    margin="dense"
                                    name={`variantes.${index}.precio_unitario`}
                                    onChange={handleChange}
                                    inputProps={{
                                      step: 0.1
                                    }}
                                  />
                                  <FormControl
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    color="secondary"
                                  >
                                    <InputLabel>Embalaje</InputLabel>
                                    <Select
                                      label="Embalaje"
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      name={`variantes.${index}.embalaje`}
                                      onChange={handleChange}
                                      value={values.embalaje}
                                    >
                                      {embalajes.map((item, i) => (
                                        <MenuItem key={i} value={item.id}>
                                          {item.nombre}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb={1} pl={0.5}>
                                  <TextField
                                    fullWidth
                                    label="Cantidad"
                                    size="small"
                                    type="number"
                                    color="secondary"
                                    id="textfields"
                                    margin="dense"
                                    name={`variantes.${index}.cantidad`}
                                    onChange={handleChange}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Ubicación"
                                    size="small"
                                    color="secondary"
                                    id="textfields"
                                    margin="dense"
                                    name={`variantes.${index}.ubicacion`}
                                    onChange={handleChange}
                                  />
                                  <FormControl
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    color="secondary"
                                  >
                                    <InputLabel>Almacen</InputLabel>
                                    <Select
                                      label="Almacen"
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      name={`variantes.${index}.almacen`}
                                      onChange={handleChange}
                                      value={values.almacen}
                                    >
                                      {almacenes.map((item, i) => (
                                        <MenuItem key={i} value={item.id}>
                                          {item.nombre}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                
                                </Grid>
                              </Grid>
                              {index!= 0 &&
                              <Button
                                fullWidth
                                component="label"
                                variant="outlined"
                                startIcon={<RemoveCircleOutlineIcon/>}
                                sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>}
                              <Divider style={{backgroundColor: '#D593F4', borderStyle: "dashed"}} />
                              </div>
                          ))}
                            <Button
                                fullWidth
                                component="label"
                                variant="outlined"
                                color="secondary"
                                startIcon={<AddCircleIcon />}
                                sx={{ marginTop: "0.5rem" }}
                                onClick={() => arrayHelpers.push({...variantesInitialValue})}
                              >
                                Variantes
                            </Button>
                          </Box>
                        </>
                      )}
                    />
                  </Grid> }
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
