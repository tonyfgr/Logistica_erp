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
  Tab,
  Tabs,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";

import PropTypes from "prop-types";

import Swal from "sweetalert2";
import { Formik } from "formik";
import { postRequerimientos } from "../../../services/requerimientos";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const [almacenes, setAlmacenes] = useState([]);
  const [areas, setAreas] = useState([]);
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const submit = async (e) => {
    console.log(e)
    try {
      await postRequerimientos(e);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la provincia",
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


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //para autocomplete
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleChangeSelect = (e) => {};

  useEffect(() => {
    const URL = "api/mantenimientos/almacenes/";
    const URL_A = "api/mantenimientos/areas/";
    get(setAlmacenes, URL);
    get(setAreas, URL_A);
  },[]);

  // console.log(almacenes)

  const top100Films = [{ label: "Logistica" }, { label: "Marketing" }];

  const top101Films = [{ label: "Artículo" }, { label: "Suministro" }];

  const tipo = [{id:1, nombre:'bien'}, {id:2, nombre:'servicio'}]

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
            {item.id ? "Editar Requerimiento" : "Nuevo Requerimiento"}
          </Typography>
        </DialogTitle>
        <DialogContent>
            <Formik initialValues={item} onSubmit={submit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  {item.id && (
                    <input type="hidden" name="cod" value={item.id} />
                  )}
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      {/* <Tabs
                        textColor="secondary"
                        indicatorColor="secondary"
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label={<span>Bien</span>} {...a11yProps(0)} />
                        <Tab label={<span>Servicio</span>} {...a11yProps(1)} />
                      </Tabs> */}
                    </Box>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            fullWidth
                            label="Nombre del Solicitante"
                            required
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            name="nombre_persona_requerimiento"
                            onChange={handleChange}
                          />
                          <TextField
                            fullWidth
                            label="Titulo"
                            required
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            name="titulo"
                            onChange={handleChange}
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
                          />
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>Areas</InputLabel>
                            <Select
                              label="Areas"
                              size="small"
                              color="secondary"
                              id="textfields"
                              name="area_solicitante"
                              onChange={handleChange}
                              value={values.area_solicitante}
                            >
                              {areas.map((item, i) => (
                                <MenuItem key={i} value={item.id}>
                                  {item.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>Almacen</InputLabel>
                            <Select
                              label="Alamcenes"
                              size="small"
                              color="secondary"
                              id="textfields"
                              name={"almacen"}
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
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>Tipo</InputLabel>
                            <Select
                              label="Alamcenes"
                              size="small"
                              color="secondary"
                              id="textfields"
                              name={"tipo"}
                              onChange={handleChange}
                              value={values.tipo}
                            >
                              {tipo.map((item, i) => (
                                <MenuItem key={i} value={item.nombre}>
                                  {item.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                            id="textfields"
                            variant="filled"
                            name="fecha_registro"
                            onChange={handleChange}
                            value={values.fecha_inicio}
                            type="date"
                          />
                          <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                            id="textfields"
                            variant="filled"
                            name="fecha_modificacion"
                            onChange={handleChange}
                            value={values.fecha_inicio}
                            type="date"
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
                   
                  </Box>
                </form>
              )}
            </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;












