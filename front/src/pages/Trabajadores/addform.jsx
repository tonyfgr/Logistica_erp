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
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import { Formik } from "formik";
//Componentes pra el input de fecha
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

//iconos
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  postClienteper,
  postClienteemp,
  putClienteemp,
  putClienteper,
} from "../../services/clientes";

import { get } from "../../services/mantenimiento";
import { postTrabajadores, putTrabajadores } from "../../services/trabajadores";
import { initialState } from "../../services/trabajadores";

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
  handleClean
}) => {
  const handleOpenPost = () => {
    setOpenModal(true);
    setValue("1");
  };

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
    setItem({});
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [provincias, setProvincias] = useState([]);
  const [areas, setAreas] = useState([]);
  const tipos_trabajador = [
    'Interno', 'Contratista', 'Ninguno'
  ]

  const handleSubmit = async (val) => {
    console.log(val)
    try {
      !item.id
        ? await postTrabajadores(val)
        : await putTrabajadores(item.id, val);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
      if (item.id) setItem(initialState);
      setRenderizar(!renderizar);
      handleClean()
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
    const URLP = "api/mantenimientos/provincias/";
    const URLA = "api/mantenimientos/areas/";
    get(setProvincias, URLP);
    get(setAreas, URLA);
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
            {item.id ? "Editar Trabajador" : "Nuevo Trabajador"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext value={value} centered>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label={<span>Trabajador</span>} value="1" />
            </TabList>
            <TabPanel value="1" color="secondary">
              <Formik initialValues={item} onSubmit={handleSubmit}>
                {({ values, handleSubmit, handleChange, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="Nombres"
                          required
                          size="small"
                          color="secondary"
                          variant="filled"
                          id="textfields"
                          margin="dense"
                          name="persona.nombre"
                          onChange={handleChange}
                          value={values.persona ? values.persona.nombre : ""}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Fecha de nacimiento"
                            name="fecha_nacimiento"
                            inputFormat="DD/MM/YYYY"
                            onChange={(newValue) => {
                              var event = new Date(newValue.$d);
                              let date = JSON.stringify(event);
                              date = date.slice(1, 11);
                              setFieldValue("fecha_nacimiento", date);
                            }}
                            value={values.fecha_nacimiento}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                color="secondary"
                                variant="filled"
                                id="textfields"
                                margin="dense"
                              />
                            )}
                          />
                        </LocalizationProvider>

                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                          variant="filled"
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
                            variant="filled"
                            onChange={handleChange}
                            value={
                              values.persona? values.persona.codprovincia : ""
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
                          variant="filled"
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
                          variant="filled"
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
                          variant="filled"
                          name="persona.movil"
                          onChange={handleChange}
                          value={values.persona ? values.persona.movil : ""}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                          variant="filled"
                        >
                          <InputLabel id="prov">Area</InputLabel>
                          <Select
                            label="Area"
                            required
                            fullWidth
                            size="small"
                            color="secondary"
                            variant="filled"
                            id="textfields"
                            name="area"
                            onChange={handleChange}
                            value={
                              values.area ? values.area : ""}
                          >
                            {areas.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
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
                          variant="filled"
                        >
                          <InputLabel>Tipo de trabajador</InputLabel>
                          <Select
                            label="Tipo de trabajador"
                            size="small"
                            color="secondary"
                            id="textfields"
                            onChange={handleChange}
                            name="tipo_trabajador"
                            variant="filled"
                            value={
                              values.tipo_trabajador ? values.tipo_trabajador : ""
                            }
                          >
                            {tipos_trabajador.map((item, i) => (
                              <MenuItem key={i} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="DNI"
                          required
                          size="small"
                          type="number"
                          color="secondary"
                          variant="filled"
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
                          variant="filled"
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
                          variant="filled"
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
                          variant="filled"
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
                          variant="filled"
                          margin="dense"
                          name="persona.web"
                          onChange={handleChange}
                          value={values.persona ? values.persona.web : ""}
                        />
                        <TextField
                          fullWidth
                          label="Cargo en la empresa"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          variant="filled"
                          name="cargo"
                          onChange={handleChange}
                          value={values.cargo ? values.cargo : ""}
                        />

                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                          variant="filled"
                        >
                          <InputLabel>Tipo de contrato</InputLabel>
                          <Select
                            label="Tipo de contrato"
                            size="small"
                            color="secondary"
                            id="textfields"
                            onChange={handleChange}
                            name="tipo_contrato"
                            variant="filled"
                            value={
                              values.tipo_contrato ? values.tipo_contrato : ""
                            }
                          >
                            <MenuItem key={1} value={"Tiempo parcial"}>
                              Tiempo parcial
                            </MenuItem>
                            <MenuItem key={2} value={"Tiempo completo"}>
                              Tiempo completo
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                          // onClick={handleClickClientePer}
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
