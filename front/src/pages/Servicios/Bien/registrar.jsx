import "./index.css";

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
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import { TabContext } from "@mui/lab";

// Imports relacionado con Formik
import { Formik, Form, Field, FieldArray } from "formik";

// Imports relacionado a los iconos
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";

// Imports relacionado a las peticiones
import {
  cotizacionInitialState,
  postBienes,
  transformToFormData,
} from "../../../services/Servicios/bienes";
import { getProveedores } from "../../../services/Proveedores";

//Imports modal Swal para notificar registros
import Swal from "sweetalert2";

import {getRequermientos} from '../../../services/requerimientos'

const Registar = ({ render, renderizar, setRenderizar }) => {
  // POST request para la orden de bien
  const ordenBienMayorMenorSubmit = async (data) => {
    console.log(data)
    if (value == 1) {
      data["mayor_500"] = true;
    }
    try {
      var payload = transformToFormData(data);
      await postBienes(payload);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro la cotización",
      });
      render.current = true;
      setRenderizar(!renderizar);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpen(false);
  };

  // Funcionamiento relacion a la interfaz de registro con Tabs
  const [open, setOpen] = useState(false);
  const [proveedores, setProveedores] = useState();
  const [item, setItem] = useState(cotizacionInitialState);
  const [req, setReq] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        //hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {
          <Box sx={{ p: 3 }} index={value}>
            <Typography>{children}</Typography>
          </Box>
        }
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const stateList = [
    "Ninguno",
    "Solicitando cotización",
    "Aprobado",
    "En proceso",
    "Denegado",
  ];

  useEffect(() => {
    getProveedores(setProveedores);
    getRequermientos(setReq);
  },[]);

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        color="warning"
        sx={{ fontFamily: "inherit", height: "100%" }}
        onClick={handleOpen}
      >
        Registrar
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Registrar Requerimiento de Bien
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label={<span>Cotización &lt; 500</span>}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={<span>Cotización &gt; 500</span>}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value}>
                <Formik
                  initialValues={item}
                  onSubmit={ordenBienMayorMenorSubmit}
                >
                  {({
                    values,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    setValues,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            fullWidth
                            label="Tipo de bien (Viene al seleccionarlo)"
                            required
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            name="bien_nombre"
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>
                              Estado (viene al seleccionarlo)
                            </InputLabel>
                            <Select
                              label="Estado (viene al seleccionarlo)"
                              size="small"
                              color="secondary"
                              id="textfields"
                              onChange={handleChange}
                              name="bien_estado"
                            >
                              {stateList.map((item, i) => (
                                <MenuItem key={i} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>
                              Requerimiento
                            </InputLabel>
                            <Select
                              label="Requerimientos"
                              size="small"
                              color="secondary"
                              id="textfields"
                              onChange={handleChange}
                              name="requerimiento"
                            >
                              {req.map((item, i) => (
                                item.tipo === "bien" ?
                                (<MenuItem key={i} value={item.id}>
                                  {item.codigo}
                                </MenuItem>) : (
                                  <></>
                                )
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                          <FieldArray
                            name="orden_bien"
                            render={(arrayHelpers) => (
                              <>
                                <Card
                                  variant="outlined"
                                  sx={{
                                    px: 2,
                                    py: 1,
                                    border: "1px solid purple",
                                  }}
                                >
                                  {values.orden_bien.map((variante, index) => (
                                    <div key={index}>
                                      <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <Autocomplete
                                            fullWidth
                                            type="text"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            disablePortal
                                            required
                                            options={proveedores}
                                            getOptionLabel={(option) => {
                                              if (option.persona)
                                                return option.persona.nombre;
                                              if (option.empresa)
                                                return option.empresa.nombre;
                                              return "";
                                            }}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label="Proveedor"
                                                margin="dense"
                                                color="secondary"
                                                fullWidth
                                              />
                                            )}
                                            value={values.proveedor}
                                            onChange={(e, value) => {
                                              setFieldValue(
                                                `orden_bien.${index}.proveedor_id`,
                                                value.id
                                              );
                                            }}
                                          />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                          <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <span>
                                                Cotización {index + 1}
                                              </span>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                              {/* <Button variant="outlined" component="label" fullWidth size="small">
                                              <span>Subir</span>
                                              <input hidden accept="image/*" multiple type="file" />
                                            </Button> */}
                                              <Field
                                                name="file"
                                                variant="outlined"
                                                size="small"
                                                component="label"
                                              >
                                                {({ field, form }) => (
                                                  <TextField
                                                    type="file"
                                                    {...field}
                                                    inputProps={{
                                                      accept:
                                                        ".pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                                    }}
                                                    onBlur={() =>
                                                      form.setTouched({
                                                        file: true,
                                                      })
                                                    }
                                                    onChange={(event) =>
                                                      setFieldValue(
                                                        `orden_bien.${index}.propuesta_documentos_bien.bien_cotizacion_documento`,
                                                        event.currentTarget
                                                          .files[0]
                                                      )
                                                    }
                                                    error={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                    helperText={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                  />
                                                )}
                                              </Field>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6}>
                                          <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <span>
                                                Propuesta económica {index + 1}
                                              </span>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <Field
                                                name="file"
                                                variant="outlined"
                                                size="small"
                                                component="label"
                                              >
                                                {({ field, form }) => (
                                                  <TextField
                                                    type="file"
                                                    {...field}
                                                    inputProps={{
                                                      accept:
                                                        ".pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                                    }}
                                                    onBlur={() =>
                                                      form.setTouched({
                                                        file: true,
                                                      })
                                                    }
                                                    onChange={(event) =>
                                                      setFieldValue(
                                                        `orden_bien.${index}.propuesta_documentos_bien.propuesta_economica_documento`,
                                                        event.currentTarget
                                                          .files[0]
                                                      )
                                                    }
                                                    error={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                    helperText={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                  />
                                                )}
                                              </Field>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6}>
                                          <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <span>
                                                Propuesta técnica {index + 1}
                                              </span>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <Field
                                                name="file"
                                                variant="outlined"
                                                size="small"
                                                component="label"
                                              >
                                                {({ field, form }) => (
                                                  <TextField
                                                    type="file"
                                                    {...field}
                                                    inputProps={{
                                                      accept:
                                                        ".pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                                    }}
                                                    onBlur={() =>
                                                      form.setTouched({
                                                        file: true,
                                                      })
                                                    }
                                                    onChange={(event) =>
                                                      setFieldValue(
                                                        `orden_bien.${index}.propuesta_documentos_bien.propuesta_tecnica_documento`,
                                                        event.currentTarget
                                                          .files[0]
                                                      )
                                                    }
                                                    error={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                    helperText={
                                                      form.touched.file &&
                                                      form.errors.file
                                                    }
                                                  />
                                                )}
                                              </Field>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      {index != 0 && (
                                        <Button
                                          fullWidth
                                          component="label"
                                          variant="outlined"
                                          startIcon={<RemoveCircleOutline />}
                                          sx={{ marginTop: "0.5rem" }}
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Eliminar
                                        </Button>
                                      )}
                                      {value == 1 && (
                                        <Divider
                                          style={{
                                            marginTop: "0.5rem",
                                            border: "1px dashed purple",
                                          }}
                                        />
                                      )}
                                    </div>
                                  ))}
                                  {value == 1 && (
                                    <Button
                                      fullWidth
                                      component="label"
                                      variant="outlined"
                                      color="secondary"
                                      startIcon={<AddCircleIcon />}
                                      sx={{ marginTop: "0.5rem" }}
                                      onClick={() => arrayHelpers.push({})}
                                    >
                                      Cotización
                                    </Button>
                                  )}
                                </Card>
                              </>
                            )}
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
                    </Form>
                  )}
                </Formik>
                {/* Registro de bien en el que la cotizacion es mayor a 500 */}
              </TabPanel>
            </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registar;
