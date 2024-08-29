import { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import { Formik } from "formik";

//iconos
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { get } from "../../services/mantenimiento";

import {
  postProveedoresEmp,
  postProveedoresPer,
  putProveedoresEmp,
  putProveedoresPer,
} from "../../services/Proveedores";

import Swal from "sweetalert2";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
  value,
  setValue,
}) => {
  const [provincias, setProvincias] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenPost = () => {
    setOpenModal(true);
    setValue("1");
  };
  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
    setItem({})
  };
// Formik

  const perSubmit = async (val) => {
    try {
      !item.id
        ? await postProveedoresPer(val)
        : await putProveedoresPer(val, item.id);

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el proveedor",
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

  const empSubmit = async (val) => {
    try {
      !item.id
        ? await postProveedoresEmp(val)
        : await putProveedoresEmp(val, item.id);

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el proveedor",
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
    const URL = "api/mantenimientos/provincias/";
    get(setProvincias, URL);
  }, []);

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
            {item.id ? "Editar Proveedor" : "Nuevo Proveedor"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext value={value} centered>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label={<span>Persona</span>} value="1" />
              <Tab label={<span>Empresa</span>} value="2" />
            </TabList>
            <TabPanel value="1" color="secondary">
              <Formik initialValues={item} onSubmit={perSubmit}>
                {({ values, handleSubmit, handleChange }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          required
                          size="small"
                          color="secondary"
                          id="nombre"
                          margin="dense"
                          name="persona.nombre"
                          onChange={handleChange}
                          value={values.persona ? values.persona.nombre : ""}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                        >
                          <InputLabel id="prov">Provincia</InputLabel>
                          <Select
                            label="Provincia"
                            required
                            fullWidth
                            size="small"
                            color="secondary"
                            id="textfields"
                            name="persona.codprovincia"
                            onChange={handleChange}
                            value={
                              values.persona ? values.persona.codprovincia : ""
                            }
                          >
                            {provincias.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.nombreprovincia}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          label="Direccion"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.direccion"
                          onChange={handleChange}
                          value={values.persona ? values.persona.direccion : ""}
                        />
                        <TextField
                          fullWidth
                          label="Cuenta Bancaria"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.cuentabancaria"
                          onChange={handleChange}
                          value={
                            values.persona ? values.persona.cuentabancaria : ""
                          }
                        />
                        <TextField
                          fullWidth
                          label="Movil"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.movil"
                          onChange={handleChange}
                          value={values.persona ? values.persona.movil : ""}
                        />
                        <TextField
                          fullWidth
                          label="RUC"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="ruc"
                          onChange={handleChange}
                          value={values.persona ? values.ruc : ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="DNI"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.dni"
                          onChange={handleChange}
                          value={values.persona ? values.persona.dni : ""}
                        />
                        <TextField
                          fullWidth
                          label="Localidad"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.localidad"
                          onChange={handleChange}
                          value={values.persona ? values.persona.localidad : ""}
                        />
                        <TextField
                          fullWidth
                          label="Codigo Postal"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.codpostal"
                          onChange={handleChange}
                          value={values.persona ? values.persona.codpostal : ""}
                        />
                        <TextField
                          fullWidth
                          label="Telefono"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.telefono"
                          onChange={handleChange}
                          value={values.persona ? values.persona.telefono : ""}
                        />
                        <TextField
                          fullWidth
                          label="Web"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.web"
                          onChange={handleChange}
                          value={values.persona ? values.persona.web : ""}
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
                          // onClick={handleClickProvPer}
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
            </TabPanel>
            <TabPanel value="2">
              <Formik initialValues={item} onSubmit={empSubmit}>
                {({ values, handleSubmit, handleChange }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.nombre"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.nombre : ""}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                        >
                          <InputLabel id="prov">Provincia</InputLabel>
                          <Select
                            label="Provincia"
                            required
                            fullWidth
                            size="small"
                            color="secondary"
                            id="textfields"
                            name="empresa.codprovincia"
                            onChange={handleChange}
                            value={
                              values.empresa ? values.empresa.codprovincia : ""
                            }
                          >
                            {provincias.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.nombreprovincia}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          label="Direccion"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.direccion"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.direccion : ""}
                        />
                        <TextField
                          fullWidth
                          label="Cuenta Bancaria"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.cuentabancaria"
                          onChange={handleChange}
                          value={
                            values.empresa ? values.empresa.cuentabancaria : ""
                          }
                        />
                        <TextField
                          fullWidth
                          label="Movil"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.movil"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.movil : ""}
                        />
                        <TextField
                          fullWidth
                          label="Web"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.web"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.web : ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="Tipo de Empresa"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.tipo"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.tipo : ""}
                        />
                        <TextField
                          fullWidth
                          label="Estructura"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.estructurajuridica"
                          onChange={handleChange}
                          value={
                            values.empresa
                              ? values.empresa.estructurajuridica
                              : ""
                          }
                        />
                        <TextField
                          fullWidth
                          label="Localidad"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.localidad"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.localidad : ""}
                        />
                        <TextField
                          fullWidth
                          label="Codigo Postal"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.codpostal"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.codpostal : ""}
                        />
                        <TextField
                          fullWidth
                          label="Telefono"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="empresa.telefono"
                          onChange={handleChange}
                          value={values.empresa ? values.empresa.telefono : ""}
                        />
                        <TextField
                          fullWidth
                          label="RUC"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="ruc"
                          onChange={handleChange}
                          value={values.empresa ? values.ruc : ""}
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
                          // onClick={handleClickProvEmp}
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
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
