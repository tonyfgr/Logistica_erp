import { useState, useEffect } from "react";

import {
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Field, FieldArray, Formik } from "formik";

import { postVar, putVar, artget } from "../../../services/producto";
import { get } from "../../../services/mantenimiento";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const AddVariante = ({
  variante,
  setVariante,
  id,
  openModalVariante,
  setOpenModalVariante,
}) => {
  const [art, setArt] = useState([]);
  const [vArt, setVArt] = useState([]);
  const [filterVarianteArt, setFilterVarianteArt] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);

  const handleOpen = () => {
    setOpenModalVariante(true);
  };
  const handleClose = () => {
    setOpenModalVariante(false);
    setVariante({});
  };

  const InSub = async (val) => {
    val["producto"] = id;
    console.log(val);
    try {
      if (!variante.id) {
        await postVar(val);
        // variante.push();
      } else {
        await putVar(`api/productos/variantes/${variante.id}/`, val);
      }

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el impuesto",
      });
      if (variante.id) setVariante({});
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModalVariante(false);
  };

  const varianteHandleChange = (event, newValue) => {
    setFilterVarianteArt(
      vArt.filter((variante) => variante.articulo === newValue.nombre)
    );
  };

  useEffect(() => {
    const URLA = "api/articulos/";
    const URLAV = "api/articulos/variantes/";
    const URL_AL = "api/mantenimientos/almacenes/";
    artget(setArt, URLA);
    artget(setVArt, URLAV);
    get(setAlmacenes, URL_AL);
  }, []);
  console.log(variante);

  return (
    <>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        Añadir
      </Button>
      <Dialog
        open={openModalVariante}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <DialogTitle>
          <h2 id="parent-modal-title">Nueva variante</h2>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={variante} onSubmit={InSub}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
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
                      label="Descripcion"
                      required
                      type="text"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="descripcion"
                      onChange={handleChange}
                      value={values.descripcion}
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                  <TextField
                      fullWidth
                      label="Color"
                      required
                      type="text"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="color"
                      onChange={handleChange}
                      value={values.color}
                    />
                    <TextField
                      fullWidth
                      label="Talla"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="talla"
                      id="textfields"
                      onChange={handleChange}
                      value={values.talla}
                    />
                    <TextField
                      fullWidth
                      label="Costo de Produccion"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="costo_manufactura"
                      id="textfields"
                      onChange={handleChange}
                      value={values.costo_manufactura}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name={"producto_detalle"}
                      render={(array) => (
                        <>
                          <Button
                            fullWidth
                            component="label"
                            variant="outlined"
                            color="secondary"
                            startIcon={<AddCircleIcon />}
                            sx={{ marginTop: "0.5rem" }}
                            onClick={() => array.push("")}
                          >
                            Detalle
                          </Button>
                          {values.producto_detalle !== undefined ? (
                            values.producto_detalle.map((detalle, i) => (
                              <Box
                                key={i}
                                sx={{
                                  p: 2,
                                  border: "1px dashed purple",
                                }}
                              >
                                <Button
                                  fullWidth
                                  component="label"
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<RemoveCircleIcon />}
                                  sx={{
                                    marginTop: "0.5rem",
                                  }}
                                  onClick={() => array.remove(i)}
                                ></Button>

                                <Grid container>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <Autocomplete
                                      sx={{ mt: 1 }}
                                      size="small"
                                      color="secondary"
                                      options={art}
                                      getOptionLabel={(option) => option.nombre}
                                      value={art.nombre}
                                      onChange={varianteHandleChange}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Articulos"
                                          inputProps={{
                                            ...params.inputProps,
                                          }}
                                          value={detalle.nombre}
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <FormControl
                                      fullWidth
                                      margin="dense"
                                      size="small"
                                      color="secondary"
                                    >
                                      <InputLabel>Variante</InputLabel>
                                      <Select
                                        label="Categorias"
                                        size="small"
                                        color="secondary"
                                        id="textfields"
                                        name={`producto_detalle.${i}.articulo`}
                                        value={[detalle.articulo]}
                                        onChange={handleChange}
                                      >
                                        {filterVarianteArt.map((item, i) => (
                                          <MenuItem key={i} value={item.id}>
                                            {item.nombre}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                                <TextField
                                  fullWidth
                                  label="Cantidad"
                                  required
                                  type="number"
                                  size="small"
                                  color="secondary"
                                  id="textfields"
                                  margin="dense"
                                  name={`producto_detalle.${i}.cantidad`}
                                  onChange={handleChange}
                                  value={detalle.cantidad}
                                />
                              </Box>
                            ))
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name={"ubicacion_producto"}
                      render={(array) => (
                        <>
                          {values.ubicacion_producto !== undefined ? (
                            values.ubicacion_producto.map((ubicacion, u) => (
                              <Box
                                key={u}
                                sx={{
                                  p: 2,
                                  border: "1px dashed skyblue",
                                }}
                              >
                                <Button
                                  fullWidth
                                  component="label"
                                  variant="outlined"
                                  color="primary"
                                  startIcon={<RemoveCircleIcon />}
                                  sx={{
                                    marginTop: "0.5rem",
                                  }}
                                  onClick={() => array.remove(u)}
                                ></Button>

                                <Grid container>
                                  <Grid item xs={12}>
                                    <FormControl
                                      fullWidth
                                      margin="dense"
                                      size="small"
                                      color="secondary"
                                    >
                                      <InputLabel>Almacén</InputLabel>
                                      <Select
                                        label="Almacén"
                                        size="small"
                                        color="secondary"
                                        id="textfields"
                                        name={`ubicacion_producto.${u}.almacen`}
                                        onChange={handleChange}
                                        // value={
                                        //   variante.almacen
                                        //     ? variante.almacen
                                        //     : ""
                                        // }
                                      >
                                        {almacenes.map((item, i) => (
                                          <MenuItem key={i} value={item.id}>
                                            {item.nombre}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={6}></Grid>
                                </Grid>
                                <TextField
                                  fullWidth
                                  label="Cantidad"
                                  required
                                  size="small"
                                  color="secondary"
                                  id="textfields"
                                  margin="dense"
                                  name={`ubicacion_producto.${u}.cantidad`}
                                  value={ubicacion.cantidad}
                                  onChange={handleChange}
                                />
                              </Box>
                            ))
                          ) : (
                            <></>
                          )}
                          <Button
                            fullWidth
                            component="label"
                            variant="outlined"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                            onClick={() => array.push("")}
                          >
                            Almacenes
                          </Button>
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
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVariante;
